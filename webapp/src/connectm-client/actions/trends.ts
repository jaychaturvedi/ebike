import { Dispatch } from "redux";
import { State, TAlertType, TSort, TPagination, TFilter } from "../redux/connectm-state";

export type AlertTrendsActions = "GET_ALERT_TRENDS" | "STORE_GET_ALERT_TRENDS"

export interface AlertTrendsPayload {
    alertType: TAlertType
    startDate: string,
    endDate: string
}

export interface IAlertTrendActions {
    type: AlertTrendsActions,
    payload: AlertTrendsPayload
}

export function TrendAlerts(params: IAlertTrendActions): IAlertTrendActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
export interface ReduxAlertTrendActions {
    getAlertTrends: (params: IAlertTrendActions) => IAlertTrendActions,
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertTrendActions {
    return {
        getAlertTrends: (params: IAlertTrendActions) => dispatch(TrendAlerts(params))
    }
}

export interface ReduxAlertTrendState {
    trendTotalAlert: State["trendTotalAlerts"],
    trendTop5Alert: State["trendTop5Alert"],
    trendLocationWise: State["trendLocationWise"]
}

export function mapStateToProps(state: State): ReduxAlertTrendState {
    return {
        trendTop5Alert: state.trendTop5Alert,
        trendLocationWise: state.trendLocationWise,
        trendTotalAlert: state.trendTotalAlerts
    }
}