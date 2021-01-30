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
  durationSec: string,
  speedKmph: number,
  avgSpeedKmph: number,
  maxSpeedKmph: number,
  greenMilesKm: number,
  caloriesBurnt: number,
  mode: "POWER" | "PEDAL_ASSIST",
  pedalAssistMode: number,
  ecoMode: number,
  powerMode: number,
  score: number,
  batteryChargeCycle: number,
  chargingDistance: number,
  chargingEta: number,
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

export type TNotification = {
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
  healthState: string,
  motorState: string;
  batteryState: string,
  type: null | "CELLULAR" | "BLE",
  co2SavingKg: number,
  totalDistanceKm: number,
  batteryCharging: boolean,
  batteryChargeCycle: number,
  chargingDistance: number,
  chargingEta: number,
  petrolInLitre: number,
  avgRideScore: number,
  greenMilesKm: number,
  petrolSavingsLtr: number,
  caloriesBurnt: number,
  costRecoveredPer: number,
  batteryChargePer: number,
  batteryHealthPer: number,
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
  powerMod: number,
  mode: number | null,
}

type TGraph = {
  isStale: boolean;
  co2SavingKg: number,
  greenMilesKm: number,
  distance: number,
  avgSpeed: number,
  avgKmph: number,
  topSpeed: number,
  data: {
    [id: string]: {
      value: number,
      date: string
    }
  }
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

type NearByService = {
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
}

export type TSmartInspectReport = {
  isStale: boolean,
  frameId: string,
  status: string,
  deviceId: string,
  fromDate: string,
  toDate: string,
  overallHealth: number,
  battery: Health[],
  motor: Health[],
  smartServices: Health[],
}

export type Health = {
  paramName: string
  status: number
  val: number
}

export interface TPastBookedIssues {
  frameId: string;
  issueId: number;
  status: string;
  issueName: string;
  createdTime: string;
}

export interface TBookedServices {
  frameId: string;
  bookServiceId: number;
  status: string;
  serviceProviderId: number;
  serviceProviderName: string;
  serviceTypeId: number;
  serviceTypeName: string;
  serviceDate: string;
}
export interface TNearbyServiceProviders {
  locMasterId: number;
  locName: string;
  serviceProviderId: number;
  stationName: string;
  serviceProviderType: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  pincode: string;
  phoneNo: string;
  lat: number;
  lon: number;
  status: string;
  dist: number;
  st: string | undefined;
}

export interface TRoadSideAssistance {
  isStale: boolean
  st: string | undefined;
  rsa_status: string;
  rsa: {
    ServiceProviderId: number;
    StationName: string;
    serviceProviderType: string;
    locName: string;
    phoneNo: string;
    locMasterId: number;
    Pincode: string;
    lat: number;
    lon: number;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    engineer_name: string;
    eng_status: string;
    expected_arrival: string;
    status: string| undefined
  }[];
}

export interface TAvailableServiceSlot {
  slotName: string,
  slotHour: number
}

export interface TRequestServiceState {
  pastBookedService: TPastBookedIssues[],
  nearbyServiceProviders: TNearbyServiceProviders[],
  bookedServices: TBookedServices[],
  avilableServiceSlot: TAvailableServiceSlot[]
  serviceBookedStatus: {
    status: string
  },
  onServiceCancelledStatus: {
    status: string
  },
}

export const ZeroSmartInspectReport: TSmartInspectReport = {
  isStale: true,
  frameId: "",
  deviceId: "",
  fromDate: "",
  toDate: "",
  overallHealth: 1,
  status: "",
  battery: [],
  motor: [],
  smartServices: [],
}
export const ZeroRoadSideAssistance: TRoadSideAssistance = {
  isStale: true,
  rsa: [],
  rsa_status: "",
  st: "",
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
  durationSec: "00:00:00",
  speedKmph: 0,
  avgSpeedKmph: 0,
  maxSpeedKmph: 0,
  greenMilesKm: 0,
  caloriesBurnt: 0,
  mode: "PEDAL_ASSIST",
  batteryChargeCycle: 0,
  chargingDistance: 0,
  chargingEta: 0,
  pedalAssistMode: 0,
  ecoMode: 0,
  powerMode: 0,
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
  healthState: "",
  motorState: "",
  batteryState: "",
  purchaseDate: "",
  warrantyTill: "",
  healthPer: 0,
  petrolInLitre: 0,
  serviceDate: "",
  motorPer: 0,
  batteries: {},
  type: null,
  batteryCharging: false,
  batteryChargeCycle: 0,
  chargingDistance: 0,
  chargingEta: 0,
  batteryChargePer: 0,
  batteryHealthPer: 0,
  caloriesBurnt: 0,
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
  speed: 0,
  mode: null,
}

export const ZeroGraph: TGraph = {
  isStale: true,
  co2SavingKg: 0,
  greenMilesKm: 0,
  distance: 0,
  avgSpeed: 0,
  topSpeed: 0,
  avgKmph: 0,
  data: {}
}

export type TStore = {
  error: null | string,
  onboarding: TOnboarding,
  user: TUser,
  ride: TRide,
  notifications: { isPresent: boolean, showNotifications: boolean, data: { [id: string]: TNotification } },
  bike: TBike,
  graph: TGraph,
  services: {
    services: { [id: string]: TService },
    open: number,
    closed: number
  },
  nearbyServices: NearByService[];
  speedometer: TSpeedometer,
  rides: { [id: string]: TRide },
  ble: TBLE,
  faq: TFAQ,
  upgrades: TUpgrades,
  smartInspectReport: TSmartInspectReport,
  apiEnvironment: {
    production: boolean,
    development: boolean
  },
  requestedServices: TRequestServiceState,
  roadSideAssistance: TRoadSideAssistance
}

const ZeroState: TStore = {
  error: null,
  onboarding: ZeroOnboarding,
  user: ZeroUser,
  bike: ZeroBike,
  ride: ZeroRide,
  notifications: { isPresent: false, showNotifications: false, data: {} },
  rides: {},
  graph: ZeroGraph,
  nearbyServices: [],
  speedometer: ZeroSpeedometer,
  services: { services: {}, open: 0, closed: 0 },
  ble: ZeroBLE,
  faq: {},
  upgrades: { upgrades: [] },
  smartInspectReport: ZeroSmartInspectReport,
  apiEnvironment: {
    production: true,
    development: false
  },
  requestedServices: {
    avilableServiceSlot: [],
    nearbyServiceProviders: [],
    bookedServices: [],
    pastBookedService: [],
    serviceBookedStatus: {
      status: ""
    },
    onServiceCancelledStatus: {
      status: ""
    }
  },
  roadSideAssistance:ZeroRoadSideAssistance
};

export function getZeroState() {
  return JSON.parse(JSON.stringify(ZeroState))
}

export default getZeroState() as TStore