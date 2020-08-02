import { eventChannel } from "redux-saga";
import {
    all,
    takeLatest,
    call,
    take,
    takeEvery,
    put,
    delay,
} from "redux-saga/effects";
import * as BLE from "../ble";
import * as Authentication from "../authentication";
import * as BLEActions from "./actions/saga/ble";
import * as AuthenticationActions from "./actions/saga/authentication-actions";
import * as OnboardingActions from "./actions/saga/onboarding-actions";
import { Store_UpdateBle, Store_UpdateOnboarding, Store_UpdateUser } from "./actions/store";

function* initBLE() {
    console.log("intiBle")
    return eventChannel(emit => {
        console.log("Event Channel")
        const response = BLE.initialiseListeners({
            onDisconnectPeripheral: (data) => {
                emit({
                    type: "Store_UpdateBle",
                    payload: {
                        connectedPeripheral: "",
                    }
                })
            },
            onStateChange: (state) => {
                console.log("Saga on state chnage", state)
                emit({
                    type: "Store_UpdateBle",
                    payload: {
                        state: state
                    }
                })
            },
            onStopScan: (peripherals) => {
                emit({
                    type: "Store_UpdateBle",
                    payload: {
                        devices: peripherals,
                        scanning: false,
                    }
                })
            },
            onUpdateValueForCharacteristic: (char) => {
                emit({
                    type: "Store_UpdateBle",
                    payload: {

                    }
                })
            }
        })
        return response.unsubscriber;
    })
}

function* turnOnBle(params: BLEActions.TurnOnBLE) {
    const response = yield call(BLE.enableBluetooth)
    if (response.success) {
        const bleChannel = yield call(initBLE);
        while (true) {
            const response = yield take(bleChannel);
            yield put(response);
        }
    }
}

function* scanBleDevices(params: BLEActions.ScanBLEDevices) {
    yield call(BLE.startScan, 10)
    yield put({
        type: "Store_UpdateBle",
        payload: {
            scanning: true
        }
    } as Store_UpdateBle)
}

function* connectBle(params: BLEActions.ConnectBLE) {
    const response = yield call(BLE.connectPeripheral, params.payload.id)
    if (response.success) {
        yield put({
            type: "Store_UpdateBle",
            payload: {
                connectedPeripheral: params.payload.id
            }
        } as Store_UpdateBle)
    }
}

function* disconnectBle(params: BLEActions.DisconnectBLE) {
    yield call(BLE.disconnectPeripherals)
}

//Onboarding
function* signIn(params: AuthenticationActions.SignIn) {
    const response = yield call(Authentication.signIn, params.payload.mobileNumber, params.payload.password)
    // call fetch user API
    console.log(response.user)
    yield put({
        type: 'Store_UpdateUser',
        payload: {
            isLoggedIn: response.success,
        }
    } as Store_UpdateUser);
    yield put({
        type: 'Store_UpdateOnboarding',
        payload: {
            isLoggedIn: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding);
}

function* signUp(params: AuthenticationActions.SignUp) {
    const response = yield call(Authentication.signup, params.payload.mobileNumber)
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            signUpSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

function* resendSignUp(params: AuthenticationActions.ResendSignUp) {
    const response = yield call(Authentication.resendSignUp, params.payload.mobileNumber);
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            errorMessage: response.message,
        }
    } as Store_UpdateOnboarding)
}

function* confirmSignUp(params: AuthenticationActions.ConfirmSignUp) {
    const response = yield call(Authentication.confirmSignUp, params.payload.mobileNumber, params.payload.code)
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            confirmSignUpSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

function* signOut(params: AuthenticationActions.SignOut) {
    yield call(Authentication.signout)
}

function* initForgotPassword(params: AuthenticationActions.InitiateForgotPassword) {
    yield call(Authentication.initiateForgotPassword, params.payload.mobileNumber)
}

function* completeForgotPassword(params: AuthenticationActions.CompleteForgotPassword) {
    const response = yield call(Authentication.forgotPassword,
        params.payload.mobileNumber, params.payload.code, params.payload.password);
    console.log("Response", response)
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            passwordResetSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

function* changePassword(params: AuthenticationActions.ChangePassword) {
    const response = yield call(Authentication.changePassword,
        params.payload.mobileNumber, params.payload.oldPassword, params.payload.newPassword);
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            passwordResetSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

function* actionWatcher() {
    // BLE
    yield takeLatest("TurnOnBLE", turnOnBle);
    yield takeLatest("ScanBLEDevices", scanBleDevices);
    yield takeLatest("ConnectBLE", connectBle);
    yield takeLatest("DisconnectBLE", disconnectBle);
    // Onboarding
    yield takeLatest("SignUp", signUp);
    yield takeLatest("ResendSignUp", resendSignUp);
    yield takeLatest("ConfirmSignUp", confirmSignUp);
    yield takeLatest("SignOut", signOut);
    yield takeLatest("SignIn", signIn);
    yield takeLatest("InitiateForgotPassword", initForgotPassword);
    yield takeLatest("CompleteForgotPassword", completeForgotPassword);
    yield takeLatest("ChangePassword", changePassword);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
