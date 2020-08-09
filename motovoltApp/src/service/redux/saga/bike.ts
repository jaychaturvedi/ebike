import { eventChannel } from "redux-saga";
import {
    call,
    put,
} from "redux-saga/effects";
import * as BikeActions from "../actions/saga/bike-actions";
import { Store_UpdateOnboarding, Store_UpdateUser, Store_UpdateBike } from "../actions/store";
import { getToken } from '../../authentication'
import * as Constants from '../../constants'
import axios from 'axios'

function* request(url: string, method: string, body?: any, query?: any) {
    try {
        console.log(url)
        console.log(method)
        const tokenResponse = yield call(getToken);
        let response: any;
        if (tokenResponse.success) {
            const res = yield fetch(url, {
                method, headers: {
                    'Authorization': tokenResponse.token,
                    'Content-Type': 'application/json'
                },
            })
            console.log("RESPONSE : ", res);
            if (res.status >= 200 && res.status < 300) {
                response = yield res.json()
                console.log("Response : ", response)
                if (!response.error)
                    return {
                        success: true,
                        response: response.body,
                        message: "Success"
                    }
                throw new Error(response.error)
            }
            throw new Error("Unknown error")
        }
    } catch (error) {
        console.log("Error : ", error)
        return {
            success: false,
            response: null,
            message: error.message ? error.message : "Unknown Error"
        }
    }
}

interface VerifyFrame {
    frameId: string,
    model: string,
    type: string,
    serviceDate: string,
    batteryChargePer: number,
    batteries: { id: string }[]
}

export function* validateFrame(params: BikeActions.ValidateFrame) {
    const response = yield call(request, `${Constants.BASE_URL}/bike/verify/${params.payload.frameNumber}`, 'GET')
    if (response.success) {
        const frameResponse = response.response as VerifyFrame
        yield put({
            type: "Store_UpdateBike",
            payload: {
                id: frameResponse.frameId,
                modal: frameResponse.model,
                batteries: Object.assign({}, ...frameResponse.batteries.map(battery => { return { [battery.id]: battery } })),
                batteryPer: frameResponse.batteryChargePer,
                serviceDate: frameResponse.serviceDate,
                type: frameResponse.type === "Internet" ? "GPS" : "BLE",
            }
        } as Store_UpdateBike)
    }
}