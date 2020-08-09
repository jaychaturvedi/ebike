import {
    put,
} from "redux-saga/effects";
import * as RideActions from "../actions/saga/rides";
import { Store_UpdateRide, Store_SetRideHistory, Store_UpdateBike } from "../actions/store";
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


export function* getRideHistory(params: RideActions.ReadRideHistory) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/history/`, "POST", {
            "frameId": params.payload.bikeId,
            "pageSize": params.payload.pageSize,
            "pageNo": params.payload.pageNumber,
            "startTime": params.payload.startTime,
            "endTime": params.payload.endTime
        });
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_SetRideHistory',
                payload: data.map((ride: any) => ({
                    // Should not be optional
                    id: Math.random().toString(),
                    totalDistanceKm: data.dist,
                    speedKmph: data.kmph,
                    avgSpeedKmph: data.kmph,
                    maxSpeedKmph: data.kmph,
                    score: data.rating,
                    startTime: `${data.date} ${data.fromtime}`,
                    endTime: `${data.date} ${data.totime}`,
                }))
            } as Store_SetRideHistory)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getCurrentRide(params: RideActions.ReadCurrentRideData) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/${params.payload.rideId}`, "GET");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_UpdateBike',
                payload: {
                    batteryChargePer: data.batteryChargePer,
                    rangeCoveredKm: data.rangeCovered,
                    rangeAvailableKm: data.rangeAvailable,
                }
            } as Store_UpdateBike);
            yield put({
                type: 'Store_UpdateRide',
                payload: {
                    id: params.payload.rideId,
                    totalDistanceKm: data.distance,
                    avgSpeedKmph: data.averageSpeed,
                    speedKmph: data.speed,
                    maxSpeedKmph: data.maxSpeed,
                }
            } as Store_UpdateRide)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getRide(params: RideActions.ReadRideData) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/${params.payload.rideId}`, "GET");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_UpdateRide',
                payload: {
                    id: params.payload.rideId,
                    totalDistanceKm: data.distance,
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
                    })),
                    durationSec: data.duration,
                    score: data.rating,
                }
            } as Store_UpdateRide)
        }
    } catch (error) {
        console.log(error)
    }
}

