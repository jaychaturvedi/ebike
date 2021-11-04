import {
  call,
  put,
} from "redux-saga/effects";
import * as SmartInspectInspection from "../actions/saga/smartInspect-actions";
import { config, request, yantraRequest } from "./utils";
import { Store_SmartInspectionAbortedReport, Store_SmartInspectionReport, Store_UpdateError } from "../actions/store";
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
            isStale: false,
            frameId: data.frameId,
            status: data.status,
            deviceId: data.deviceId,
            fromDate: data.fromDate,
            toDate: data.toDate,
            overallHealth: data.overallHealth,
            battery: data.battery,
            motor: data.motor,
            smartServices: data.smartServices
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

export function* beginAbortInspection(params: SmartInspectInspection.BeginAbortInspection) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/abortSmartInspectionAPI?frameId=${params.payload.frameId}`, "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body;
      yield put({
        type: "Store_SmartInspectionAbortedReport",
        payload: {
          smartInspectAbortedReport: {
            isStale: false,
            frameId: data.frameId,
            status: data.status,
            deviceId: data.deviceId,
            fromDate: data.fromDate,
            toDate: data.toDate,
            overallHealth: data.overallHealth,
            battery: data.battery,
            motor: data.motor,
            smartServices: data.smartServices
          }
        }
      } as Store_SmartInspectionAbortedReport);
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

export function* clearInspectionReport(params: SmartInspectInspection.ClearInspectionReport) {
  try {
    if (params.payload.name === "smartInspectionReport") {
      yield put({
        type: "Store_SmartInspectionReport",
        payload: {
          smartInspectReport: {
            isStale: true,
            status: ""
          }
        }
      } as Store_SmartInspectionReport);
    }
    if (params.payload.name === "smartInspectionAbortedReport") {
      yield put({
        type: "Store_SmartInspectionAbortedReport",
        payload: {
          smartInspectAbortedReport:{
            isStale: true,
            status:""
          }
        }
      } as Store_SmartInspectionAbortedReport);
    }
    // Update redux with ride details
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