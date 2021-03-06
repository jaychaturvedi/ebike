import {
    AlertData, TSort, TPagination, TFilter, TAlertType, TtrendTotalAlerts,
    TtrendTop5Alert, TtrendLocationWise, TAlertInsights, TPastAlertData, User,
     TDashboardList, TMapMarkers, TDropdownFilters, TMapViewFilters, TSearchOptions, TSearchFilter, TAlertPagination
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
        alertData:{
          "smart":AlertData[],
          "bms":AlertData[],
          "mc":AlertData[]
        },
        smartCount: number,
        bmsCount: number,
        mcCount: number,
        sort: TSort,
        pagination: TPagination,
        alertPagination:TAlertPagination,
        filter: TFilter,
        locationFilter: TFilter,
        vehicleFilter: TFilter,
        timeFrameFilter: TFilter,
        searchFilter: TSearchFilter,
        activeAlertTab: TAlertType
    },
    trendTotalAlerts: TtrendTotalAlerts,
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
    },
    quickSightUrl:string,
    dashboardList:TDashboardList[],
    mapMarkers:TMapMarkers[], // map markers in map view map
    dropdownFilters:TDropdownFilters, ///dropdown filters in alerts page
    mapViewDropDownFilters : TMapViewFilters, // dynamic Dropdown Filters in map view
    searchOptions: TSearchOptions[],
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
        alertData:{
          "smart":[],
          "bms":[],
          "mc":[]
        },
        smartCount: 0,
        bmsCount: 0,
        mcCount: 0,
        pagination: {
            pageNumber: 1,
            pageSize: 10,
        },
        sort: {
            fieldName: "Time",
            direction: 'ascend'
        },
        alertPagination: {
          smart: {
            pageNumber: 1,
            pageSize: 10,
          },
          bms: {
            pageNumber: 1,
            pageSize: 10,
          },
          mc: {
            pageNumber: 1,
            pageSize: 10,
          }
        },
        filter: { fieldName: "all", value: "" },
        locationFilter: { fieldName: "all", value: "" },
        vehicleFilter: { fieldName: "all", value: "" },
        timeFrameFilter: { fieldName: "all", value: "" },
        searchFilter: { fieldName: "all", value: "", isVehicle:false },
        activeAlertTab: "smart"
    },
    trendTotalAlerts: { data: [] },
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
    graphs: [],
    quickSightUrl:"",
    dashboardList:[],
    mapMarkers:[],
    dropdownFilters:{
      location:[],
      vehicle:[]
    },
    mapViewDropDownFilters:{customer:[],location:[],region:[]},
    searchOptions: [],
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
        Severity: "-1",
        customerName:"N/A",
        alertId: -1,
        alertName: "N/A",
        alertTime: "N/A",
        batteryId: "N/A",
        customerId: "N/A",
        frameId: "N/A",
        location: "N/A",
        mfgDate: "N/A",
        model: "N/A",
        openSince: "N/A",
        alertCode:"N/A",
        alertTypeId:-1,
        alertType:"N/A",
        alarmValue:"N/A"
    }
    return alert;
}