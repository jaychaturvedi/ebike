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
    id: string,
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
    from: string,
    to: string,
    petrolSavingsInr: number,
    comment: string,
    path: {
        lat: number,
        long: number,
        time: string,
    }[],
    startTime: string,
    endTime: string,
}

type TUser = {
    isStale: boolean,
    isLoggedIn: boolean | null,
    id: string,
    phone: string,
    name: string,
    email: string,
    isPhoneValidated: boolean | null,
    defaultBikeId: string,
    isBikeRegistered: boolean | null,
}

type TNotification = {
    isStale: boolean,
    time: string,
    title: string,
    body: string,
}

export type TBike = {
    isStale: boolean,
    id: string,
    modal: string,
    name: string,
    purchaseDate: string,
    warrantyTill: string,
    healthPer: number,
    serviceDate: string,
    motorPer: number,
    type: null | "CELLULAR" | "BLE",
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
    address: string,
    lastUsed: string,
    reportIssueSuccess: boolean | null,
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

type TSpeedometer = {
    rideId: string,
    batteryChargePer: number,
    rangeCovered: number,
    rangeAvailable: number,
    distance: number,
    averageSpeed: number,
    speed: number,
    maxSpeed: number,
    pedalAssit: number,
    powerMod: number
}

type TGraph = {
    value: number,
    date: string
}

type TFAQ = {
    [name: string]: {
        name: string,
        icon: string,
        faq: {
            Question: string,
            Answer: string
        }[]
    }
}

type TUpgrades = {
    upgrades: {
        name: string,
        icon: string,
        price: number
    }[]
}

export const ZeroOnboarding: TOnboarding = {
    confirmSignUpSuccess: null,
    signUpSuccess: null,
    passwordResetSuccess: null,
    errorMessage: ""
}

export const ZeroUser: TUser = {
    isStale: true,
    isLoggedIn: null,
    id: "",
    phone: "",
    name: "",
    email: "",
    defaultBikeId: "",
    isPhoneValidated: null,
    isBikeRegistered: null
}


export const ZeroRide: TRide = {
    id: "",
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
    from: '',
    to: '',
    path: [],
    startTime: "",
    endTime: "",
}

export const ZeroBike: TBike = {
    isStale: true,
    id: "",
    modal: "",
    name: "",
    purchaseDate: "",
    warrantyTill: "",
    healthPer: 0,
    serviceDate: "",
    motorPer: 0,
    batteries: {},
    type: null,
    batteryChargePer: 0,
    rangeAvailableKm: 0,
    rangeCoveredKm: 0,
    isOn: false,
    lastLocationKnownTime: "",
    lat: 0,
    long: 0,
    address: '',
    lastUsed: '',
    co2SavingKg: 0,
    totalDistanceKm: 0,
    avgRideScore: 0,
    greenMilesKm: 0,
    petrolSavingsLtr: 0,
    costRecoveredPer: 0,
    reportIssueSuccess: null
}

export const ZeroBLE: TBLE = {
    scanning: false,
    state: "off",
    devices: [],
}

export const ZeroSpeedometer: TSpeedometer = {
    rideId: '',
    averageSpeed: 0,
    batteryChargePer: 0,
    distance: 0,
    maxSpeed: 0,
    pedalAssit: 0,
    powerMod: 0,
    rangeAvailable: 0,
    rangeCovered: 0,
    speed: 0
}

export type TStore = {
    onboarding: TOnboarding,
    user: TUser,
    ride: TRide,
    notifications: { isPresent: boolean, showNotifications: boolean, data: { [id: string]: TNotification } },
    bike: TBike,
    graph: {
        distance: number,
        avgSpeed: number,
        avgKmph: number,
        data: { [id: string]: TGraph }
    },
    services: {
        services: { [id: string]: TService },
        open: number,
        closed: number
    },
    speedometer: TSpeedometer,
    rides: { [id: string]: TRide },
    ble: TBLE,
    faq: TFAQ,
    upgrades: TUpgrades
}

const ZeroState = {
    onboarding: ZeroOnboarding,
    user: ZeroUser,
    bike: ZeroBike,
    ride: ZeroRide,
    notifications: { isPresent: false, showNotifications: false, data: {} },
    rides: {},
    graph: {
        distance: 0,
        avgSpeed: 0,
        avgKmph: 0, data: {}
    },
    speedometer: ZeroSpeedometer,
    services: { services: {}, open: 0, closed: 0 },
    ble: ZeroBLE,
    faq: {},
    upgrades: { upgrades: [] }
};

export function getZeroState() {
    return JSON.parse(JSON.stringify(ZeroState))
}

export default getZeroState() as TStore