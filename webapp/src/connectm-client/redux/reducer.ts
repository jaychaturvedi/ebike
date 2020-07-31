import connectmState, { State, TSort, Alert } from "./connectm-state";
import { IUsersAction } from "../actions/user"
import { Store_AlertUpdate, Store_AlertTabChange } from "../saga/alert"
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
            // const sortedData: Alert[] = handleSort((actionParams as Store_AlertUpdate).payload.alerts,
            //     (actionParams as Store_AlertUpdate).payload.sort)
            // console.log("sorted data",sortedData)
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
                    pagination: (actionParams as Store_AlertUpdate).payload.pagination,
                    sort: (actionParams as Store_AlertUpdate).payload.sort
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
        }
        default: {
            return state
        }
    }
}

export default AppReducer;

// const handleSort = (arr: any, sort: TSort) => {
//     if (!sort.fieldName) { return arr }
//     let sortedData = arr.sort((a: any, b: any) => {
//         return a[sort.fieldName].localeCompare(b[sort.fieldName])
//     });
//     if (sort.direction == "descend") {
//         return sortedData.reverse()
//     }
//     return sortedData
// };