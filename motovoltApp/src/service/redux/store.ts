import {
    BLEState,
    TPeripheral
} from "../ble";

type TOnboarding = {
    signUpSuccess: boolean | null,
    confirmSignUpSuccess: boolean | null,
    passwordResetSuccess: boolean | null,
}

type TBikeStat = {
    isStale: boolean,
    co2SavingKg: number,
    totalDistanceKm: number,
    avgRideScore: number,
    greenMilesKm: number,
    petrolSavingsLtr: number,
    costRecoveredPer: number,
}

type TBikeState = {
    isStale: boolean,
    batteryChargePer: number,
    rangeAvailableKm: number,
    rangeCoveredKm: number,
    isOn: boolean,
    lastLocationKnownTime: string,
    lat: number,
    long: number,
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
    isLoggedIn: boolean,
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

const ZeroOnboarding: TOnboarding = {
    confirmSignUpSuccess: null,
    signUpSuccess: null,
    passwordResetSuccess: null,
}

const ZeroUser: TUser = {
    isStale: true,
    isLoggedIn: false,
    id: "",
    phone: "",
    name: "",
    email: "",
    defaultBikeId: "",
}

const ZeroBikeStat: TBikeStat = {
    isStale: true,
    co2SavingKg: 0,
    totalDistanceKm: 0,
    avgRideScore: 0,
    greenMilesKm: 0,
    petrolSavingsLtr: 0,
    costRecoveredPer: 0,
}

const ZeroBikeState: TBikeState = {
    isStale: true,
    batteryChargePer: 0,
    rangeAvailableKm: 0,
    rangeCoveredKm: 0,
    isOn: false,
    lastLocationKnownTime: "",
    lat: 0,
    long: 0,
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
    batteries: {}
}

const ZeroBLE: TBLE = {
    scanning: false,
    state: "off",
    devices: [],
}



export type TStore = {
    onboarding: TOnboarding,
    user: TUser,
    bikeStat: TBikeStat,
    bikeState: TBikeState,
    ride: TRide,
    notifications: { [id: string]: TNotification },
    bike: TBike,
    services: { [id: string]: TService },
    rides: { [id: string]: TRide },
    ble: TBLE,
}

export default {
    onboarding: ZeroOnboarding,
    user: ZeroUser,
    bikeStat: ZeroBikeStat,
    bikeState: ZeroBikeState,
    ride: ZeroRide,
    bike: ZeroBike,
    notifications: {},
    rides: {},
    services: {},
    ble: ZeroBLE
} as TStore