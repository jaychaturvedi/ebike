import axios from "axios"
import { call, put } from "redux-saga/effects"
import { IMapMarkerAction } from "../actions/map"
import { TMapMarkers } from "../redux/models"

export type Store_MapMarkers = {
  type: "STORE_MAPMARKERS",
  payload: {
    mapMarkers: TMapMarkers[]
  }
}

export function* getMapMarkers(params: IMapMarkerAction) {
  try {
    const data: TMapMarkers[] = yield call(getMarkersForCustomer, params)
    yield put({
      type: "STORE_MAPMARKERS",
      payload: {
        mapMarkers: data
      }
    } as Store_MapMarkers)
  } catch (error) {
    console.log("error", error)
  }
}

async function getMarkersForCustomer(params: IMapMarkerAction) {
  const response = await axios.get(process.env.REACT_APP_WEBAPIURL +
    "/customerLiveLocation/" + params.payload.customerId)
  console.log("api response of mapMarkers", response);
  return response.data.body as TMapMarkers[]
}