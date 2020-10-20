import axios from "axios"
import { call, put } from "redux-saga/effects"
import { IQuickSightAction } from "../actions/quickSight"
import { getToken } from "../authentication"

export type Store_QuickSightUrl = {
  type: "STORE_QUICKSIGHTURL",
  payload: {
    quickSightUrl: string
  }
}

export type TAlertsTrendData = {
  searchOptions: string
}

export function* getQuickSightUrl(params: IQuickSightAction) {
  try {
    const data: string = yield call(getQuickSightEmbedUrl, params)
    yield put({
      type: "STORE_QUICKSIGHTURL",
      payload: {
        quickSightUrl: data
      }
    } as Store_QuickSightUrl)
  } catch (error) {
    console.log("get search options error", error)
  }
}

export async function getQuickSightEmbedUrl(params: IQuickSightAction) {
  const tokenRes = await getToken();
  const response = await axios.post('https://q6sm9vkbn2.execute-api.us-east-2.amazonaws.com/dev/webapp/quicksight',
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
  return response.data.body.EmbedUrl as string
}
