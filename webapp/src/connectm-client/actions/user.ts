import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";
import { IAlertActions, RnDAlerts } from "./alerts";

type UserActions = "RECEIVED_USER" | "GET_USER" | "UPDATE_USER";

export interface UserPayload {
  authenticated: boolean,
  user: any
}
export interface IUsersAction {
  type: UserActions,
  payload: UserPayload
}

export function UsersAction(params: IUsersAction) {
  return {
    type: params.type,
    payload: params.payload
  }
}
export interface ReduxUserAction {
  usersAction: (params: IUsersAction) => IUsersAction,
  alertTabChanged: (params: IAlertActions) => IAlertActions,

}

export function mapDispatchToProps(dispatch: Dispatch): ReduxUserAction {
  return {
    usersAction: (params: IUsersAction) => dispatch(UsersAction(params)),
    alertTabChanged: (params: IAlertActions) => dispatch(RnDAlerts(params)),

  }
}
export interface ReduxUserState {
  user: State["user"],
  alerts: State["alerts"]
}

export function mapStateToProps(state: State): ReduxUserState {
  return {
    user: state.user,
    alerts: state.alerts
  }
}