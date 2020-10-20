import {
    put,
} from "redux-saga/effects";
import * as RideActions from "../actions/saga/rides";
import { Store_UpdateRide, Store_SetRideHistory, Store_UpdateBike, Store_SetSpeedometer, Store_SetGraphdata, Store_UpdateError } from "../actions/store";
import { config, request } from "./utils";
import Moment from "moment";

export function* startRide(params: RideActions.StartRide) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/${params.payload.bikeId}?rideId=${params.payload.rideId}&startTime=${params.payload.startDate}`,
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

export function* endRide(params: RideActions.EndRide) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/${params.payload.rideId}?endTime=${params.payload.endDate}`, "PUT");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: "Store_UpdateRide",
                payload: {
                    id: data.rideId,
                    totalDistanceKm: Math.round(data.distance),
                    durationSec: Math.round(data.duration),
                    avgSpeedKmph: Math.round(data.averageSpeed),
                    maxSpeedKmph: Math.round(data.maxSpeed),
                    caloriesBurnt: Math.round(data.caloriesBurnt),
                    petrolSavingsInr: Math.round(data.petrolSaved),
                    petrolSavingsLtr: Math.round(data.litreSaved),
                    startTime: data.startTime,
                    endTime: data.endTime,
                    path: data.gpsPath.map((item: any) => ({
                        lat: item.lat ?? 0,
                        long: item.lng ?? 0,
                        time: item.utc ?? ''
                    }))
                }
            } as Store_UpdateRide);
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
                    score: Math.round(params.payload.rating),
                }
            } as Store_UpdateRide)
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
                    totalDistanceKm: Math.round(ride.dist),
                    speedKmph: Math.round(ride.kmph),
                    avgSpeedKmph: Math.round(ride.kmph),
                    maxSpeedKmph: Math.round(ride.kmph),
                    from: ride.startloc,
                    to: ride.endloc,
                    score: Math.round(ride.rating),
                    pedalAssistMode: ride.pa,
                    ecoMode: ride.ecom,
                    powerMode: ride.pm,
                    startTime: `${ride.date} ${ride.fromtime}`,
                    endTime: `${ride.date} ${ride.totime}`,
                }))
            } as Store_SetRideHistory)
            yield put({
                type: 'Store_SetGraphdata',
                payload: {
                    data: data.graphData.map((gData: any) => ({
                        value: gData.speed,
                        date: gData.date
                    })),
                    avgKmph: data.graphData.length ? Math.round(data.graphData[0].avgkmph) : 0,
                    avgSpeed: data.graphData.length ? Math.round(data.graphData[0].avgspd) : 0,
                    distance: data.graphData.length ? Math.round(data.graphData[0].dist) : 0,
                    co2SavingKg: data.graphData.length ? Math.round(data.graphData[0].co2sav) : 0,
                    greenMilesKm: data.graphData.length ? Math.round(data.graphData[0].grnmls) : 0
                }
            } as Store_SetGraphdata);
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
                error: JSON.stringify(error, Object.getOwnPropertyNames(error))
            }
        } as Store_UpdateError)
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
                    batteryChargePer: Math.round(data.batteryChargePer),
                    rangeCoveredKm: Math.round(data.rangeCovered),
                    rangeAvailableKm: Math.round(data.rangeAvailable),
                }
            } as Store_UpdateBike);
            yield put({
                type: 'Store_UpdateRide',
                payload: {
                    id: params.payload.rideId,
                    totalDistanceKm: Math.round(data.distance),
                    avgSpeedKmph: Math.round(data.averageSpeed),
                    speedKmph: Math.round(data.speed),
                    maxSpeedKmph: Math.round(data.maxSpeed),
                }
            } as Store_UpdateRide)
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
                    totalDistanceKm: Math.round(data.distance),
                    avgSpeedKmph: Math.round(data.averageSpeed),
                    maxSpeedKmph: Math.round(data.maxSpeed),
                    greenMilesKm: Math.round(data.caloriesBurnt),
                    caloriesBurnt: Math.round(data.caloriesBurnt),
                    petrolSavingsInr: Math.round(data.petrolSaved),
                    petrolSavingsLtr: Math.round(data.litreSaved),
                    startTime: data.startTime,
                    endTime: data.endTime,
                    path: data.gpsPath.map((item: any) => ({
                        lat: Number(item.lat) ?? 0,
                        long: Number(item.lng) ?? 0,
                        time: item.utc ?? ''
                    })),
                    durationSec: data.duration,
                    score: Math.round(data.rating),
                }
            } as Store_UpdateRide)
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


export function* getSpeedometerData(params: RideActions.Speedometer) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/ride/speedometer/${params.payload.rideId}`, "GET");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_SetSpeedometer',
                payload: {
                    rideId: params.payload.rideId,
                    averageSpeed: Math.round(data.averageSpeed),
                    batteryChargePer: Math.round(data.batteryChargePer),
                    distance: Math.round(data.distance),
                    maxSpeed: Math.round(data.maxSpeed),
                    pedalAssit: data.pedalAssit,
                    powerMod: data.powerMode,
                    rangeAvailable: Math.round(data.rangeAvailable),
                    rangeCovered: Math.round(data.rangeCovered),
                    speed: Math.round(data.speed)
                }
            } as Store_SetSpeedometer)
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
