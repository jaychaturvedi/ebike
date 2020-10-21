import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";

type DashboardAction = "GET_DASHBOARD_LIST";

export interface DashboardPayload {
}

export interface IDashboardAction {
  type: DashboardAction,
  payload: DashboardPayload
}

export function QuickSight(params: IDashboardAction) {
  return {
    type: params.type,
    payload: params.payload
  }
}
export interface ReduxDashboardAction {
  getDashboardList: (params: IDashboardAction) => IDashboardAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxDashboardAction {
  return {
    getDashboardList: (params: IDashboardAction) => dispatch(QuickSight(params))
  }
}
export interface ReduxDashboardState {
  dashboardList: State["dashboardList"]
}

export function mapStateToProps(state: State): ReduxDashboardState {
  return {
    dashboardList: state.dashboardList
  }
}
