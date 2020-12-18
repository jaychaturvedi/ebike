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
import * as Bike from './saga/bike';
import * as Rides from './saga/rides';
import * as User from './saga/user';
import * as Notification from './saga/notifications';
import * as Service from './saga/service';
import * as Menu from './saga/menu';

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

    yield takeLatest("ValidateFrame", Bike.validateFrame);
    yield takeLatest("UpdateBike", Bike.updateBike);
    yield takeLatest("ReadBikeStat", Bike.getBikeStat);
    yield takeLatest("ReadBikeLocation", Bike.getLocation);
    yield takeLatest("ReadChargingStatus", Bike.getChargingStatus);

    yield takeLatest("ReadRideHistory", Rides.getRideHistory);
    yield takeLatest("StartRide", Rides.startRide);
    yield takeLatest("EndRide", Rides.endRide);
    yield takeLatest("SubmitRide", Rides.rateRide);
    yield takeLatest("ReadRideData", Rides.getRide);
    yield takeLatest("SubmitRide", Rides.rateRide);
    yield takeLatest("Speedometer", Rides.getSpeedometerData);

    yield takeLatest("ReadUser", User.readUser);
    yield takeLatest("UpdateUser", User.updateUser);

    yield takeLatest("ReportIssue", Service.reportIssue);
    yield takeLatest("ReadService", Service.getServices);

    yield takeLatest("ReadNotifications", Notification.getNotification);

    yield takeLatest("ReadFAQ", Menu.readFAQ);
    yield takeLatest("ReadUpgrades", Menu.readUpgrades);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
