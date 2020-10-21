export type TAlertType = "smart" | "bms" | "mc"
export type TSort = { fieldName: string, direction: 'descend' | 'ascend' }
export type TFilter = { fieldName: string, value: string }
export type TPagination = {
    pageNumber: number,
    pageSize: number,
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
    alertId: number,
    alertName: string,
    mfgDate: string,
    batteryId: string,
    customerId: string,
    model: string,
    frameId: string,
    alertTime: string,
    openSince: string,    // hh:mm
    Severity: number // 1 means RED, 2 means Orange, 3 means Yellow
    location: string,
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
        alert1count: string,
        alert2count: string,
        alert3count: string,
        alert4count: string,
        alert5count: string
    }[]
}

export interface TtrendLocationWise {
    lines: {
        [lineName: string]: string,
    }
    data: {
        date: string,
        loc1count: string,
        loc2count: string,
        loc3count: string,
        loc4count: string,
        loc5count: string
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
    alertTime: string,
    tat: string,
    alertId: string,
    location: string,
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