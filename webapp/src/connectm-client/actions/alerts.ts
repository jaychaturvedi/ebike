import { Dispatch } from "redux";
import {  TAlertType, TSort, TPagination, TFilter, TSearchFilter, TAlertPagination } from "../redux/models";
import { State} from "../redux/connectm-state"
export type AlertActions = "GET_ALERTS" | "UPDATE_ACTIVE_ALERT" | "UPDATE_FILTER"
export type SearchActions = "GET_SEARCH_OPTIONS"

export interface AlertTypePayload {
    alertType: TAlertType
}
export interface AlertPayload extends AlertTypePayload {
    pagination: TPagination,
    sort: TSort,
    filter: TFilter,
    locationFilter: TFilter,
    vehicleFilter: TFilter,
    timeFrameFilter: TFilter,
    searchFilter: TSearchFilter,
    alertPagination:TAlertPagination,
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
export interface SearchPayload {
  frameId: string,
  pageNo: number,
  pageSize: number
}
export interface ISearchAction {
  type: SearchActions,
  payload: SearchPayload
}

export function SearchAction(params: ISearchAction): ISearchAction {
  return {
      type: params.type,
      payload: params.payload
  }
}

export interface ReduxAlertActions {
    getAlerts: (params: IAlertActions) => IAlertActions,
    alertTabChanged: (params: IAlertActions) => IAlertActions,
    alertFilterChanged: (params: IAlertActions) => IAlertActions,
    getDropdownFilters: (params: IDropdownFilterActions) => IDropdownFilterActions,
    getSearchOptions: (params: ISearchAction) => ISearchAction,
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxAlertActions {
    return {
        getAlerts: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        alertTabChanged: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        alertFilterChanged: (params: IAlertActions) => dispatch(RnDAlerts(params)),
        getDropdownFilters: (params: IDropdownFilterActions) => dispatch(DropdownFilters(params)),
        getSearchOptions: (params: ISearchAction) => dispatch(SearchAction(params)),
    }
}

export interface ReduxAlertState {
    alerts: State['alerts'],
    dropdownFilters:State['dropdownFilters'],
    searchOptions: State["searchOptions"],
}

export function mapStateToProps(state: State): ReduxAlertState {
    return {
        alerts: state.alerts,
        dropdownFilters: state.dropdownFilters,
        searchOptions: state.searchOptions,
    }
}