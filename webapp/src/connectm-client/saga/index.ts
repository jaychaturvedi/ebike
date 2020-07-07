import { all, call, takeLatest } from "redux-saga/effects"
import { getUser } from "./user"
import { IUsersAction } from "../actions/user"

function* getUsers(params: IUsersAction) {
    yield call(getUser, params)
}

function* actionWatcher() {
    yield takeLatest("GET_USER", getUsers);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}