export type TAlertType = "smart" | "bms" | "mc"
export type TSort = { fieldName: string, direction: 'descend' | 'ascend' }
export type TFilter = { fieldName: string, value: string }
export type TPagination = {
    pageNumber: number,
    pageSize: number,
}
/////////////////////////////////// DROPDOWN FILTERS ///////////////////////////
interface TVehicle{
  model:string,
  subModel:string[]
}

interface TLocation{
  location:string,
  subLocation:string[]
}

export interface TDropdownFilters{
  vehicle:TVehicle[],
  location:TLocation[]
}

export interface TMapViewFilters {
  region: [],
  customer: [],
  location:[]
}


////////////////////////////////////MAP MARKERS/////////////////////////////////
export interface TMapMarkers{
  lat:number;
  lng:number;
  frameId:string;
  timestamp:string;
  isActive:boolean
}

/////////////////////////////////////QUICKSIGHT DASHBOARD///////////////////////
export interface TDashboardList {
  dashboardId: string;
  dashboardName: string;
  dashboardImageUrl: string;
  authorizedGroup: string[];
}

/////////////////////////////////////USERS//////////////////////////////////////
export interface User {
    authenticated: boolean,
    user: any
}
////////////////////////////////////Alerts//////////////////////////////////////
export interface AlertData {
  customerName: string,
  alertTypeId: number;
  frameId: string;
  batteryId: string;
  customerId: string;
  model: string;
  mfgDate: string;
  location: string;
  alertTime: string;
  alertId: number;
  openSince: string;
  alarmValue:string;
  alertName: string;
  alertCode: string;
  alertType:string;
  Severity: string;// 1 means RED, 2 means Orange, 3 means Yellow
}

export interface Alert {
    dataCount: number,
    data: AlertData[]
}
////////////////////////////////////Alerts//////////////////////////////////////

///////////////////////////////Trends///////////////////////////////////////////
export interface TtrendTotalAlerts {
    date: string,
    count: number
}

export interface TtrendTop5Alert {
    lines: {
        [lineName: string]: string,
    }
    data: {
        date: string,
        alert1count?: number,
        alert2count?: number,
        alert3count?: number,
        alert4count?: number,
        alert5count?: number
    }[]
}

export interface TtrendLocationWise {
    lines: {
        [lineName: string]: string,
    }
    data: {
        date: string,
        loc1count?: number,
        loc2count?: number,
        loc3count?: number,
        loc4count?: number,
        loc5count?: number
    }[]
}

///////////////////////////////Trends//////////////////////////////////////////
export interface TAlertInsights {
    totalDistInKm: string,
    utilization: string,
    ridesPerMnthInKm: string,
    avgRangeRideInKm: string,
    avgMileageInKm: string
}

////////////////////////////////PastAlert///////////////////////////////////////
export interface TPastAlertData {
    vehicleId: string,
    alertCode:string,
    tat: string,
    graph: string,
    alertId: number,
    alertTime: string,
    alertTypeId:number,
    location: string,
    subLocation: string,
    alertGraph: boolean
}
export interface TPastAlert {
    dataCount: number,
    data: TPastAlertData[]
}
////////////////////////////////////PastAlert///////////////////////////////////

//////////////////////////////////Graph/////////////////////////////////////////
export interface TCapacityDeterioratioonGraph {
    km: number,
    smilage: number,
    amilage: number,
    nocycles: number
}

export interface TVoltageDeviation {
    [key: string]: number
}

export interface TVehicleActiveOrIdle {
    timeDate: string,
    activeTime: number,
    idleTime: number
}

export interface THighOperatingTemperature {
    timeDate: string,
    chrgTemp: number,
    abintTemp: number,
    L1: number,
    L2: number
}
export interface TUnitOverVoltage {
    timeDate: string,
    batteryPackVoltage: number,
    L1: number
}

export interface THighChargingTemperature {
    timeDate: string,
    current: number,
    chargingTemp: number,
    L1: number
}

export interface TChargingOverCurrent {
    timeDate: string,
    chargOverCurnt: number,
    L1: number
}

export interface THighSoc {
    timeDate: string,
    soc: number,
    L1: number
}

export interface TExcessiveTemperatureDifference {
    timeDate: string,
    deltaTemp: number,
    L1: number
}

export interface THallSensorFault {
    timeDate: string,
    speed: number
}

/////////////////////////////////Graph//////////////////////////////////////////