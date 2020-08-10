import { all, call, takeLatest, put } from "redux-saga/effects"
import { getUser } from "./user"
import { IUsersAction } from "../actions/user"
import { IAlertActions } from "../actions/alerts";
import { getAlerts, updateAlertTabChange, updateAlertFilterChange, Store_AlertUpdate, TAlertsTableData } from "./alert";
import { Store_AlertTabChange } from "./alert";
import { Store_GetAlertTrends, TAlertsTrendData, getAlertTrends } from "./trends"
import { IAlertTrendActions } from "../actions/trends";
import { TPastAlert, TAlertInsights } from "../redux/connectm-state"
import {Store_AlertInsights,getAlertInsight, postAlertClearanceComment} from "./alert-detail"
import { IAlertDetailActions } from "../actions/alert-detail";

function* getUsers(params: IUsersAction) {
    yield call(getUser, params)
}

function* getAlertData(params: IAlertActions) {
    try {
        const data: TAlertsTableData = yield call(getAlerts, params)
        yield put({
            type: "STORE_ALERT_UPDATE",
            payload: {
                alertType: params.payload.alertType,
                alerts: data,
                pagination: params.payload.pagination,
                sort: params.payload.sort
            }
        } as Store_AlertUpdate)
    } catch (error) {
        console.log("get Alerts error", error)
    }
}

function* updateAlertTabChanges(params: IAlertActions) {
    yield call(updateAlertTabChange, params)
}

function* updateAlertFilterChanges(params: IAlertActions) {
    yield call(updateAlertFilterChange, params)
}

function* getAlertTrend(params: IAlertTrendActions) {
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

function* getAlertInsights(params: IAlertDetailActions){
    try {
        const data: TAlertInsights = yield call(getAlertInsight, params)
        yield put({
            type: "STORE_ALERTS_INSIGHTS",
            payload: {
                alertInsight : data
            }
        } as Store_AlertInsights)
    } catch (error) {
        console.log("get Alerts error", error)
    }
}

function* postAlertClearance(param: IAlertDetailActions){
    yield call(postAlertClearanceComment,param)
}

function* actionWatcher() {
    yield takeLatest("GET_USER", getUsers);
    yield takeLatest("GET_ALERTS", getAlertData);
    yield takeLatest("UPDATE_ACTIVE_ALERT", updateAlertTabChanges);
    yield takeLatest("UPDATE_FILTER", updateAlertFilterChanges);
    yield takeLatest("GET_ALERT_TRENDS", getAlertTrend);
    yield takeLatest("GET_ALERTS_INSIGHTS",getAlertInsights)
    yield takeLatest("POST_ALERT_CLEARANCE",postAlertClearance)
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}