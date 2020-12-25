import connectmState, { State } from "./connectm-state"
import { IUsersAction } from "../actions/user"
import { Store_AlertUpdate, Store_AlertTabChange, Store_AlertFilterChange, Store_DropdownFilters } from "../saga/alert"
import { Store_GetAlertTrends, Store_UpdateALertTrends } from "../saga/trends";
import { Store_AlertGraph } from "../saga/graph";
import { Store_UserUpdate } from "../saga/user";
import { Store_AlertInsights, Store_PastAlert, Store_UpdatePastAlert, Store_UpdateSingleAlert } from "../saga/alert-detail";
import { Store_QuickSightUrl, Clear_QuickSightUrl } from "../saga/quickSight";
import { Store_DashboardList, Clear_DashboardList } from "../saga/dashboard"
import { Store_MapMarkers, Store_MapViewFilters } from "../saga/map"
import { Store_SearchOptions } from "../saga/search";

type ActionParams = IUsersAction
  | Store_AlertUpdate
  | Store_AlertTabChange
  | Store_AlertFilterChange
  | Store_AlertInsights
  | Store_GetAlertTrends
  | Store_PastAlert
  | Store_UpdatePastAlert
  | Store_UpdateALertTrends
  | Store_AlertGraph
  | Store_UpdateSingleAlert
  | Store_UserUpdate
  | Store_QuickSightUrl
  | Store_DashboardList
  | Clear_DashboardList
  | Clear_QuickSightUrl
  | Store_MapMarkers
  | Store_DropdownFilters
  | Store_MapViewFilters
  | Store_SearchOptions

const AppReducer = (state: State = connectmState, actionParams: ActionParams) => {
  switch (actionParams.type) {
    case "RECEIVED_USER": {
      return {
        ...state,
        user: actionParams.payload
      }
    };
    case "STORE_ALERT_UPDATE": {
      const smartAlertData = Object.assign({}, ...(actionParams as Store_AlertUpdate)
        .payload.alerts.smart.data.map(alert => {
          return {
            [String(alert.alertId)]: alert
          }
        }))
      const bmsAlertData = Object.assign({}, ...(actionParams as Store_AlertUpdate)
        .payload.alerts.bms.data.map(alert => {
          return {
            [String(alert.alertId)]: alert
          }
        }))
      const mcAlertData = Object.assign({}, ...(actionParams as Store_AlertUpdate)
        .payload.alerts.mc.data.map(alert => {
          return {
            [String(alert.alertId)]: alert
          }
        }))
      return {
        ...state,
        alerts: {
          ...state.alerts,
          smart: smartAlertData,
          bms: bmsAlertData,
          mc: mcAlertData,
          alertData: {
            smart: (actionParams as Store_AlertUpdate).payload.alerts.smart.data,
            bms: (actionParams as Store_AlertUpdate).payload.alerts.bms.data,
            mc: (actionParams as Store_AlertUpdate).payload.alerts.mc.data,
          },
          pagination: (actionParams as Store_AlertUpdate).payload.pagination,
          sort: (actionParams as Store_AlertUpdate).payload.sort,
          smartCount: (actionParams as Store_AlertUpdate).payload.alerts.smart.dataCount,
          bmsCount: (actionParams as Store_AlertUpdate).payload.alerts.bms.dataCount,
          mcCount: (actionParams as Store_AlertUpdate).payload.alerts.mc.dataCount,
          activeAlertTab: (actionParams as Store_AlertUpdate).payload.alertType,
          alertPagination:{
            ...(actionParams as Store_AlertUpdate).payload.alertPagination,
          }
        }
      }
    };
    case "STORE_ALERT_TAB_CHANGE": {
      return {
        ...state,
        alerts: {
          ...state.alerts,
          activeAlertTab: (actionParams as Store_AlertTabChange).payload.alertType,
          pagination: (actionParams as Store_AlertTabChange).payload.pagination,
          alertPagination:(actionParams as Store_AlertTabChange).payload.alertPagination
        }
      }
    };
    case "STORE_UPDATE_FILTER": {
      return {
        ...state,
        alerts: {
          ...state.alerts,
          filter: (actionParams as Store_AlertFilterChange).payload.filter,
          locationFilter: (actionParams as Store_AlertFilterChange).payload.locationFilter,
          vehicleFilter: (actionParams as Store_AlertFilterChange).payload.vehicleFilter,
          timeFrameFilter: (actionParams as Store_AlertFilterChange).payload.timeFrameFilter,
          searchFilter: (actionParams as Store_AlertFilterChange).payload.searchFilter,
          pagination: (actionParams as Store_AlertFilterChange).payload.pagination,
          alertPagination:(actionParams as Store_AlertFilterChange).payload.alertPagination
        }
      }
    }
    case "STORE_GET_ALERT_TRENDS": {
      return {
        ...state,
        trendTotalAlerts: (actionParams as Store_GetAlertTrends).payload.trendTotalAlert,
        trendTop5Alert: (actionParams as Store_GetAlertTrends).payload.trendTop5Alert,
        trendLocationWise: (actionParams as Store_GetAlertTrends).payload.trendLocationWise
      }
    }
    case "STORE_ALERTS_INSIGHTS": {
      return {
        ...state,
        alertInsights: (actionParams as Store_AlertInsights).payload.alertInsight
      }
    }

    case "STORE_PAST_ALERTS": {
      const pastAlerts = Object.assign({}, ...(actionParams as Store_PastAlert)
        .payload.pastAlert.data.map(alert => {
          return {
            [String(alert.alertId)]: alert
          }
        }))
      return {
        ...state,
        pastAlerts: {
          ...state.pastAlerts,
          pagination: (actionParams as Store_PastAlert).payload.pagination,
          sort: (actionParams as Store_PastAlert).payload.sort,
          data: pastAlerts,
          dataCount: (actionParams as Store_PastAlert).payload.pastAlert.dataCount
        }
      }
    }
    case "STORE_UPDATE_PAST_ALERTS": {
      const pastAlerts = Object.assign({}, ...(actionParams as Store_UpdatePastAlert)
        .payload.pastAlert.data.map(alert => {
          return {
            [String(alert.alertId)]: alert
          }
        }))
      return {
        ...state,
        pastAlerts: {
          ...state.pastAlerts,
          pagination: (actionParams as Store_UpdatePastAlert).payload.pagination,
          sort: (actionParams as Store_UpdatePastAlert).payload.sort,
          data: pastAlerts,
          dataCount: (actionParams as Store_UpdatePastAlert).payload.pastAlert.dataCount
        }
      }
    }
    case "STORE_ALERT_UPDATE_TRENDS": {
      return {
        ...state,
        trendTotalAlerts: (actionParams as Store_UpdateALertTrends).payload.trendTotalAlert,
        trendTop5Alert: (actionParams as Store_UpdateALertTrends).payload.trendTop5Alert,
        trendLocationWise: (actionParams as Store_UpdateALertTrends).payload.trendLocationWise,
        trendsZoom: (actionParams as Store_UpdateALertTrends).payload.trendsZoom,
      }
    }
    case "STORE_ALERT_GRAPH": {
      return {
        ...state,
        graphs: {
          ...state.graphs,
          [String(actionParams.payload.alertTypeId)]: actionParams.payload.data
        }
      }
    }
    case "STORE_UPDATE_SINGLE_ALERT": {
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [actionParams.payload.alertType]: {
            [actionParams.payload.alertId]: actionParams.payload.alertData
          }
        }
      }
    }
    case "STORE_USER_UPDATE": {
      return {
        ...state,
        user: actionParams.payload
      }
    }
    case "STORE_QUICKSIGHTURL": {
      return {
        ...state,
        quickSightUrl: (actionParams as Store_QuickSightUrl).payload.quickSightUrl
      }
    }
    case "CLEAR_QUICKSIGHT_URL": {
      return {
        ...state,
        quickSightUrl: ""
      }
    }
    case "STORE_DASHBOARDLIST": {
      return {
        ...state,
        dashboardList: (actionParams as Store_DashboardList).payload.dashboardList
      }
    }
    case "STORE_MAPMARKERS": {
      return {
        ...state,
        mapMarkers: (actionParams as Store_MapMarkers).payload.mapMarkers
      }
    }
    case "CLEAR_DASHBOARDLIST": {
      return {
        ...state,
        dashboardList: []
      }
    }
    case "STORE_DROPDOWN_FILTERS":{
      return {
        ...state,
        dropdownFilters: (actionParams as Store_DropdownFilters).payload
      }
    }
    case "STORE_MAPVIEWFILTERS":{
      return{
        ...state,
        mapViewDropDownFilters :(actionParams as Store_MapViewFilters).payload.mapViewDropDownFilters
      }
    }
    case "STORE_SEARCH_OPTIONS": {
      return {
          ...state,
          searchOptions: (actionParams as Store_SearchOptions).payload.searchOptions
      }
    }
    default: {
      return state
    }
  }
}

export default AppReducer;