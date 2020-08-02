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
import * as BLE from "./saga/ble";
import * as Onboarding from "./saga/onboarding";

function* actionWatcher() {
    // BLE
    yield takeLatest("TurnOnBLE", BLE.turnOnBle);
    yield takeLatest("ScanBLEDevices", BLE.scanBleDevices);
    yield takeLatest("ConnectBLE", BLE.connectBle);
    yield takeLatest("DisconnectBLE", BLE.disconnectBle);
    // Onboarding
    yield takeLatest("SignUp", Onboarding.signUp);
    yield takeLatest("ResendSignUp", Onboarding.resendSignUp);
    yield takeLatest("ConfirmSignUp", Onboarding.confirmSignUp);
    yield takeLatest("SignOut", Onboarding.signOut);
    yield takeLatest("SignIn", Onboarding.signIn);
    yield takeLatest("InitiateForgotPassword", Onboarding.initForgotPassword);
    yield takeLatest("CompleteForgotPassword", Onboarding.completeForgotPassword);
    yield takeLatest("ChangePassword", Onboarding.changePassword);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
