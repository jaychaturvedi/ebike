import { IAlertTrendActions, AlertTrendsActions } from "../actions/trends"
import { TtrendTop5Alert, TtrendTotalAlerts, TtrendLocationWise } from "../redux/connectm-state"
import axios from "axios"
export type Store_GetAlertTrends = {
    type: AlertTrendsActions,
    payload: {
        trendTop5Alert: TtrendTop5Alert,
        trendLocationWise: TtrendLocationWise,
        trendTotalAlert: TtrendTotalAlerts[]
    }
}

export type TAlertsTrendData = {
    trendTop5Alert: TtrendTop5Alert,
    trendLocationWise: TtrendLocationWise,
    trendTotalAlert: TtrendTotalAlerts[]
}

export async function getAlertTrends(params: IAlertTrendActions) {
    console.log("called trend saga");
    let response = [];
    response = await Promise.all([totalAlerts(params), top5Alerts(params), locationWiseAlerts(params)])
    const data: TAlertsTrendData = {
        trendTotalAlert: response[0],
        trendTop5Alert: response[1],
        trendLocationWise: response[2]
    }
    console.log(params.payload, 'in getAlert')

    return data
}

async function totalAlerts(params: IAlertTrendActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/totalAlerts',
        {
            alertType: "smart",
            startDate: params.payload.startDate,
            endDate: params.payload.startDate
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TtrendTotalAlerts[]
}

async function top5Alerts(params: IAlertTrendActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/topFive',
        {
            alertType: "smart",
            startDate: params.payload.startDate,
            endDate: params.payload.startDate
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TtrendTop5Alert
}

async function locationWiseAlerts(params: IAlertTrendActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/locationWise',
        {
            alertType: "smart",
            startDate: params.payload.startDate,
            endDate: params.payload.startDate
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TtrendLocationWise
}