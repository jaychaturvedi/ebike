import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";

type QuickSightActions = "GET_QUICKSIGHT_EMBED_URL" | "CLEAR_QUICKSIGHT_EMBED_URL";

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
export interface IClearQuickSightAction {
  type: QuickSightActions,
}

export function ClearQuickSightUrl(params: IClearQuickSightAction) {
  return {
    type: params.type,
  }
}

export interface ReduxQuickSightState {
  quickSightUrl: State["quickSightUrl"]
}

export interface ReduxQuickSightAction {
  QuickSightAction: (params: IQuickSightAction) => IQuickSightAction,
  ClearQuickSightAction: (params: IClearQuickSightAction) => IClearQuickSightAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxQuickSightAction {
  return {
    QuickSightAction: (params: IQuickSightAction) => dispatch(QuickSight(params)),
    ClearQuickSightAction: (params: IClearQuickSightAction) => dispatch(ClearQuickSightUrl(params))

  }
}

export function mapStateToProps(state: State): ReduxQuickSightState {
  return {
    quickSightUrl: state.quickSightUrl
  }
}
