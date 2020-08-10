import connectmState, { State, TSort, AlertData } from "./connectm-state";
import { IUsersAction } from "../actions/user"
import { IAlertTrendActions } from "../actions/trends"
import { Store_AlertUpdate, Store_AlertTabChange, Store_AlertFilterChange } from "../saga/alert"
import { Store_GetAlertTrends } from "../saga/trends";
type ActionParams = IUsersAction
    | Store_AlertUpdate
    | Store_AlertTabChange
    | Store_AlertFilterChange
    | Store_GetAlertTrends

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
                    pagination: (actionParams as Store_AlertUpdate).payload.pagination,
                    sort: (actionParams as Store_AlertUpdate).payload.sort,
                    smartCount: (actionParams as Store_AlertUpdate).payload.alerts.smart.dataCount,
                    bmsCount: (actionParams as Store_AlertUpdate).payload.alerts.bms.dataCount,
                    mcCount: (actionParams as Store_AlertUpdate).payload.alerts.mc.dataCount,
                }
            }
        };
        case "STORE_ALERT_TAB_CHANGE": {
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    activeAlertTab: (actionParams as Store_AlertTabChange).payload.alertType,
                    pagination: (actionParams as Store_AlertTabChange).payload.pagination
                }
            }
        };
        case "STORE_UPDATE_FILTER": {
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    filter: (actionParams as Store_AlertFilterChange).payload.filter,
                    pagination: (actionParams as Store_AlertFilterChange).payload.pagination
                }
            }
        }
        case "STORE_GET_ALERT_TRENDS": {
            return {
                ...state,
                trendTotalAlerts: (actionParams).payload.trendTotalAlert,
                trendTop5Alert: (actionParams).payload.trendTop5Alert,
                trendLocationWise: (actionParams).payload.trendLocationWise
            }
        }
        default: {
            return state
        }
    }
}

export default AppReducer;