import { eventChannel } from "redux-saga";
import {
    call,
    put,
} from "redux-saga/effects";
import * as NotificationActions from "../actions/saga/notification-actions";
import { Store_UpdateError, Store_UpdateNotification } from "../actions/store";
import { config, request } from "./utils";


export function* getNotification(params: NotificationActions.ReadNotifications) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/bike/notification/${params.payload.bikeId}` +
            `pageNo=${params.payload.pageNumber}&pageSize=${params.payload.pageSize}`, "GET");
        if (dataResponse.success) {
            const response = dataResponse.response.body;
            yield put({
                type: 'Store_UpdateNotification',
                payload: {
                    data: Object.assign({}, ...response.map((notification: any, index: number) => {
                        return {
                            [`${Math.random() + index}`]: {
                                isStale: true,
                                // time: `${new Date().getHours().toString()}`,
                                time: notification.time,
                                title: notification.title,
                                body: notification.description,
                                type: notification.type
                            }
                        }
                    }))
                }
            } as Store_UpdateNotification)
        } else {
            yield put({
                type: 'Store_UpdateError',
                payload: {
                    error: dataResponse.message
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
