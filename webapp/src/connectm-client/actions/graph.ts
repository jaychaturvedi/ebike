import { Dispatch } from "redux";
import { State, TAlertType, TSort, TPagination, TFilter } from "../redux/connectm-state";


export type AlertGraphActions = "GET_LOW_MILEAGE" | "STORE_LOW_MILEAGE" |
    "GET_VEHICLE_USAGE" | "STORE_VEHICLE_USAGE"


export interface AlertGraphPayload {
    vehicleId: string,
    alertId: number,
    alertName?: string,
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
    getLowMileage: (params: IAlertGraphActions) => IAlertGraphActions,
    getVehicleUsage: (params: IAlertGraphActions) => IAlertGraphActions,
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertGraphActions {
    return {
        getLowMileage: (params: IAlertGraphActions) => dispatch(GraphAlerts(params)),
        getVehicleUsage: (params: IAlertGraphActions) => dispatch(GraphAlerts(params))
    }
}

export interface ReduxAlertGraphState {
    lowMileage: State["lowMileage"],
    vehicleUsage: State["vehicleUsage"],
}

export function mapStateToProps(state: State): ReduxAlertGraphState {
    return {
        vehicleUsage: state.vehicleUsage,
        lowMileage: state.lowMileage
    }
}