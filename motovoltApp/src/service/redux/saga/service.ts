import {
    put,
} from "redux-saga/effects";
import * as ServiceActions from "../actions/saga/service-actions";
import { Store_UpdateUser, Store_UpdateBike, Store_SetServices, Store_UpdateError } from "../actions/store";
import { store } from "../../index";
import { config, request } from './utils';

export function* reportIssue(params: ServiceActions.ReportIssue) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/service`, "POST", {
            "comments": params.payload.comments,
            "frameId": params.payload.bikeId
        });
        if (dataresponse.success) {
            const data = dataresponse.response.body;
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    reportIssueSuccess: true
                }
            } as Store_UpdateBike)
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


export function* getServices(params: ServiceActions.ReadService) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/service/all`, "GET");
        if (dataresponse.success) {
            const data = dataresponse.response.body;
            yield put({
                type: 'Store_SetServices',
                payload: {
                    open: data.open.count,
                    closed: data.closed.count,
                    services: [...data.open.rows.map((open: any) => {
                        return {
                            id: open.serviceId,
                            title: open.comments,
                            isOpen: true,
                            openDate: open.openTime,
                        }
                    }), ...data.closed.rows.map((open: any) => {
                        return {
                            id: open.serviceId,
                            title: open.comments,
                            isOpen: false,
                            openDate: open.openTime,
                        }
                    })]
                }
            } as Store_SetServices)
        } else {
            yield put({
                type: 'Store_UpdateError',
                payload: {
                    error: dataresponse.message
                }
            } as Store_UpdateError)
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: JSON.stringify(Object.getOwnPropertyNames(error))
            }
        } as Store_UpdateError)
    }
}
