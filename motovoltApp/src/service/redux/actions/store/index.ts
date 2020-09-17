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
        isPhoneValidated?: boolean,
        isBikeRegistered?: boolean,
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

export type Store_ResetReportIssue = {
    type: 'Store_ResetReportIssue',
    payload: {}
}

export type Store_UpdateBike = {
    type: "Store_UpdateBike",
    payload: {
        isStale?: boolean,
        // Id should not be null
        id: string,
        modal?: string,
        name?: string,
        purchaseDate?: string,
        warrantyTill?: string,
        healthPer?: number,
        serviceDate?: string,
        motorPer?: number,
        batteryPer?: number,
        type?: "CELLULAR" | "BLE" | null,
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
        address?: string,
        co2SavingKg?: number,
        totalDistanceKm?: number,
        avgRideScore?: number,
        greenMilesKm?: number,
        petrolSavingsLtr?: number,
        costRecoveredPer?: number,
        reportIssueSuccess?: boolean
    }
}

type TNotification = {
    isStale: boolean,
    time: string,
    title: string,
    type: number,
    body: string,
}

export type Store_UpdateNotification = {
    type: "Store_UpdateNotification",
    payload: {
        isPresent?: boolean,
        showNotifications?: boolean,
        data?: { [id: string]: TNotification }
    }
}

export type Store_UpdateRide = {
    type: "Store_UpdateRide",
    payload: {
        // Should not be optional
        id: string,
        isRiding?: boolean,
        totalDistanceKm?: number,
        durationSec?: number,
        speedKmph?: number,
        avgSpeedKmph?: number,
        maxSpeedKmph?: number,
        greenMilesKm?: number,
        caloriesBurnt: number,
        mode?: "POWER" | "PEDAL_ASSIST",
        score?: number,
        petrolSavingsLtr?: number,
        petrolSavingsInr?: number,
        comment?: string,
        path?: {
            lat: number,
            long: number,
            time: string,
        }[],
        startTime?: string,
        endTime?: string,
    }
}

export type Store_SetRideHistory = {
    type: "Store_SetRideHistory",
    payload: {
        // Should not be optional
        id: string,
        isRiding?: boolean,
        totalDistanceKm?: number,
        durationSec?: number,
        speedKmph?: number,
        avgSpeedKmph?: number,
        maxSpeedKmph?: number,
        greenMilesKm?: number,
        caloriesBurnt: number,
        mode?: "POWER" | "PEDAL_ASSIST",
        score?: number,
        petrolSavingsLtr?: number,
        petrolSavingsInr?: number,
        from?: string,
        to?: string,
        comment?: string,
        path?: {
            lat: number,
            long: number,
            time: string,
        }[],
        startTime?: string,
        endTime?: string,
    }[]
}

export type Store_SetServices = {
    type: 'Store_SetServices',
    payload: {
        services: {
            isStale?: boolean,
            id: string,
            title?: string,
            isOpen?: boolean,
            openDate?: string,
            closeDate?: string,
        }[],
        open: number,
        closed: number
    }
}
export type Store_SetGraphdata = {
    type: 'Store_SetGraphdata',
    payload: {
        distance: number,
        avgSpeed: number,
        avgKmph: number,
        data: {
            value: number,
            date: string
        }[]
    }
}

export type Store_SetSpeedometer = {
    type: 'Store_SetSpeedometer',
    payload: {
        rideId: string,
        batteryChargePer?: number,
        rangeCovered?: number,
        rangeAvailable?: number,
        distance?: number,
        averageSpeed?: number,
        speed?: number,
        maxSpeed?: number,
        pedalAssit?: number,
        powerMod?: number
    }
}

export type Store_SetFAQ = {
    type: 'Store_SetFAQ',
    payload: {
        [name: string]: {
            name: string,
            icon: string,
            faq: {
                Question: string,
                Answer: string
            }[]
        }
    }
}

export type Store_SetUpgrades = {
    type: 'Store_SetUpgrades',
    payload: {
        upgrades: {
            name: string,
            icon: string,
            price: number
        }[]
    }
}

export type Store_Reset = {
    type: "Store_Reset",
    payload: {}
}

export type Store_Init = {
    type: "Store_Init",
    payload: {}
}

type Action = Store_UpdateUser
    | Store_UpdateBle
    | Store_UpdateOnboarding
    | Store_ResetOnboarding
    | Store_UpdateBike
    | Store_UpdateNotification
    | Store_UpdateRide
    | Store_SetRideHistory
    | Store_SetSpeedometer
    | Store_SetGraphdata
    | Store_SetFAQ
    | Store_SetUpgrades
    | Store_ResetReportIssue
    | Store_SetServices
    | Store_Reset
    | Store_Init;

export default Action;