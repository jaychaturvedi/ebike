import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";


export type AlertGraphActions = "GET_ALERT_GRAPH" 

//////////////////////////////Get alert graph
export interface AlertGraphPayload {
    vehicleId: string,
    alertId: number,
    alertName: string,
    alertTypeId: number,
    timeStamp:string,
    alertCode:string
}
export interface ClearAlertGraphPayload {
  alertTypeId: number
}
export interface IAlertGraphActions {
    type: AlertGraphActions,
    payload: AlertGraphPayload
}
export interface IClearAlertGraphActions {
  type: "CLEAR_ALERT_GRAPH_DATA",
  payload: ClearAlertGraphPayload
}

export function GraphAlerts(params: IAlertGraphActions): IAlertGraphActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
export function ClearGraphAlerts(params: IClearAlertGraphActions): IClearAlertGraphActions {
  return {
      type: params.type,
      payload: params.payload
  }
}

export interface ReduxAlertGraphActions {
    getAlertGraph: (params: IAlertGraphActions) => IAlertGraphActions,
    clearAlertGraph: (params : IClearAlertGraphActions) => IClearAlertGraphActions
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertGraphActions {
    return {
        getAlertGraph: (params: IAlertGraphActions) => dispatch(GraphAlerts(params)),
        clearAlertGraph: (params: IClearAlertGraphActions) => dispatch(ClearGraphAlerts(params)),
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