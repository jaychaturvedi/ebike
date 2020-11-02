import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";

type MapMarkerActions = "GET_MAP_MARKERS" | "UPDATE_MAP_MARKERS";

/////////////////////////GET_MAP_MARKERS//////////////////////

export interface MapMarkerPayload {
  customerId: string
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
////////////////////////////////////////////////////////////

export interface ReduxMapState {
  mapMarkers: State["mapMarkers"]
}

export interface ReduxMapAction {
  getMapMarkers: (params: IMapMarkerAction) => IMapMarkerAction,
  updateMapMarkers: (params: IUpdateAction) => IUpdateAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxMapAction {
  return {
    getMapMarkers: (params: IMapMarkerAction) => dispatch(Markers(params)),
    updateMapMarkers: (params: IUpdateAction) => dispatch(UpdateMarkers(params))
  }
}

export function mapStateToProps(state: State): ReduxMapState {
  return {
    mapMarkers: state.mapMarkers
  }
}
