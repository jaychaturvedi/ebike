import {
    put,
} from "redux-saga/effects";
import * as RideActions from "../actions/saga/rides";
import { Store_UpdateRide, Store_SetRideHistory, Store_UpdateBike } from "../actions/store";
import { config, request } from "./utils";

export function* startRide(params: RideActions.StartRide) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/${params.payload.bikeId}?rideId=${params.payload.rideId}`,
            "GET", undefined);
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
        const dataResponse = yield request(`${config.baseUrl}/ride/${params.payload.rideId}`, "PUT",
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
                    path: data.gpsPath.map((item: any) => ({
                        lat: item.lat ?? '',
                        long: item.lng ?? '',
                        time: item.utc ?? ''
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
        const dataResponse = yield request(`${config.baseUrl}/ride/rating/${params.payload.rideId}`, "PUT", {
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
        console.log("Hellloo here ");
        const dataResponse = yield request(
            `${config.baseUrl}/bike/history/${params.payload.bikeId}` +
            `?pageSize=${encodeURIComponent(params.payload.pageSize)}&` +
            `pageNo=${encodeURIComponent(params.payload.pageNumber)}&startTime=2020-07-07 10:49:38&endTime=2020-07-08 16:50:38`,
            "GET", undefined)
        //      {
        //     "frameId": params.payload.bikeId,
        //     // "frameId": "069bcc081a68a0832h123",
        //     "pageSize": params.payload.pageSize,
        //     "pageNo": params.payload.pageNumber,
        //     // "pageSize": 1,
        //     // "pageNo": 10,
        //     // "startTime": params.payload.startTime,2020-07-07 10:49:38
        //     // "endTime": params.payload.endTime
        //     "startTime": "2020-07-07 10:49:38",
        //     "endTime": "2020-07-08 16:50:38"
        // 
        console.log("Data Response");
        console.log(dataResponse);
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_SetRideHistory',
                payload: data.history.map((ride: any) => ({
                    // Should not be optional
                    id: Math.random().toString(),
                    totalDistanceKm: ride.dist,
                    speedKmph: ride.kmph,
                    avgSpeedKmph: ride.kmph,
                    maxSpeedKmph: ride.kmph,
                    from: ride.startloc,
                    to: ride.endloc,
                    score: ride.rating,
                    startTime: `${ride.date} ${ride.fromtime}`,
                    endTime: `${ride.date} ${ride.totime}`,
                }))
            } as Store_SetRideHistory)
            yield put({
                type: 'Store_UpdateBike',
                payload: {
                    co2SavingKg: data.graphData.length ? data.graphData.length[0].co2sav : 0,
                    greenMilesKm: data.graphData.length ? data.graphData.length[0].grnmls : 0
                }
            } as Store_UpdateBike)
        }
        throw Error(dataResponse.message);
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
        const dataResponse = yield request(`${config.baseUrl}/ride/detail/${params.payload.bikeId}?` +
            `startTime=2020-06-30 11:08:38&endTime=2020-06-30 12:45:30`, "GET");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_UpdateRide',
                payload: {
                    id: params.payload.rideId,
                    totalDistanceKm: data.distance,
                    avgSpeedKmph: data.averageSpeed,
                    maxSpeedKmph: data.maxSpeed,
                    greenMilesKm: data.caloriesBurnt,
                    caloriesBurnt: data.caloriesBurnt,
                    petrolSavingsInr: data.petrolSaved,
                    petrolSavingsLtr: data.litreSaved,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    path: data.gpsPath.map((item: any) => ({
                        lat: item.lat ?? '',
                        long: item.lng ?? '',
                        time: item.utc ?? ''
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

