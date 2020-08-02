import { BLEState, TPeripheral, PeripheralDisconnected } from "../../../ble";

export type Store_UpdateUser = {
    type: "Store_UpdateUser",
    payload: {
        isStale?: boolean,
        isLoggedIn?: boolean,
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

export type Store_UpdateOnboarding = {
    type: "Store_UpdateOnboarding",
    payload: {
        signUpSuccess?: boolean | null,
        confirmSignUpSuccess?: boolean | null,
        passwordResetSuccess?: boolean | null,
        errorMessage?: string
    }
}

export type Store_ResetOnboarding = {
    type: "Store_ResetOnboarding",
    payload: {}
}

type Action = Store_UpdateUser | Store_UpdateBle | Store_UpdateOnboarding | Store_ResetOnboarding;

export default Action;