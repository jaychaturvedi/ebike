import { IUsersAction } from "../actions/user";
import { put } from "redux-saga/effects";

export function* getUser(params: IUsersAction) {
    console.log("called saga");
    const response =  yield fetch('https://reqres.in/api/users/2')
        .then(res => res.json())

    // yield put({ type: "RECEIVED_USER", payload: { name: response.data.first_name, email: response.data.email } });
}