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

export type Store_UpdateBike = {
    type: "Store_UpdateBike",
    payload: {
        isStale?: boolean,
        id?: string,
        modal?: string,
        name?: string,
        purchaseDate?: string,
        warrantyTill?: string,
        healthPer?: number,
        serviceDate?: string,
        motorPer?: number,
        batteryPer?: number,
        type?: "GPS" | "BLE" | null,
        batteries?: {
            [id: string]: {
                id: string
            }
        },
        batteryChargePer?: number,
        rangeAvailableKm?: number,
        rangeCoveredKm?: number,
        isOn?: boolean,
        lastLocationKnownTime?: string,
        lat?: number,
        long?: number,
        co2SavingKg?: number,
        totalDistanceKm?: number,
        avgRideScore?: number,
        greenMilesKm?: number,
        petrolSavingsLtr?: number,
        costRecoveredPer?: number,
    }
}

type TNotification = {
    isStale: boolean,
    time: string,
    title: string,
    body: string,
}

export type Store_Notification = {
    type: "Store_Notification",
    payload: {
        isPresent?: boolean,
        data?: { [id: string]: TNotification }
    }
}

type Action = Store_UpdateUser
    | Store_UpdateBle
    | Store_UpdateOnboarding
    | Store_ResetOnboarding
    | Store_UpdateBike
    | Store_Notification;

export default Action;