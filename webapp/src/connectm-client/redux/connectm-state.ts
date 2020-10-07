import {
    AlertData, TSort, TPagination, TFilter, TAlertType, TtrendTotalAlerts,
    TtrendTop5Alert, TtrendLocationWise, TAlertInsights, TPastAlertData, Alert, User
} from "./models";

export interface State {
    user: User,
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
            [alertId: string]: TPastAlertData
        },
        dataCount: number
        sort: TSort,
        pagination: TPagination,
    },
    trendsZoom: number,
    graphs: {
        [alertTypeId: string]: any
    }
}

const connectmState: State = {
    user: {
        authenticated: false,
        user: null,
    },
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
    alertInsights: alertInsightsLimpData(),
    pastAlerts: {
        data: {},
        dataCount: 0,
        sort: {
            fieldName: "alertTime",
            direction: 'descend'
        },
        pagination: {
            pageNumber: 1,
            pageSize: 10,
        },
    },
    trendsZoom: 0,
    graphs: []
}

export default connectmState;


export function alertInsightsLimpData() {
    const alertInsights: TAlertInsights = {
        avgMileageInKm: "N/A",
        avgRangeRideInKm: "N/A",
        ridesPerMnthInKm: "N/A",
        totalDistInKm: "N/A",
        utilization: "N/A"
    }
    return alertInsights
}

export function alertLimpData() {
    const alert: AlertData = {
        Severity: -1,
        alertId: -1,
        alertName: "N/A",
        alertTime: "N/A",
        batteryId: "N/A",
        customerId: "N/A",
        frameId: "N/A",
        location: "N/A",
        mfgDate: "N/A",
        model: "N/A",
        openSince: "N/A"
    }
    return alert;
}