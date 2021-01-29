import {
  call,
  put,
} from "redux-saga/effects";
import * as BookServiceAction from "../actions/saga/book-a-service";
import { config, request, yantraRequest } from "./utils";
import {
  StoreServiceProviders, StoreAvailableTimeSlot, StorePastBookedServices,
  StoreOnBookingServiceStatus, StoreOnCancelServiceStatus, Store_UpdateError
} from "../actions/store";
import { UnknownError } from "../../server-error";
import { TServiceProviders, TPastBookedIssues, TAvailableServiceSlot } from "../store";

export interface yantraServiceProviderResponse {
  frame_id: string;
  book_service_id: number;
  status: string;
  service_provider_id: number;
  service_provider_name: string;
  service_type_id: number;
  service_type_name: string;
  service_date: string;
}
export interface yantraPastBookedIssue {
  frame_id: string;
  issue_id: number;
  status: string;
  cat_name: string;
  created_time: string;
}

export interface yantraAvailableServiceSlot {
  slot_name: string;
  slot_hour: number;
}

export function* getBookingServiceProviders(params: BookServiceAction.GetBookingServiceProviders) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/bookservicedetails?frame_id=${params.payload.frameId}`, "GET");
    if (dataResponse.success) {
      const data: TServiceProviders[] = dataResponse.response.body.map((item: yantraServiceProviderResponse) => {
        return {
          frameId: item.frame_id,
          bookServiceId: item.book_service_id,
          status: item.status,
          serviceProviderId: item.service_provider_id,
          serviceProviderName: item.service_provider_name,
          serviceTypeName: item.service_type_name,
          serviceDate: item.service_date,
          serviceTypeId: item.service_type_id
        } as TServiceProviders
      });
      yield put({
        type: "StoreServiceProviders",
        payload: data
      } as StoreServiceProviders);
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

export function* getPastIssuesList(params: BookServiceAction.GetPastIssuesList) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/raisedissuedetails?frame_id=${params.payload.frameId}`, "GET");
    if (dataResponse.success) {
      const data: TPastBookedIssues[] = dataResponse.response.body.map((item: yantraPastBookedIssue) => {
        return {
          frameId: item.frame_id,
          createdTime: item.created_time,
          issueId: item.issue_id,
          issueName: item.cat_name,
          status: item.status
        } as TPastBookedIssues
      });
      yield put({
        type: "StorePastBookedServices",
        payload: data
      } as StorePastBookedServices);
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

export function* getBookingTimeSlot(params: BookServiceAction.GetBookingTimeSlot) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/slotdetails?slot_group_id=${params.payload.slotGroupId}`, "GET");
    if (dataResponse.success) {
      const data: TAvailableServiceSlot[] = dataResponse.response.body.map((item: yantraAvailableServiceSlot) => {
        return {
          slotHour: item.slot_hour,
          slotName: item.slot_name
        } as TAvailableServiceSlot
      });
      yield put({
        type: "StoreAvailableTimeSlot",
        payload: data
      } as StoreAvailableTimeSlot);
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

export function* onBookingService(params: BookServiceAction.OnBookingService) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/bookservice`, 
    "POST",
      {
        "frame_id": params.payload.frameId,
        "service_provider_id": params.payload.serviceProviderId,
        "service_type_id": params.payload.serviceTypeId,
        "service_date": params.payload.serviceDate
      });
    if (dataResponse.success) {
      const data = dataResponse.response.body
      yield put({
        type: "StoreOnBookingServiceStatus",
        payload: data
      } as StoreOnBookingServiceStatus);
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

export function* onCancelBookingService(params: BookServiceAction.OnCancelService) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/cancelbookservice?serviceId=${params.payload.serviceId}`, "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body
      yield put({
        type: "StoreOnCancelServiceStatus",
        payload: data
      } as StoreOnCancelServiceStatus);
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