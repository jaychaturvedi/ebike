import { all, call, takeLatest, put } from "redux-saga/effects"
import { Store_UserUpdate } from "./user"
import { IUsersAction } from "../actions/user"
import { IAlertActions } from "../actions/alerts";
import { getAlerts, updateAlertTabChange, updateAlertFilterChange, Store_AlertUpdate, TAlertsTableData } from "./alert";
import { Store_GetAlertTrends, TAlertsTrendData, getAlertTrends, updateAlertTrend } from "./trends"
import { IAlertTrendActions } from "../actions/trends";
import { IAlertGraphActions } from "../actions/graph";
import { getAlertGraphData, Store_AlertGraph } from "./graph";
import {
    Store_AlertInsights, getAlertInsight, postAlertClearanceComment, getPastAlertGraphData,
    getPastAlertData, Store_PastAlert, updatePastAlertData, getSingleAlertDetail, Store_UpdateSingleAlert, postClearAlertGraph
} from "./alert-detail"
import { IAlertDetailActions, IPastAlertDetailActions, ISingleAlertDetailAction, IClearGraphActions } from "../actions/alert-detail";
import { TAlertInsights, TPastAlert } from "../redux/models";
import { getQuickSightUrl, clearQuickSightUrl } from "./quickSight";
import * as Dashboard from './dashboard'
import * as Map from './map'

function* getAlertData(params: IAlertActions) {
    try {
        const data: TAlertsTableData = yield call(getAlerts, params)
        console.log("my getAlertData", data, params);

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

function* getAlertInsights(params: IAlertDetailActions) {
    try {
        const data: TAlertInsights = yield call(getAlertInsight, params)
        yield put({
            type: "STORE_ALERTS_INSIGHTS",
            payload: {
                alertInsight: data
            }
        } as Store_AlertInsights)
    } catch (error) {
        console.log("get Alerts error", error)
    }
}

function* postAlertClearance(param: IAlertDetailActions) {
    yield call(postAlertClearanceComment, param)
}

function* clearAlertGraph(params: IClearGraphActions) {
    try {
        const alertTypeId = yield call(postClearAlertGraph, params)
        yield put({
            type: "STORE_ALERT_GRAPH",
            payload: {
                alertTypeId: alertTypeId,
                data: []
            }
        })
    } catch (error) {
        console.log("error", error)
    }
}



function* getPastAlertDatas(param: IAlertDetailActions) {
    try {
        const data: TPastAlert = yield call(getPastAlertData, param)
        yield put({
            type: "STORE_PAST_ALERTS",
            payload: {
                pastAlert: data,
                pagination: param.payload.pagination,
                sort: param.payload.sort
            }
        } as Store_PastAlert)
    } catch (error) {
        console.log("error", error)
    }
}

function* updatePastAlertDatas(params: IPastAlertDetailActions) {
    yield call(updatePastAlertData, params)//
}

function* getAlertGraphDatas(params: IAlertGraphActions) {
    try {
        const data = yield call(getAlertGraphData, params)
        yield put({
            type: "STORE_ALERT_GRAPH",
            payload: {
                alertTypeId: params.payload.alertTypeId,
                data: data
            }
        } as Store_AlertGraph)
    } catch (error) {
        console.log("error", error)
    }
}


function* getPastAlertGraphDatas(params: IAlertGraphActions) {
    try {
        const data = yield call(getPastAlertGraphData, params)
        yield put({
            type: "STORE_ALERT_GRAPH",
            payload: {
                alertTypeId: params.payload.alertTypeId,
                data: data
            }
        } as Store_AlertGraph)
    } catch (error) {
        console.log("error", error)
    }
}

function* getSingleAlertDetails(params: ISingleAlertDetailAction) {
    try {
        const data = yield call(getSingleAlertDetail, params)
        yield put({
            type: "STORE_UPDATE_SINGLE_ALERT",
            payload: {
                alertData: data,
                alertId: params.payload.alertId,
                alertType: params.payload.alertType
            }
        } as Store_UpdateSingleAlert)
    } catch (error) {
        console.log("error", error)
    }
}

function* resetAlertDataStore(params: IAlertDetailActions) {
    yield put({
        type: "STORE_ALERT_UPDATE",
        payload: {
            alertType: params.payload.alertType,
            alerts: {
                bms: { data: [], dataCount: 0 },
                mc: { data: [], dataCount: 0 },
                smart: { data: [], dataCount: 0 }
            },
            pagination: params.payload.pagination,
            sort: params.payload.sort
        }
    } as Store_AlertUpdate)
}

function* updateUser(params: IUsersAction) {
    yield put({
        type: "STORE_USER_UPDATE",
        payload: {
            authenticated: params.payload.authenticated,
            user: params.payload.user
        }
    } as Store_UserUpdate)
}

function* actionWatcher() {
    yield takeLatest("GET_ALERTS", getAlertData);
    yield takeLatest("UPDATE_ACTIVE_ALERT", updateAlertTabChanges);
    yield takeLatest("UPDATE_FILTER", updateAlertFilterChanges);
    yield takeLatest("GET_ALERT_TRENDS", getAlertTrend);
    yield takeLatest("GET_ALERTS_INSIGHTS", getAlertInsights)
    yield takeLatest("POST_ALERT_CLEARANCE", postAlertClearance)
    // yield takeLatest("GET_LOW_MILEAGE", getLowMileageGraph);
    // yield takeLatest("GET_VEHICLE_USAGE", getVehicleUsageGraph);
    yield takeLatest("GET_PAST_ALERTS", getPastAlertDatas)
    yield takeLatest("UPDATE_PAST_ALERTS", updatePastAlertDatas)
    yield takeLatest("UPDATE_ALERT_TRENDS", updateAlertTrend)
    yield takeLatest("GET_ALERT_GRAPH", getAlertGraphDatas)
    yield takeLatest("GET_PAST_ALERT_GRAPH", getPastAlertGraphDatas)
    yield takeLatest("GET_SINGLE_ALERT", getSingleAlertDetails)
    yield takeLatest("RESET_ALERT_MAIN_PAGE", resetAlertDataStore)
    yield takeLatest("CLEAR_ALERT_GRAPH", clearAlertGraph)
    yield takeLatest("UPDATE_USER", updateUser)
    yield takeLatest("GET_QUICKSIGHT_EMBED_URL", getQuickSightUrl)
    yield takeLatest("GET_DASHBOARD_LIST", Dashboard.getDashboardList)
    yield takeLatest("CLEAR_DASHBOARD_LIST", Dashboard.clearDashboardList)
    yield takeLatest("CLEAR_QUICKSIGHT_EMBED_URL", clearQuickSightUrl)
    yield takeLatest("GET_MAP_MARKERS", Map.getMapMarkers)
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}