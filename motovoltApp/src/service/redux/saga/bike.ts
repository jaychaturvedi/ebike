import {
    call,
    put,
} from "redux-saga/effects";
import * as BikeActions from "../actions/saga/bike-actions";
import { Store_UpdateBike, Store_UpdateNotification, Store_UpdateRide } from "../actions/store";
import { config, request } from "./utils";

export function* updateBike(params: BikeActions.UpdateBike) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/bike/`, "PUT", {
            "bikeName": params.payload.name,
            "frameId": params.payload.id
        });
        if (dataresponse.success) {
            const data = dataresponse.response.body;
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    id: data.frameId,
                    name: data.bikeName
                }
            } as Store_UpdateBike);
        }
    } catch (error) {
        console.log(error)
    }
}

export function* validateFrame(params: BikeActions.ValidateFrame) {
    try {
        const dataresponse = yield request(`${config.baseUrl}/bike/verify/${params.payload.frameNumber}`, "GET");
        if (dataresponse.success) {
            const data = dataresponse.response.body;
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    id: data.frameId,
                    name: data.bikeName,
                    modal: data.model,
                    type: data.type === "Internet" ? "CELLULAR" : "BLE",
                    serviceDate: data.serviceDate,
                    batteryChargePer: data.batteryChargePer,
                    batteries: data.batteries
                }
            } as Store_UpdateBike);
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getBikeStat(params: BikeActions.ReadBikeStat) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/bike/${params.payload.bikeId}`, "GET");
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    id: params.payload.bikeId,
                    type: data.type === "Internet" ? "CELLULAR" : "BLE",
                    batteryPer: data.batteryCharge,
                    co2SavingKg: data.co2sav,
                    totalDistanceKm: data.totalDistance,
                    avgRideScore: data.ratings,
                    petrolSavingsLtr: data.petrolSaved,
                    greenMilesKm: data.greenMiles,
                    costRecoveredPer: data.costRecovered,
                    batteryChargePer: data.batteryCharge,
                    rangeCoveredKm: data.rangeCovered,
                    rangeAvailableKm: data.rangeAvailable,
                    isOn: Boolean(data.ignition),
                }
            } as Store_UpdateBike);
            yield put({
                type: "Store_UpdateNotification",
                payload: {
                    isPresent: Boolean(data.notification),
                }
            } as Store_UpdateNotification)
        }
        const myBikeResopnse = yield request(`${config.baseUrl}/bike/myBike/${params.payload.bikeId}`, "GET");
        if (myBikeResopnse.success) {
            const data = myBikeResopnse.response.body;
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    id: params.payload.bikeId,
                    name: data.bikeName,
                    motorPer: data.motorPer,
                    batteryChargePer: data.batteryChargePer,
                    healthPer: data.batteryHealthPer,
                    batteries: Object.assign({}, ...data.batteries.map((battery: any) => { return { [battery.id]: battery } })),
                    serviceDate: data.serviceDate,
                }
            } as Store_UpdateBike);
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getLocation(params: BikeActions.ReadBikeLocation) {
    try {
        // const dataResponse = yield request(`${config.baseUrl}/bike/livelocation/${params.payload.bikeId}`, "GET",);
        const dataResponse = yield request(`${config.baseUrl}/bike/livelocation/${'069bcc081a68a0832f123'}`, "GET",);
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: "Store_UpdateBike",
                payload: {
                    // lat: data.latitude,
                    // long: data.longitude,
                    lat: 37.78825,
                    long: -122.4324,
                    lastLocationKnownTime: data.lastused,
                    address: data.address,
                }
            } as Store_UpdateBike);
            // Update redux with ride details
        }
    } catch (error) {
        console.log(error)
    }
}

