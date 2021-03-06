import { BLEState, TPeripheral, PeripheralDisconnected } from "../../../ble";
import { TAvailableServiceSlot, TPastBookedIssues, 
  TBookedServices, TSmartInspectReport, TNearbyServiceProviders, 
  TRoadSideAssistance, 
  TReportedIssueConversation} from "../../store";

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

export type Store_UpdateError = {
    type: 'Store_UpdateError',
    payload: {
        error: null | string
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
        healthState?: string,
        motorState?: string;
        batteryState?: string,
        purchaseDate?: string,
        warrantyTill?: string,
        healthPer?: number,
        serviceDate?: string,
        motorPer?: number,
        petrolInLitre?: number,
        batteryCharging?: boolean,
        batteryChargeCycle?: number,
        chargingDistance?: number,
        chargingEta?: number,
        batteryHealthPer?: number,
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
        caloriesBurnt?: number,
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
    date: string,
    title: string,
    message: string,
    titleImgUrl: string,
    bodyImgUrl: string,
    mediaUrl: string,
    type: "N" | "E" | "P",
}

export type Store_UpdateNotification = {
    type: "Store_UpdateNotification",
    payload: {
        isPresent?: boolean,
        showNotifications?: boolean,
        data?: { [id: string]: TNotification }
    }
}

export type Store_ClearNotification = {
    type: "Store_ClearNotification",
    payload: {
    }
}

export type Store_UpdateRide = {
    type: "Store_UpdateRide",
    payload: {
        // Should not be optional
        id: string,
        isRiding?: boolean,
        totalDistanceKm?: number,
        durationSec?: string,
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
        topSpeed: number,
        co2SavingKg: number,
        greenMilesKm: number,
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
        powerMod?: number,
        mode?: number,
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

export type Store_SetNearByServices = {
    type: 'Store_SetNearByServices',
    payload: {
        locMasterId: number,
        locName: string,
        serviceProviderId: number,
        stationName: string,
        serviceProviderType: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        pincode: string,
        phoneNo: string,
        lat: number,
        lon: number,
        status: string,
        dist: number,
    }[]
}

export type Store_Reset = {
    type: "Store_Reset",
    payload: {}
}

export type Store_Init = {
    type: "Store_Init",
    payload: {}
}

export type Store_ResetRide = {
    type: "Store_ResetRide",
    payload: {}
}

export type Store_ResetStats = {
    type: "Store_ResetStats",
    payload: {}
}

export type Store_ResetNearByServices = {
    type: "Store_ResetNearByServices",
    payload: {}
}

export type Store_SmartInspectionReport = {
  type: "Store_SmartInspectionReport",
  payload: {
    smartInspectReport: TSmartInspectReport
  }
}
export type Store_SmartInspectionAbortedReport = {
  type: "Store_SmartInspectionAbortedReport",
  payload: {
    smartInspectAbortedReport: TSmartInspectReport
  }
}

export type Store_UpdateEnvironment = {
  type: "Store_UpdateEnvironment",
  payload: {
    production:boolean,
    development:boolean
  }
}

//////////request a service //////////
export type Store_PastBookedServices = {
  type: "Store_PastBookedServices",
  payload: TPastBookedIssues[]
}

export type Store_BookedServices = {
  type: "Store_BookedServices",
  payload: TBookedServices[]
}

export type Store_NearbyServiceProviders = {
  type: "Store_NearbyServiceProviders",
  payload: TNearbyServiceProviders[]
}

export type Store_AvailableTimeSlot = {
  type: "Store_AvailableTimeSlot",
  payload: TAvailableServiceSlot[]
}

export type Store_OnBookingServiceStatus = {
  type: "Store_OnBookingServiceStatus",
  payload: {
    status:string
  }
}
export type Store_OnCancelServiceStatus = {
  type: "Store_OnCancelServiceStatus",
  payload: {
    status:string
  }
}

export type Store_RoadSideAssistance = {
  type:"Store_RoadSideAssistance",
  payload: TRoadSideAssistance
}

export type Store_ReportIssueCategory = {
  type: 'Store_ReportIssueCategory',
  payload: {
    categoryId: number,
    categoryName: string
  }[]
}
export type Store_ReportIssueStatus = {
  type: 'Store_ReportIssueStatus',
  payload: {
    status: string
  }
}
export type Store_ReportedIssue = {
  type: 'Store_ReportedIssue',
  payload: {
    frameId: string,
    issueId: number,
    status: string,
    categoryName: string,
    createdTime: string,
  }[]
}
export type Store_ReportedIssueConversation = {
  type: 'Store_ReportedIssueConversation',
  payload: TReportedIssueConversation[]
}

type Action = Store_UpdateUser
    | Store_UpdateBle
    | Store_UpdateOnboarding
    | Store_ResetOnboarding
    | Store_UpdateBike
    | Store_UpdateNotification
    | Store_ClearNotification
    | Store_UpdateRide
    | Store_SetRideHistory
    | Store_SetSpeedometer
    | Store_SetGraphdata
    | Store_SetFAQ
    | Store_SetUpgrades
    | Store_ResetReportIssue
    | Store_SetServices
    | Store_Reset
    | Store_Init
    | Store_UpdateError
    | Store_ResetRide
    | Store_ResetStats
    | Store_SetNearByServices
    | Store_SmartInspectionReport
    | Store_SmartInspectionAbortedReport
    | Store_ResetNearByServices
    | Store_UpdateEnvironment
    | Store_PastBookedServices
    | Store_BookedServices
    | Store_AvailableTimeSlot
    | Store_OnBookingServiceStatus
    | Store_OnCancelServiceStatus
    | Store_NearbyServiceProviders
    | Store_RoadSideAssistance
    | Store_ReportIssueCategory
    | Store_ReportIssueStatus
    | Store_ReportedIssue
    | Store_ReportedIssueConversation;

export default Action;