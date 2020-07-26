import { BLEState, TPeripheral, PeripheralDisconnected } from "../../../ble";

export type Store_UpdateUser = {
    type: "Store_UpdateUser",
    payload: {
        isStale?: true,
        isLoggedIn?: false,
        id?: string,
        phone?: string,
        name?: string,
        email?: string,
        defaultBikeId?: string,
    }
}

export type Store_UpdateBle = {
    type: "Store_UpdateBle",
    payload: {
        scanning?: boolean,
        state?: BLEState,
        devices?: TPeripheral[],
        connectedPeripheral?: string,
    }
}

type Action = Store_UpdateUser | Store_UpdateBle;

export default Action;