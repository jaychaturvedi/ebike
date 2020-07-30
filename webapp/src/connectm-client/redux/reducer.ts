import connectmState, { State } from "./connectm-state";
import { IUsersAction } from "../actions/user"
import { Store_AlertUpdate,Store_AlertTabChange } from "../saga/alert"
type ActionParams = IUsersAction | Store_AlertUpdate | Store_AlertTabChange

const AppReducer = (state: State = connectmState, actionParams: ActionParams) => {
    switch (actionParams.type) {
        case "RECEIVED_USER": {
            return {
                ...state,
                user: actionParams.payload
            }
        };
        case "STORE_ALERT_UPDATE": {
            const alertData = Object.assign({}, ...(actionParams as Store_AlertUpdate).payload.alerts.map(alert => {
                return {
                    [String(alert.alertId)]: alert
                }
            }))
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    [(actionParams as Store_AlertUpdate).payload.alertType]: alertData,
                    pageNumber: (actionParams as Store_AlertUpdate).payload.pageNumber,
                    pageSize: (actionParams as Store_AlertUpdate).payload.pageSize
                }
            }
        };
        case "STORE_ALERT_TAB_CHANGE" :{
            return {
                ...state,
                alerts :{
                    ...state.alerts,
                    activeAlertTab: (actionParams as Store_AlertTabChange).payload.alertType,
                    pageNumber: (actionParams as Store_AlertTabChange).payload.pageNumber,
                    pageSize: (actionParams as Store_AlertTabChange).payload.pageSize
                }
            }
        }
        default: {
            return state
        }
    }
}

export default AppReducer;