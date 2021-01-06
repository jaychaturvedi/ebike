import axios from "axios"
import { call, put } from "redux-saga/effects"
import { IQuickSightAction,IClearQuickSightAction } from "../actions/quickSight"
import { getToken } from "../authentication"

export type Store_QuickSightUrl = {
  type: "STORE_QUICKSIGHTURL",
  payload: {
    quickSightUrl: string
  }
}

export type Clear_QuickSightUrl = {
  type: "CLEAR_QUICKSIGHT_URL",
}

export type TAlertsTrendData = {
  searchOptions: string
}

export function* getQuickSightUrl(params: IQuickSightAction) {
  try {
    const data = yield call(getQuickSightEmbedUrl, params)
    yield put({
      type: "STORE_QUICKSIGHTURL",
      payload: {
        quickSightUrl: data
      }
    } as Store_QuickSightUrl)
  } catch (error) {
    console.log("get quicksight url error", error)
  }
}

export async function getQuickSightEmbedUrl(params: IQuickSightAction) {
  const tokenRes = await getToken();
  const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/quicksight',
    {
      dashboardId: params.payload.dashboardId
    }, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": tokenRes.token!
      }
  }
  )
  console.log("called quicksight saga", response);
  return response.data?.body.EmbedUrl as string
}

export function* clearQuickSightUrl(params: IClearQuickSightAction) {
  try {
    yield put({
      type: "CLEAR_QUICKSIGHT_URL"
    } as Clear_QuickSightUrl)
  } catch (error) {
    console.log("clear quicksight state error", error)
  }
}