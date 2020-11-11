import { Dispatch } from "redux";
import {  TAlertType, TSort, TPagination, TFilter } from "../redux/models";
import { State} from "../redux/connectm-state"
export type AlertActions = "GET_ALERTS" | "UPDATE_ACTIVE_ALERT" | "UPDATE_FILTER"

export interface AlertTypePayload {
    alertType: TAlertType
}
export interface AlertPayload extends AlertTypePayload {
    pagination: TPagination,
    sort: TSort,
    filter: TFilter
}

export interface IAlertActions {
    type: AlertActions,
    payload: AlertPayload
}
export interface IDropdownFilterActions {
  type: "GET_DROPDOWN_FILTERS",
  payload: {}
}

export function RnDAlerts(params: IAlertActions): IAlertActions {
    return {
        type: params.type,
        payload: params.payload
    }
}
export function DropdownFilters(params: IDropdownFilterActions): IDropdownFilterActions {
  return {
      type: params.type,
      payload: params.payload
  }
}
export interface ReduxAlertActions {
    getAlerts: (params: IAlertActions) => IAlertActions,
    alertTabChanged: (params: IAlertActions) => IAlertActions,
    alertFilterChanged: (params: IAlertActions) => IAlertActions,
    getDropdownFilters: (params: IDropdownFilterActions) => IDropdownFilterActions
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertActions {
    return {
        getAlerts: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        alertTabChanged: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        alertFilterChanged: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        getDropdownFilters: (params: IDropdownFilterActions) => dispatch(DropdownFilters(params))
    }
}

export interface ReduxAlertState {
    alerts: State['alerts'],
    dropdownFilters:State['dropdownFilters']
}

export function mapStateToProps(state: State): ReduxAlertState {
    return {
        alerts: state.alerts,
        dropdownFilters: state.dropdownFilters
    }
}