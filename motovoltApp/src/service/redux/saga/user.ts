import {
    put,
} from "redux-saga/effects";
import * as UserActions from "../actions/saga/user";
import { Store_UpdateUser, Store_UpdateBike, Store_UpdateError } from "../actions/store";
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
                    isBikeRegistered: Boolean(data.frameId),
                }
            } as Store_UpdateUser)
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    batteries: Object.assign({}, ...data.batteries.map((battery: any) => { return { [battery.id]: battery } })),
                    serviceDate: data.serviceDate
                }
            } as Store_UpdateBike);
        } else {
            yield put({
                type: 'Store_UpdateError',
                payload: {
                    error: dataresponse.message
                }
            } as Store_UpdateError)
        }
    } catch (error) {
        console.log(error)
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: JSON.stringify(Object.getOwnPropertyNames(error))
            }
        } as Store_UpdateError)
    }
}

export async function getUser() {
    try {
        const dataresponse = await request(`${config.baseUrl}/user/`, "GET");
        console.log(dataresponse);
        if (dataresponse.success) {
            return dataresponse.response.body;
        }
    } catch (error) {
        console.log(error)
    }
}

export function* updateUser(params: UserActions.UpdateUser) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/user/`, "PUT", {
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
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: JSON.stringify(Object.getOwnPropertyNames(error))
            }
        } as Store_UpdateError)
    }
}

// store.getState()