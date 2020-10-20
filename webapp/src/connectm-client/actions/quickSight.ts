import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";

type QuickSightActions = "GET_QUICKSIGHT_EMBED_URL";

export interface QuickSightPayload {
  dashboardId: string
}
export interface IQuickSightAction {
  type: QuickSightActions,
  payload: QuickSightPayload
}

export function QuickSight(params: IQuickSightAction) {
  return {
    type: params.type,
    payload: params.payload
  }
}
export interface ReduxQuickSightAction {
  QuickSightAction: (params: IQuickSightAction) => IQuickSightAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxQuickSightAction {
  return {
    QuickSightAction: (params: IQuickSightAction) => dispatch(QuickSight(params))
  }
}
export interface ReduxQuickSightState {
  quickSightUrl: State["quickSightUrl"]
}

export function mapStateToProps(state: State): ReduxQuickSightState {
  return {
    quickSightUrl: state.quickSightUrl
  }
}
