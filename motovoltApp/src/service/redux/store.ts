import {
    BLEState,
    TPeripheral
} from "../ble";

type TOnboarding = {
    signUpSuccess: boolean | null,
    confirmSignUpSuccess: boolean | null,
    passwordResetSuccess: boolean | null,
    errorMessage: string
}

type TRide = {
    isStale: boolean,
    isRiding: boolean,
    totalDistanceKm: number,
    durationSec: number,
    speedKmph: number,
    avgSpeedKmph: number,
    maxSpeedKmph: number,
    greenMilesKm: number,
    caloriesBurnt: number,
    mode: "POWER" | "PEDAL_ASSIST",
    score: number,
    petrolSavingsLtr: number,
    petrolSavingsInr: number,
    comment: string,
    path: {
        lat: number,
        long: number
    }[]
}

type TUser = {
    isStale: boolean,
    isLoggedIn: boolean | null,
    id: string,
    phone: string,
    name: string,
    email: string,
    defaultBikeId: string,
}

type TNotification = {
    isStale: boolean,
    time: string,
    title: string,
    body: string,
}

type TBike = {
    isStale: boolean,
    id: string,
    modal: string,
    name: string,
    purchaseDate: string,
    warrantyTill: string,
    healthPer: number,
    serviceDate: string,
    motorPer: number,
    batteryPer: number,
    type: null | "GPS" | "BLE",
    co2SavingKg: number,
    totalDistanceKm: number,
    avgRideScore: number,
    greenMilesKm: number,
    petrolSavingsLtr: number,
    costRecoveredPer: number,
    batteryChargePer: number,
    rangeAvailableKm: number,
    rangeCoveredKm: number,
    isOn: boolean,
    lastLocationKnownTime: string,
    lat: number,
    long: number,
    batteries: {
        [id: string]: {
            id: string
        }
    }
}

type TService = {
    isStale: boolean,
    id: string,
    title: string,
    isOpen: boolean,
    openDate: string,
    closeDate: string,
}

type TBLE = {
    scanning: boolean,
    state: BLEState,
    devices: TPeripheral[],
}

export const ZeroOnboarding: TOnboarding = {
    confirmSignUpSuccess: null,
    signUpSuccess: null,
    passwordResetSuccess: null,
    errorMessage: ""
}

const ZeroUser: TUser = {
    isStale: true,
    isLoggedIn: null,
    id: "",
    phone: "",
    name: "",
    email: "",
    defaultBikeId: "",
}

const ZeroRide: TRide = {
    isStale: true,
    isRiding: false,
    totalDistanceKm: 0,
    durationSec: 0,
    speedKmph: 0,
    avgSpeedKmph: 0,
    maxSpeedKmph: 0,
    greenMilesKm: 0,
    caloriesBurnt: 0,
    mode: "PEDAL_ASSIST",
    score: 0,
    petrolSavingsLtr: 0,
    petrolSavingsInr: 0,
    comment: "",
    path: []
}

const ZeroBike: TBike = {
    isStale: true,
    id: "",
    modal: "",
    name: "",
    purchaseDate: "",
    warrantyTill: "",
    healthPer: 0,
    serviceDate: "",
    motorPer: 0,
    batteryPer: 0,
    batteries: {},
    type: null,
    batteryChargePer: 0,
    rangeAvailableKm: 0,
    rangeCoveredKm: 0,
    isOn: false,
    lastLocationKnownTime: "",
    lat: 0,
    long: 0,
    co2SavingKg: 0,
    totalDistanceKm: 0,
    avgRideScore: 0,
    greenMilesKm: 0,
    petrolSavingsLtr: 0,
    costRecoveredPer: 0,
}

const ZeroBLE: TBLE = {
    scanning: false,
    state: "off",
    devices: [],
}

export type TStore = {
    onboarding: TOnboarding,
    user: TUser,
    ride: TRide,
    notifications: { isPresent: boolean, data: { [id: string]: TNotification } },
    bike: TBike,
    services: { [id: string]: TService },
    rides: { [id: string]: TRide },
    ble: TBLE,
}

export default {
    onboarding: ZeroOnboarding,
    user: ZeroUser,
    bike: ZeroBike,
    ride: ZeroRide,
    notifications: { isPresent: false, data: {} },
    rides: {},
    services: {},
    ble: ZeroBLE
} as TStore