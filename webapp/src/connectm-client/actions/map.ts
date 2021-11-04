import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";

type MapMarkerActions = "GET_MAP_MARKERS" | "UPDATE_MAP_MARKERS";

/////////////////////////GET_MAP_MARKERS//////////////////////

export interface MapMarkerPayload {
  customerId: string,
  location:string,
  zone:string
}
export interface IMapMarkerAction {
  type: MapMarkerActions,
  payload: MapMarkerPayload
}

export function Markers(params: IMapMarkerAction) {
  return {
    type: params.type,
    payload: params.payload
  }
}

/////////////////////////UPDATE_MAP_MARKERS//////////////////////
export interface IUpdateAction {
  type: MapMarkerActions,
  payload: MapMarkerPayload
}

export function UpdateMarkers(params: IUpdateAction) {
  return {
    type: params.type,
    payload: params.payload
  }
}
///////////////////////////GET DROPDOWN FILTERS IN MAP VIEW/////////////////////////////////
export interface IMapViewFilterAction {
  type: "GET_MAPVIEW_DROPDOWN_FILTERS"
}

export function MapViewFilters(params: IMapViewFilterAction) {
  return {
    type: params.type
  }
}

export interface ReduxMapState {
  mapMarkers: State["mapMarkers"],
  mapViewDropDownFilters :State["mapViewDropDownFilters"]
}

export interface ReduxMapAction {
  getMapMarkers: (params: IMapMarkerAction) => IMapMarkerAction,
  updateMapMarkers: (params: IUpdateAction) => IUpdateAction,
  getMapViewFilters: (params : IMapViewFilterAction) => IMapViewFilterAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxMapAction {
  return {
    getMapMarkers: (params: IMapMarkerAction) => dispatch(Markers(params)),
    updateMapMarkers: (params: IUpdateAction) => dispatch(UpdateMarkers(params)),
    getMapViewFilters : (params: IMapViewFilterAction) => dispatch(MapViewFilters(params))
  }
}

export function mapStateToProps(state: State): ReduxMapState {
  return {
    mapMarkers: state.mapMarkers,
    mapViewDropDownFilters: state.mapViewDropDownFilters
  }
}
