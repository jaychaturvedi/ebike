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