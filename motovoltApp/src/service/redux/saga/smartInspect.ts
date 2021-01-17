import {
  call,
  put,
} from "redux-saga/effects";
import * as SmartInspectInspection from "../actions/saga/smartInspect-actions";
import { config, request, yantraRequest } from "./utils";
import { Store_SmartInspectionProgress, Store_SmartInspectionReport, Store_UpdateError } from "../actions/store";
import { UnknownError } from "../../server-error";

export function* beginSmartInspection(params: SmartInspectInspection.BeginSmartInspection) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/getBasicSmartInspection?frameId=${params.payload.frameId}`, "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body;
      yield put({
        type: "Store_SmartInspectionReport",
        payload: {
          smartInspectReport: {
            frameId: data.frame_id,
            deviceId: data.device_id,
            fromDate: data.from_date,
            toDate: data.to_date,
            overallHealth: data.overall_health,
            battery: data.battery,
            motor: data.motor,
            smartServices: data.smart_services
          }
        }
      } as Store_SmartInspectionReport);
      // Update redux with ride details
    } else {
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

export function* UpdateSmartInspectionProgress(params: SmartInspectInspection.UpdateSmartInspectionProgress) {
  try {
    yield put({
      type: "Store_SmartInspectionProgress",
      payload: {
        percent: params.payload.percent
      }
    } as Store_SmartInspectionProgress);
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