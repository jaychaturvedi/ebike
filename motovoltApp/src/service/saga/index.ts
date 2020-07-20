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
import { } from "../redux/actions";
import {
    connectPeripheral,
    disconnectPeripherals,
    enableBluetooth,
    initialiseListeners,
    startScan,
} from "../ble";
import {
    ConnectBLE,
    ScanBLEDevices,
    TurnOnBLE,
    DisconnectBLE,
    UpdateBleStore
} from "../redux/actions/ble";

function* initBLE() {
    console.log("intiBle")
    return eventChannel(emit => {
        console.log("Event Channel")
        const response = initialiseListeners({
            onDisconnectPeripheral: (data) => {
                emit({
                    type: "UpdateBleStore",
                    payload: {
                        connectedPeripheral: "",
                    }
                })
            },
            onStateChange: (state) => {
                console.log("Saga on state chnage", state)
                emit({
                    type: "UpdateBleStore",
                    payload: {
                        state: state
                    }
                })
            },
            onStopScan: (peripherals) => {
                emit({
                    type: "UpdateBleStore",
                    payload: {
                        devices: peripherals,
                        scanning: false,
                    }
                })
            },
            onUpdateValueForCharacteristic: (char) => {
                emit({
                    type: "UpdateBleStore",
                    payload: {
                        
                    }
                })
            }
        })
        return response.unsubscriber;
    })
}

function* turnOnBle(params: TurnOnBLE) {
    const response = yield call(enableBluetooth)
    if (response.success) {
        const bleChannel = yield call(initBLE);
        while (true) {
            const response = yield take(bleChannel);
            yield put(response);
        }
    }
}

function* scanBleDevices(params: ScanBLEDevices) {
    yield call(startScan, 10)
}

function* connectBle(params: ConnectBLE) {
    const response = yield call(connectPeripheral, params.payload.id)
    if (response.success) {
        yield put({
            type: "UpdateBleStore",
            payload: {
                connectedPeripheral: params.payload.id
            }
        } as UpdateBleStore)
    }
}

function* disconnectBle(params: DisconnectBLE) {
    yield call(disconnectPeripherals)
}

function* actionWatcher() {
    yield takeLatest("TurnOnBLE", turnOnBle);
    yield takeLatest("ScanBLEDevices", scanBleDevices);
    yield takeLatest("ConnectBLE", connectBle);
    yield takeLatest("DisconnectBLE", disconnectBle);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
