import { Dispatch } from "redux";
import { State, TAlertType, TSort, TPagination, TFilter, TtrendLocationWise, TtrendTotalAlerts, TtrendTop5Alert } from "../redux/connectm-state";
import { stat } from "fs";

export type AlertTrendsActions = "GET_ALERT_TRENDS" | "STORE_GET_ALERT_TRENDS" | "UPDATE_ALERT_TRENDS"

export interface AlertTrendsPayload {
    alertType: TAlertType
    startDate: string,
    endDate: string,
    trendsZoom: number
}

export interface UpdateTrendsPayload {
    trendTop5Alert: TtrendTop5Alert,
    trendLocationWise: TtrendLocationWise,
    trendTotalAlert: TtrendTotalAlerts[],
    trendsZoom: number
}

export interface IAlertTrendActions {
    type: AlertTrendsActions,
    payload: AlertTrendsPayload
}

export interface IAlertUpdateActions {
    type: AlertTrendsActions,
    payload: UpdateTrendsPayload
}

export function TrendAlerts(params: IAlertTrendActions): IAlertTrendActions {
    return {
        type: params.type,
        payload: params.payload
    }
}

export function UpdateTrends(params: IAlertUpdateActions): IAlertUpdateActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
export interface ReduxAlertTrendActions {
    getAlertTrends: (params: IAlertTrendActions) => IAlertTrendActions,
    updateAlertTrends: (params: IAlertUpdateActions) => IAlertUpdateActions,

}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertTrendActions {
    return {
        getAlertTrends: (params: IAlertTrendActions) => dispatch(TrendAlerts(params)),
        updateAlertTrends: (params: IAlertUpdateActions) => dispatch(UpdateTrends(params))
    }
}

export interface ReduxAlertTrendState {
    trendTotalAlert: State["trendTotalAlerts"],
    trendTop5Alert: State["trendTop5Alert"],
    trendLocationWise: State["trendLocationWise"],
    trendsZoom: State["trendsZoom"]
}

export function mapStateToProps(state: State): ReduxAlertTrendState {
    return {
        trendTop5Alert: state.trendTop5Alert,
        trendLocationWise: state.trendLocationWise,
        trendTotalAlert: state.trendTotalAlerts,
        trendsZoom: state.trendsZoom
    }
}