import {
    put,
} from "redux-saga/effects";
import * as UserActions from "../actions/saga/user";
import { Store_UpdateUser } from "../actions/store";
import { store } from "../../index";
import { config, request } from './utils';

export function* readUser(params: UserActions.ReadUser) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/user/`, "GET");
        if (dataresponse.success) {
            const data = dataresponse.response.body;
            yield put({
                type: "Store_UpdateUser",
                payload: {
                    id: data.uid,
                    email: data.email,
                    name: data.fullName,
                    phone: data.phone,
                    defaultBikeId: data.frameId,
                }
            } as Store_UpdateUser)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* updateUser(params: UserActions.UpdateUser) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/user/`, "GET", {
            "fullName": params.payload.name,
            "email": params.payload.email
        });
        if (dataresponse.success) {
            const data = dataresponse.response.body;
            yield put({
                type: "Store_UpdateUser",
                payload: {
                    id: data.uid,
                    email: data.email,
                    name: data.fullName,
                    phone: data.phone,
                    defaultBikeId: data.frameId,
                }
            } as Store_UpdateUser)
        }
    } catch (error) {
        console.log(error)
    }
}

store.getState()