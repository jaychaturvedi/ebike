import {
    AlertData, TSort, TPagination, TFilter, TAlertType, TtrendTotalAlerts,
    TtrendTop5Alert, TtrendLocationWise, TAlertInsights, TPastAlertData
} from "./models";

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
            [alertId: string]: TPastAlertData
        },
        dataCount: number
        sort: TSort,
        pagination: TPagination,
    },
    // lowMileage: TlowMileageGraph,
    // vehicleUsage: TvehicleUsageGraph,
    trendsZoom: number,
    graphs: {
        [alertTypeId: string]: any
    }
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
    graphs: {}
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
