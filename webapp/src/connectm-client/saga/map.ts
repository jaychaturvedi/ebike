import axios from "axios"
import { call, put } from "redux-saga/effects"
import { IMapMarkerAction, IMapViewFilterAction } from "../actions/map"
import { TMapMarkers, TMapViewFilters } from "../redux/models"

export type Store_MapMarkers = {
  type: "STORE_MAPMARKERS",
  payload: {
    mapMarkers: TMapMarkers[]
  }
}

export type Store_MapViewFilters={
  type: "STORE_MAPVIEWFILTERS",
  payload: {
    mapViewDropDownFilters: any
  }}

/////////////////////////GET_MAP_MARKERS//////////////////////
export function* getMapMarkers(params: IMapMarkerAction) {
  try {
    const data: TMapMarkers[] = yield call(getMarkersForCustomer, params)
    yield put({
      type: "STORE_MAPMARKERS",
      payload: {
        mapMarkers: data?.length ? data:[]
      }
    } as Store_MapMarkers)
  } catch (error) {
    console.log("error", error)
  }
}

async function getMarkersForCustomer(params: IMapMarkerAction) {
  // const response = await axios.get(process.env.REACT_APP_WEBAPIURL +
  //   "/customerLiveLocation/" + params.payload.customerId +
  //   "?" + "location=" + params.payload.location + "&zone=" + params.payload.zone)
  const response = await axios.post(process.env.REACT_APP_WEBAPPAPI + '/custlivelocation',
    {
      "custId": params.payload.customerId,
      "location": params.payload.location,
      "zone": params.payload.zone
    }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  return response.data as TMapMarkers[]
}
///////////////////////////GET DROPDOWN FILTERS IN MAP VIEW/////////////////////////////////
export function* getMapViewFilters(params: IMapViewFilterAction){
  const data: TMapViewFilters = yield call(getMapViewDropDownFilters, params)
  yield put({
    type: "STORE_MAPVIEWFILTERS",
    payload: {
      mapViewDropDownFilters: data
    }
  } as Store_MapViewFilters)
}

async function getMapViewDropDownFilters(params: IMapViewFilterAction) {
  const response = await axios.get(process.env.REACT_APP_WEBAPIURL +"/mapViewFilters")
  return response.data.body as any
}

