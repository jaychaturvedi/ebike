import { all, call, takeLatest } from "redux-saga/effects"
import { getUser } from "./user"
import { IUsersAction } from "../actions/user"
import { IAlertActions } from "../actions/alerts";
import { getAlerts, updateAlertTabChange } from "./alert";
import {Store_AlertTabChange} from "./alert";
function* getUsers(params: IUsersAction) {
    yield call(getUser, params)
}

function* getAlertData(params: IAlertActions) {
    yield call(getAlerts, params)
}

function* updateAlertTabChanges(params : IAlertActions){
    yield call(updateAlertTabChange, params)
}

function* actionWatcher() {
    yield takeLatest("GET_USER", getUsers);
    yield takeLatest("GET_ALERTS", getAlertData);
    yield takeLatest("UPDATE_ACTIVE_ALERT",updateAlertTabChanges);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}