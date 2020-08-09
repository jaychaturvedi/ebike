import { IAlertTrendActions, AlertTrendsActions } from "../actions/trends"
import { TtrendTop5Alert, TtrendTotalAlerts, TtrendLocationWise } from "../redux/connectm-state"

export type Store_GetAlertTrends = {
    type: AlertTrendsActions,
    payload: {
        trendTop5Alert: TtrendTop5Alert,
        trendLocationWise: TtrendTotalAlerts,
        trendTotalAlert: TtrendLocationWise
    }
}

export type TAlertsTrendData = {
    trendTop5Alert: TtrendTop5Alert,
    trendLocationWise: TtrendTotalAlerts,
    trendTotalAlert: TtrendLocationWise
}

export async function getAlertTrends(params: IAlertTrendActions) {
    console.log("called trend saga");
    let response = [];
    response = await Promise.all([])
    const data: TAlertsTrendData = {
        trendTop5Alert: response[0],
        trendLocationWise: response[1],
        trendTotalAlert: response[2]
    }
    return data
}