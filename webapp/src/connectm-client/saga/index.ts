import { all, call, takeLatest, put } from "redux-saga/effects"
import { getUser } from "./user"
import { IUsersAction } from "../actions/user"
import { IAlertActions } from "../actions/alerts";
import { getAlerts, updateAlertTabChange, updateAlertFilterChange, Store_AlertUpdate, TAlertsTableData } from "./alert";
import { Store_AlertTabChange } from "./alert";
import { Store_GetAlertTrends, TAlertsTrendData, getAlertTrends, Store_UpdateALertTrends, updateAlertTrend } from "./trends"
import { IAlertTrendActions } from "../actions/trends";
import { IAlertGraphActions } from "../actions/graph";
import { getAlertGraphData, Store_AlertGraph } from "./graph";
import { Store_AlertInsights, getAlertInsight, postAlertClearanceComment, getPastAlertData, Store_PastAlert, updatePastAlertData, getSingleAlertDetail, Store_UpdateSingleAlert } from "./alert-detail"
import { IAlertDetailActions, IPastAlertDetailActions, ISingleAlertDetailAction } from "../actions/alert-detail";
import { TAlertInsights, TPastAlert } from "../redux/models";

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

function* actionWatcher() {
    yield takeLatest("GET_USER", getUsers);
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
    yield takeLatest("GET_SINGLE_ALERT", getSingleAlertDetails)
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}




// function* getLowMileageGraph(params: IAlertGraphActions) {
//     try {
//         const data: TlowMileageGraph = yield call(getLowMileage, params)
//         yield put({
//             type: "STORE_LOW_MILEAGE",
//             payload: {
//                 lowMileage: data
//             }
//         } as Store_GetLowMileage)
//     } catch (error) {
//         console.log("get Alerts error", error)
//     }
// }

// function* getVehicleUsageGraph(params: IAlertGraphActions) {
//     try {
//         const data = yield call(getVehicleUsage, params)
//         yield put({
//             type: "STORE_VEHICLE_USAGE",
//             payload: {
//                 vehicleUsage: {
//                     data: data
//                 }
//             }
//         } as Store_GetVehicleUsage)
//     } catch (error) {
//         console.log("get Alerts error", error)
//     }
// }