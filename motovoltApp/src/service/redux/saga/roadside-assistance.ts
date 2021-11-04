import {
  call,
  put,
} from "redux-saga/effects";
import * as RsaActions from "../actions/saga/roadside-actions";
import { config, request, yantraRequest } from "./utils";
import { Store_RoadSideAssistance, Store_UpdateError } from "../actions/store";
import { UnknownError } from "../../server-error";
import { TRoadSideAssistance } from "../store";

export function* getRoadSideAssitance(params: RsaActions.GetRoadSideAssitance) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/roadsideassist`, "POST",
      {
        "frame_id": params.payload.frameId,
        "description": params.payload.description,
        "lat": params.payload.lat,
        "lon": params.payload.lon,
        "dist": params.payload.dist
      });
    if (dataResponse.success) {
      const data: TRoadSideAssistance = dataResponse.response.body;
      yield put({
        type: "Store_RoadSideAssistance",
        payload:{
           ...data,
           isStale: false
          }
      } as Store_RoadSideAssistance);
    }
    else {
      yield put({
        type: 'Store_UpdateError',
        payload: {
          error: UnknownError
        }
      } as Store_UpdateError)
    }
  } catch (error) {
    console.log(error)
    yield put({
      type: 'Store_UpdateError',
      payload: {
        error: UnknownError
      }
    } as Store_UpdateError)
  }
}