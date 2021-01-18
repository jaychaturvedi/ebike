import { eventChannel } from "redux-saga";
import {
    call,
    put,
} from "redux-saga/effects";
import * as NotificationActions from "../actions/saga/notification-actions";
import { Store_ClearNotification, Store_UpdateError, Store_UpdateNotification } from "../actions/store";
import { config, request, yantraRequest } from "./utils";
import { UnknownError } from "../../server-error";
import Moment from "moment";

export function* getNotification(params: NotificationActions.ReadNotifications) {
    try {
        const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/getAllNotification`, "GET");
        if (dataResponse.success) {
            const response = dataResponse.response.body;
            yield put({
                type: 'Store_UpdateNotification',
                payload: {
                    data: Object.assign({}, ...response.map((notification: any, index: number) => {
                        return {
                            [index]: {
                                isStale: false,
                                date: Moment(notification.created_time).format("MM-DD-YYYY"),
                                time: Moment(notification.created_time).format("hh:mm A"),
                                title: notification.title,
                                message: notification.message,
                                type: notification.type,
                                titleImgUrl: notification.title_img_url,
                                bodyImgUrl: notification.body_img_url,
                                mediaUrl: notification.media_url
                            }
                        }
                    }))
                }
            } as Store_UpdateNotification)
        } else {
            yield put({
                type: 'Store_UpdateError',
                payload: {
                    error: UnknownError
                }
            } as Store_UpdateError)
        }
    } catch (error) {
        console.log(error)
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: UnknownError
            }
        } as Store_UpdateError)
    }
}

export function* clearNotification(params: NotificationActions.ClearNotifications) {
    try {
        const dataResponse = yield yantraRequest(`${config.yantraBaseUrl}/yantra/clearAllNotification`, "POST");
        if (dataResponse.success) {
            yield put({
                type: 'Store_ClearNotification',
                payload: {}
            } as Store_ClearNotification)
        } else {
            yield put({
                type: 'Store_UpdateError',
                payload: {
                    error: UnknownError
                }
            } as Store_UpdateError)
        }
    } catch (error) {
        console.log(error)
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: UnknownError
            }
        } as Store_UpdateError)
    }
}
