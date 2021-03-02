import {
  call,
  put,
} from "redux-saga/effects";
import * as ReportIssueAction from "../actions/saga/report-issue-actions";
import { config, request, yantraRequest } from "./utils";
import {
  Store_ReportIssueCategory, Store_UpdateError, Store_ReportIssueStatus,
  Store_ReportedIssue, Store_ReportedIssueConversation
} from "../actions/store";
import { UnknownError } from "../../server-error";
import { TReportedIssueConversation } from "../store";

export interface yantraIssueCategoryResponse {
  category_id: number;
  cat_name: string;
}

export function* GetReportIssueCategory(params: ReportIssueAction.GetReportIssueCategory) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/categorylist`, "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body?.map((item: yantraIssueCategoryResponse) => {
        return {
          categoryId: item.category_id,
          categoryName: item.cat_name
        }
      })
      yield put({
        type: "Store_ReportIssueCategory",
        payload: data
      } as Store_ReportIssueCategory);
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

export function* ReportAnIssue(params: ReportIssueAction.ReportAnIssue) {
  try {
    const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/raiseissue`, "POST",
      {
        "frame_id": params.payload.frameId,
        "raise_issue": params.payload.raiseIssue,
        "category_id": params.payload.categoryId,
        "type": params.payload.type,
        "issue_id": 2,
      });
    if (dataResponse.success) {
      const data = dataResponse.response.body
      yield put({
        type: "Store_ReportIssueStatus",
        payload: data
      } as Store_ReportIssueStatus);
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

interface yantraReportedIssueResponse {
  frame_id: string;
  issue_id: number;
  status: string;
  cat_name: string;
  created_time: string;
}

export function* GetReportedIssues(params: ReportIssueAction.GetReportedIssues) {
  try {
    const dataResponse = yield yantraRequest(
      `${config.yantraBaseUrl}/yantra/raisedissuedetails?frameid=${params.payload.frameId}`,
      "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body.map((item: yantraReportedIssueResponse) => {
        return {
          frameId: item.frame_id,
          issueId: item.issue_id,
          status: item.status,
          categoryName: item.cat_name,
          createdTime: item.created_time
        }
      })
      yield put({
        type: "Store_ReportedIssue",
        payload: data
      } as Store_ReportedIssue);
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

export function* CancelReportedIssue(params: ReportIssueAction.CancelReportedIssue) {
  try {
    const dataResponse = yield yantraRequest(
      `${config.yantraBaseUrl}/yantra/cancelissue?issueId=${params.payload.issueId}`,
      "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body
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

export function* GetIssueConversation(params: ReportIssueAction.GetIssueConversation) {
  try {
    const dataResponse = yield yantraRequest(
      `${config.yantraBaseUrl}/yantra/getdiscussiondetails?issueId=${params.payload.issueId}`,
      "GET");
    if (dataResponse.success) {
      const data = dataResponse.response.body
      if (data?.st == "false") {
        yield put({
          type: "Store_ReportedIssueConversation",
          payload: []
        } as Store_ReportedIssueConversation);
      }
      else {
        yield put({
          type: "Store_ReportedIssueConversation",
          payload: data as TReportedIssueConversation[]
        } as Store_ReportedIssueConversation);
      }
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