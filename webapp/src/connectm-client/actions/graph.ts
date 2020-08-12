import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";


export type AlertGraphActions = "GET_LOW_MILEAGE" | "STORE_LOW_MILEAGE" |
    "GET_VEHICLE_USAGE" | "STORE_VEHICLE_USAGE" | "GET_ALERT_GRAPH"


export interface AlertGraphPayload {
    vehicleId: string,
    alertId: number,
    alertName: string,
    alertTypeId : number
}

export interface IAlertGraphActions {
    type: AlertGraphActions,
    payload: AlertGraphPayload
}

export function GraphAlerts(params: IAlertGraphActions): IAlertGraphActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
export interface ReduxAlertGraphActions {
    getAlertGraph: (params: IAlertGraphActions) => IAlertGraphActions,
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertGraphActions {
    return {
        getAlertGraph: (params: IAlertGraphActions) => dispatch(GraphAlerts(params)),
    }
}

export interface ReduxAlertGraphState {
    graphs: State["graphs"],
}

export function mapStateToProps(state: State): ReduxAlertGraphState {
    return {
        graphs : state.graphs
    }
}