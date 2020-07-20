import { BLEState, TPeripheral, PeripheralDisconnected } from "../../ble";

export type TurnOnBLE = {
    type: "TurnOnBLE",
    payload: {}
}

export type ScanBLEDevices = {
    type: "ScanBLEDevices",
    payload: {}
}

export type ConnectBLE = {
    type: "ConnectBLE",
    payload: {
        id: string,
    }
}

export type DisconnectBLE = {
    type: "DisconnectBLE",
    payload: {}
}

export type UpdateBleStore = {
    type: "UpdateBleStore",
    payload: {
        scanning?: boolean,
        state?: BLEState,
        devices?: TPeripheral[],
        connectedPeripheral?: string,
    }
}