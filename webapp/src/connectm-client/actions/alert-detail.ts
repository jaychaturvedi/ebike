import { Dispatch } from "redux";
import { State, TAlertType, TSort, TPagination, TFilter, TPastAlert } from "../redux/connectm-state";

export type AlertDetailActions = "GET_ALERTS_INSIGHTS" | "STORE_ALERTS_INSIGHTS" |
    "GET_PAST_ALERTS" | "STORE_PAST_ALERTS" | "UPDATE_PAST_ALERTS" | "POST_ALERT_CLEARANCE"

export interface AlertDetailPayload {
    pagination: TPagination,
    sort: TSort,
    vehicleID: string,
    alertId: number,
    alertName: string,
    customerId: string,
    alertType: TAlertType
    comment: string
}

export interface PastAlertDetailPayload {
    pagination: TPagination,
    sort: TSort,
    alertId: number,
    pastAlerts: TPastAlert[]
}
export interface IAlertDetailActions {
    type: AlertDetailActions,
    payload: AlertDetailPayload
}

//update past alert update
export interface IPastAlertDetailActions {
    type: AlertDetailActions,
    payload: PastAlertDetailPayload
}
export function PastAlerts(params: IPastAlertDetailActions): IPastAlertDetailActions {
    return {
        type: params.type,
        payload: params.payload
    }
}

export function DetailAlerts(params: IAlertDetailActions): IAlertDetailActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
export interface ReduxAlertDetailActions {
    getAlertsInsights: (params: IAlertDetailActions) => IAlertDetailActions,
    getPastAlerts: (params: IAlertDetailActions) => IAlertDetailActions,
    updatePastAlerts: (params: IPastAlertDetailActions) => IPastAlertDetailActions,
    postAlertClearanceComment: (params: IAlertDetailActions) => IAlertDetailActions,
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertDetailActions {
    return {
        getAlertsInsights: (params: IAlertDetailActions) => dispatch(DetailAlerts(params)),
        getPastAlerts: (params: IAlertDetailActions) => dispatch(DetailAlerts(params)),
        updatePastAlerts: (params: IPastAlertDetailActions) => dispatch(PastAlerts(params)),
        postAlertClearanceComment: (params: IAlertDetailActions) => dispatch(DetailAlerts(params))
    }
}

export interface ReduxAlertDetailState {
    alerts: State['alerts'],
    alertInsights: State['alertInsights']
    pastAlerts: State['pastAlerts']
}

export function mapStateToProps(state: State): ReduxAlertDetailState {
    return {
        alerts: state.alerts,
        alertInsights: state.alertInsights,
        pastAlerts: state.pastAlerts
    }
}