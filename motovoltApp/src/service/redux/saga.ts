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
import { Store_UpdateBle } from "./actions/store";

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

function* initiateMobileValidation(params: AuthenticationActions.InitiateMobileValidation){
    yield call(Authentication.signup, params.payload.mobileNumber);
}

function* signUp(params: AuthenticationActions.SignUp){
    yield call(Authentication.signup, params.payload.mobileNumber);
}

function* actionWatcher() {
    // BLE
    yield takeLatest("TurnOnBLE", turnOnBle);
    yield takeLatest("ScanBLEDevices", scanBleDevices);
    yield takeLatest("ConnectBLE", connectBle);
    yield takeLatest("DisconnectBLE", disconnectBle);
    // Onboarding
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
