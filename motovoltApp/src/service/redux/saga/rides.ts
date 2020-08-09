import {
    put,
} from "redux-saga/effects";
import * as RideActions from "../actions/saga/rides";
import { Store_UpdateRide, Store_SetRideHistory } from "../actions/store";
import { config, request } from "./utils";

export function* startRide(params: RideActions.StartRide) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/`, "POST", {
            "rideId": params.payload.rideId,
            "frameId": params.payload.bikeId
        });
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: "Store_UpdateRide",
                payload: {
                    id: params.payload.rideId,
                    startTime: data.startTime,
                }
            } as Store_UpdateRide)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* endRide(params: RideActions.EndRide) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/`, "PUT",
            {
                "rideId": params.payload.rideId,
            }
        );
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: "Store_UpdateRide",
                payload: {
                    id: data.rideId,
                    totalDistanceKm: data.distance,
                    durationSec: data.duration,
                    avgSpeedKmph: data.averageSpeed,
                    maxSpeedKmph: data.maxSpeed,
                    caloriesBurnt: data.caloriesBurnt,
                    petrolSavingsInr: data.petrolSaved,
                    petrolSavingsLtr: data.litreSaved,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    path: data.map((item: any) => ({
                        lat: item.lat,
                        long: item.lng,
                        time: item.utc
                    }))
                }
            } as Store_UpdateRide);
        }
    } catch (error) {
        console.log(error)
    }
}


export function* rateRide(params: RideActions.SubmitRide) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/rating`, "PUT", {
            "rideId": params.payload.rideId,
            "rating": params.payload.rating,
            "option": params.payload.reason,
            "comment": params.payload.comment
        });
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            // Same response as request
            yield put({
                type: 'Store_UpdateRide',
                payload: {
                    id: params.payload.rideId,
                    comment: params.payload.comment,
                    score: params.payload.rating,
                }
            } as Store_UpdateRide)
        }
    } catch (error) {
        console.log(error)
    }
}
