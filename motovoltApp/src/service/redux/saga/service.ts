import {
    put,
} from "redux-saga/effects";
import * as ServiceActions from "../actions/saga/service-actions";
import { Store_UpdateUser, Store_UpdateBike, Store_SetServices, Store_UpdateError, Store_SetNearByServices } from "../actions/store";
import { store } from "../../index";
import { config, request, yantraRequest } from './utils';
import Moment from "moment";
import { UnknownError } from "../../server-error";

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
                            openDate: Moment(open.openTime).format("DD-MM-YYYY hh:mm A"),
                        }
                    }), ...data.closed.rows.map((open: any) => {
                        return {
                            id: open.serviceId,
                            title: open.comments,
                            isOpen: false,
                            openDate: Moment(open.openTime).format("DD-MM-YYYY hh:mm A"),
                        }
                    })]
                }
            } as Store_SetServices)
        } else {
            yield put({
                type: 'Store_UpdateError',
                payload: {
                    error: UnknownError
                }
            } as Store_UpdateError)
        }
    } catch (error) {
        console.log(error);
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: UnknownError
            }
        } as Store_UpdateError)
    }
}

export async function getNearByServices(params: ServiceActions.ReadNearByService) {
    try {
        const dataresponse = await yantraRequest(`${config.yantraBaseUrl}/yantra/getserprvbygeoloc`,
            "POST", {
            "lat": params.payload.latitude,
            "lon": params.payload.longitude,
            "dist": params.payload.distance
        });
        console.log(dataresponse)
        if (dataresponse.success) {
            const data = dataresponse.response!.body;
            store.dispatch({
                type: 'Store_SetNearByServices',
                payload: data.map((record: any) => {
                    return {
                        locMasterId: record.locMasterId,
                        locName: record.locName,
                        serviceProviderId: record.serviceProviderId,
                        stationName: record.stationName,
                        serviceProviderType: record.serviceProviderType,
                        addressLine1: record.addressLine1,
                        addressLine2: record.addressLine2,
                        addressLine3: record.addressLine3,
                        pincode: record.pincode,
                        phoneNo: record.phoneNo,
                        lat: record.lat,
                        lon: record.lon
                    }
                })
            } as Store_SetNearByServices)
        } else {
            store.dispatch({
                type: 'Store_UpdateError',
                payload: {
                    error: UnknownError
                }
            } as Store_UpdateError)
        }
    } catch (error) {
        console.log(error);
        store.dispatch({
            type: 'Store_UpdateError',
            payload: {
                error: UnknownError
            }
        } as Store_UpdateError)
    }
}