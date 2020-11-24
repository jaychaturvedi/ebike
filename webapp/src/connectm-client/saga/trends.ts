import { IAlertTrendActions, AlertTrendsActions, IAlertUpdateActions } from "../actions/trends"
import { TtrendTop5Alert, TtrendTotalAlerts, TtrendLocationWise } from "../redux/models"
import axios from "axios"
import { call, put } from "redux-saga/effects"
export type Store_GetAlertTrends = {
    type: AlertTrendsActions,
    payload: {
        trendTop5Alert: TtrendTop5Alert,
        trendLocationWise: TtrendLocationWise,
        trendTotalAlert: TtrendTotalAlerts[]
    }
}

export type Store_UpdateALertTrends = {
    type: "STORE_ALERT_UPDATE_TRENDS",
    payload: {
        trendTop5Alert: TtrendTop5Alert,
        trendLocationWise: TtrendLocationWise,
        trendTotalAlert: TtrendTotalAlerts[],
        trendsZoom: number
    }
}

export type TAlertsTrendData = {
    trendTop5Alert: TtrendTop5Alert,
    trendLocationWise: TtrendLocationWise,
    trendTotalAlert: TtrendTotalAlerts[]
}

export function* getAlertTrend(params: IAlertTrendActions) {
  try {
      const data: TAlertsTrendData = yield call(getAlertTrends, params)
      yield put({
          type: "STORE_GET_ALERT_TRENDS",
          payload: {
              trendTotalAlert: data.trendTotalAlert,
              trendTop5Alert: data.trendTop5Alert,
              trendLocationWise: data.trendLocationWise
          }
      } as Store_GetAlertTrends)
      console.log(data, 'in index.ts')

  } catch (error) {
      console.log("get Alerts error", error)
  }
}

export function* updateAlertTrend(params: IAlertUpdateActions) {
    yield put({
        type: "STORE_ALERT_UPDATE_TRENDS",
        payload: {
            trendsZoom: params.payload.trendsZoom,
            trendTotalAlert: params.payload.trendTotalAlert,
            trendTop5Alert: params.payload.trendTop5Alert,
            trendLocationWise: params.payload.trendLocationWise
        }
    } as Store_UpdateALertTrends)
}

async function getAlertTrends(params: IAlertTrendActions) {
    let response = [];
    response = await Promise.all([totalAlerts(params), top5Alerts(params), locationWiseAlerts(params)])
    const data: TAlertsTrendData = {
        trendTotalAlert: response[0],
        trendTop5Alert: Object.assign({lines: {}, data: []}, response[1]),
        trendLocationWise:Object.assign({lines: {}, data: []}, response[2])
    }
    // console.log(params.payload, 'in getAlert')

    return data
}

async function totalAlerts(params: IAlertTrendActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/totalAlerts',
        {
            alertType: params.payload.alertType,
            startDate: params.payload.startDate,
            endDate: params.payload.endDate
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TtrendTotalAlerts[]
}

async function top5Alerts(params: IAlertTrendActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/topFive',
        {
            alertType: params.payload.alertType,
            startDate: params.payload.startDate,
            endDate: params.payload.endDate
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TtrendTop5Alert
}

async function locationWiseAlerts(params: IAlertTrendActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/locationWise',
        {
            alertType: params.payload.alertType,
            startDate: params.payload.startDate,
            endDate: params.payload.endDate
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TtrendLocationWise
}