import { Dispatch } from "redux";
import { State,TAlertType } from "../redux/connectm-state";

export type AlertActions = "GET_ALERTS" | "UPDATE_ACTIVE_ALERT"

export interface AlertTypePayload {
    alertType: TAlertType
}
export interface AlertPayload extends AlertTypePayload  {
    pageNumber: number,
    pageSize: number
}

export interface IAlertActions {
    type: AlertActions,
    payload: AlertPayload
}

export function RnDAlerts(params: IAlertActions): IAlertActions {
    return {
        type: params.type,
        payload: params.payload
    }
}

export interface ReduxAlertActions {
    getAlerts: (params: IAlertActions) => IAlertActions,
    alertTabChanged : (params : IAlertActions) => IAlertActions
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertActions {
    return {
        getAlerts: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        alertTabChanged : (params: IAlertActions) => dispatch(RnDAlerts(params))
    }
}

export interface ReduxAlertState {
    alerts: State['alerts']
}

export function mapStateToProps(state: State): ReduxAlertState {
    return {
        alerts: state.alerts
    }
}