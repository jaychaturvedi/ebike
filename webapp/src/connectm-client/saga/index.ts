import { all, call, takeLatest, put } from "redux-saga/effects"
import { getUser } from "./user"
import { IUsersAction } from "../actions/user"
import { IAlertActions } from "../actions/alerts";
import { getAlerts, updateAlertTabChange, updateAlertFilterChange, Store_AlertUpdate, TAlertsTableData } from "./alert";
import { Store_AlertTabChange } from "./alert";
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
function* actionWatcher() {
    yield takeLatest("GET_USER", getUsers);
    yield takeLatest("GET_ALERTS", getAlertData);
    yield takeLatest("UPDATE_ACTIVE_ALERT", updateAlertTabChanges);
    yield takeLatest("UPDATE_FILTER", updateAlertFilterChanges)
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}