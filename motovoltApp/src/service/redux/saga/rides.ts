import {
    put,
} from "redux-saga/effects";
import * as RideActions from "../actions/saga/rides";
import { Store_UpdateRide, Store_SetRideHistory, Store_UpdateBike, Store_SetSpeedometer, Store_SetGraphdata } from "../actions/store";
import { config, request } from "./utils";
import Moment from "moment";

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
        const dataResponse = yield request(
            `${config.baseUrl}/bike/history/${params.payload.bikeId}` +
            `?pageSize=${encodeURIComponent(params.payload.pageSize)}&` +
            `pageNo=${encodeURIComponent(params.payload.pageNumber)}&startTime=${params.payload.startTime}&endTime=${params.payload.endTime}`,
            "GET", undefined)
        console.log("Data Response");
        console.log(dataResponse);
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_SetRideHistory',
                payload: data.history.map((ride: any, i: number) => ({
                    // Should not be optional
                    id: i.toString(),
                    totalDistanceKm: ride.dist,
                    speedKmph: ride.kmph,
                    avgSpeedKmph: ride.kmph,
                    maxSpeedKmph: ride.kmph,
                    from: ride.startloc,
                    to: ride.endloc,
                    score: ride.rating,
                    path: ride.gpsPath.map((item: any) => ({
                        lat: item.lat ?? '',
                        long: item.lng ?? '',
                        time: item.utc ?? ''
                    })),
                    startTime: `${ride.date} ${ride.fromtime}`,
                    endTime: `${ride.date} ${ride.totime}`,
                }))
            } as Store_SetRideHistory)
            yield put({
                type: 'Store_UpdateBike',
                payload: {
                    co2SavingKg: data.graphData.length ? data.graphData[0].co2sav : 0,
                    greenMilesKm: data.graphData.length ? data.graphData[0].grnmls : 0
                }
            } as Store_UpdateBike)
            yield put({
                type: 'Store_SetGraphdata',
                payload: {
                    data: data.graphData.map((gData: any) => ({
                        value: gData.speed,
                        date: new Date().toString()
                    })),
                    avgKmph: data.graphData.length ? data.graphData[0].avgkmph : 0,
                    avgSpeed: data.graphData.length ? data.graphData[0].avgspd : 0,
                    distance: data.graphData.length ? data.graphData[0].dist : 0
                }
            } as Store_SetGraphdata);
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
            `startTime=${params.payload.startTime}&endTime=${params.payload.endTime}`, "GET");
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


export function* getSpeedometerData(params: RideActions.Speedometer) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/speedometer/${params.payload.rideId}`, "GET");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_SetSpeedometer',
                payload: {
                    rideId: params.payload.rideId,
                    averageSpeed: data.averageSpeed,
                    batteryChargePer: data.batteryChargePer,
                    distance: data.distance,
                    maxSpeed: data.maxSpeed,
                    pedalAssit: data.pedalAssit,
                    powerMod: data.powerMode,
                    rangeAvailable: data.rangeAvailable,
                    rangeCovered: data.rangeCovered,
                    speed: data.speed
                }
            } as Store_SetSpeedometer)
        }
    } catch (error) {
        console.log(error)
    }
}
