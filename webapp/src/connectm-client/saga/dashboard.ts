import axios from "axios"
import { call, put } from "redux-saga/effects"
import { IDashboardAction } from "../actions/dashboard"
import { getToken } from "../authentication"
import { TDashboardList } from "../redux/models"

export type Store_DashboardList = {
  type: "STORE_DASHBOARDLIST",
  payload: {
    dashboardList: TDashboardList[]
  }
}
export type Clear_DashboardList = {
  type: "CLEAR_DASHBOARDLIST"
}

export type TAlertsTrendData = {
  searchOptions: string
}

export function* getDashboardList(params: IDashboardAction) {
  try {
    const data: TDashboardList[] = yield call(getDashboard, params)
    yield put({
      type: "STORE_DASHBOARDLIST",
      payload: {
        dashboardList: data
      }
    } as Store_DashboardList)
  } catch (error) {
    console.log("get dashboardlist error", error)
  }
}

export function* clearDashboardList() {
  try {
    yield put({
      type: "CLEAR_DASHBOARDLIST"
    } as Clear_DashboardList)
  } catch (error) {
    console.log("clear dashboardlist error", error)
  }
}


export async function getDashboard(params: IDashboardAction) {
  const response = await axios.get(process.env.REACT_APP_WEBAPIURL + '/getDashboard')
  return response.data.body as TDashboardList[]
}
