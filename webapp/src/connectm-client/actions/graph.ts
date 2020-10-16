import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";


export type AlertGraphActions = "GET_ALERT_GRAPH" | "CLEAR_ALERT_GRAPH"

//////////////////////////////Get alert graph
export interface AlertGraphPayload {
    vehicleId: string,
    alertId: number,
    alertName: string,
    alertTypeId: number
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

/////////////////////////////////Clear alert graph/////////////
// export interface ClearAlertGraphPayload {
//     alertName: string,
// }

// export interface IClearGraphActions {
//     type: AlertGraphActions,
//     payload: ClearAlertGraphPayload
// }

// export function ClearGraphAlerts(params: IClearGraphActions): IClearGraphActions {
//     return {
//         type: params.type,
//         payload: params.payload
//     }
// }
//////////////////////////////////////////////////////////////

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
        graphs: state.graphs
    }
}