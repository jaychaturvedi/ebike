export type TAlertType = "smart" | "bms" | "mc"
export type TSort = { fieldName: string, direction: 'descend' | 'ascend' }
export type TFilter = { fieldName: string, value: string }
export type TPagination = {
    pageNumber: number,
    pageSize: number,
}
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

export interface TtrendTotalAlerts {
    date: string,
    count: number
}
export interface TlowMileageGraph {
    data: any,
}
export interface TvehicleUsageGraph {
    data: any,
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

export interface TAlertInsights {
    totalDistInKm: string,
    utilization: string,
    ridesPerMnthInKm: string,
    avgRangeRideInKm: string,
    avgMileageInKm: string
}

export interface TPastAlert {
    vehicleId: string,
    alertTime: string,
    tat: string,
    alertId: string,
    location: string,
    alertGraph: boolean
}

export interface State {
    alerts: {
        smart: {
            [alertId: string]: AlertData
        },
        bms: {
            [alertId: string]: AlertData,
        },
        mc: {
            [alertId: string]: AlertData
        },
        smartCount: number,
        bmsCount: number,
        mcCount: number,
        sort: TSort,
        pagination: TPagination,
        filter: TFilter,
        activeAlertTab: TAlertType
    },
    trendTotalAlerts: TtrendTotalAlerts[],
    trendTop5Alert: TtrendTop5Alert,
    trendLocationWise: TtrendLocationWise,
    alertInsights: TAlertInsights,
    pastAlerts: {
        data: {
            [alertId: string]: TPastAlert
        }
        sort: TSort,
        pagination: TPagination,
    },
    lowMileage: TlowMileageGraph,
    vehicleUsage: TvehicleUsageGraph,
    trendsZoom: number,
}

const connectmState: State = {
    alerts: {
        smart: {},
        bms: {},
        mc: {},
        smartCount: 0,
        bmsCount: 0,
        mcCount: 0,
        pagination: {
            pageNumber: 1,
            pageSize: 10,
        },
        sort: {
            fieldName: "Time",
            direction: 'descend'
        },
        filter: { fieldName: "all", value: "" },
        activeAlertTab: "smart"
    },
    trendTotalAlerts: [],
    trendTop5Alert: { data: [], lines: {} },
    trendLocationWise: { data: [], lines: {} },
    lowMileage: { data: [] },
    vehicleUsage: { data: [] },
    alertInsights: {
        avgMileageInKm: "N/A",
        avgRangeRideInKm: "N/A",
        ridesPerMnthInKm: "N/A",
        totalDistInKm: "N/A",
        utilization: "N/A"
    },
    pastAlerts: {
        data: {},
        sort: {
            fieldName: "alertTime",
            direction: 'descend'
        },
        pagination: {
            pageNumber: 1,
            pageSize: 10,
        },
    },
    trendsZoom: 0
}
//filter - option, filter type,

export default connectmState;