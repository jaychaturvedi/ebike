import { Dispatch } from "redux";
import { TAlertType, TSort, TPagination, TPastAlert } from "../redux/models";
import { State } from "../redux/connectm-state"
import { IAlertGraphActions, GraphAlerts } from "./graph";
export type AlertDetailActions = "GET_ALERTS_INSIGHTS" | "STORE_ALERTS_INSIGHTS" |
    "GET_PAST_ALERTS" | "STORE_PAST_ALERTS" | "UPDATE_PAST_ALERTS"
    | "POST_ALERT_CLEARANCE" | "GET_SINGLE_ALERT" | "RESET_ALERT_MAIN_PAGE" | "CLEAR_ALERT_GRAPH"

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
    pastAlerts: TPastAlert
}

export interface SingleAlertPayload {
    alertId: string,
    alertType: TAlertType
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
/////////////////////////////////Clear alert graph/////////////
export interface ClearAlertGraphPayload {
    alertName: string,
}

export interface IClearGraphActions {
    type: AlertDetailActions,
    payload: ClearAlertGraphPayload
}

export function ClearGraphAlerts(params: IClearGraphActions): IClearGraphActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
/////////////////////////single alert detail
export interface ISingleAlertDetailAction {
    type: AlertDetailActions,
    payload: SingleAlertPayload
}

export function SingleAlert(params: ISingleAlertDetailAction): ISingleAlertDetailAction {
    return {
        type: params.type,
        payload: params.payload
    }
}
//single alert detail graph

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
    getSingleAlertDetail: (params: ISingleAlertDetailAction) => ISingleAlertDetailAction,
    navigation: (params: IAlertDetailActions) => IAlertDetailActions,
    clearAlertGraph: (params: IClearGraphActions) => IClearGraphActions,
    getPastAlertGraph: (params: IAlertGraphActions) => IAlertGraphActions,
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertDetailActions {
    return {
        getAlertsInsights: (params: IAlertDetailActions) => dispatch(DetailAlerts(params)),
        getPastAlerts: (params: IAlertDetailActions) => dispatch(DetailAlerts(params)),
        updatePastAlerts: (params: IPastAlertDetailActions) => dispatch(PastAlerts(params)),
        postAlertClearanceComment: (params: IAlertDetailActions) => dispatch(DetailAlerts(params)),
        getSingleAlertDetail: (params: ISingleAlertDetailAction) => dispatch(SingleAlert(params)),
        navigation: (params: IAlertDetailActions) => dispatch(DetailAlerts(params)),
        clearAlertGraph: (params: IClearGraphActions) => dispatch(ClearGraphAlerts(params)),
        getPastAlertGraph: (params: IAlertGraphActions) => dispatch(GraphAlerts(params)),
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