import { eventChannel } from "redux-saga";
import {
    call,
    take,
    put,
} from "redux-saga/effects";
import * as BLE from "../../ble";
import * as BLEActions from "../actions/saga/ble";
import { Store_UpdateBle } from "../actions/store";


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

export function* turnOnBle(params: BLEActions.TurnOnBLE) {
    const response = yield call(BLE.enableBluetooth)
    if (response.success) {
        const bleChannel = yield call(initBLE);
        while (true) {
            const response = yield take(bleChannel);
            yield put(response);
        }
    }
}

export function* scanBleDevices(params: BLEActions.ScanBLEDevices) {
    yield call(BLE.startScan, 10)
    yield put({
        type: "Store_UpdateBle",
        payload: {
            scanning: true
        }
    } as Store_UpdateBle)
}

export function* connectBle(params: BLEActions.ConnectBLE) {
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

export function* disconnectBle(params: BLEActions.DisconnectBLE) {
    yield call(BLE.disconnectPeripherals)
}
