import {
    call,
    put,
} from "redux-saga/effects";
import * as BikeActions from "../actions/saga/bike-actions";
import { Store_UpdateBike, Store_Notification } from "../actions/store";
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

export async function validateFrame(params: BikeActions.ValidateFrame) {

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
                    type: data.type === "Internet" ? "GPS" : "BLE",
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
            // read notification if available
            yield put({
                type: "Store_Notification",
                payload: {
                    isPresent: Boolean(data.notification),
                }
            } as Store_Notification)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* startRide(params: BikeActions.StartRide) {
    try {
        // {
        //     "rideId":"123",
        //     "frameId": "069bcc081a68a0832f126"
        // }
        // {
        //     "status": "OK",
        //     "body": {},
        //     "error": null,
        //     "date": "2020-08-09T11:51:27.462Z"
        // }
        const dataResponse = yield request(`${config.baseUrl}/ride/`, "POST",
            {
                "rideId": params.payload.rideId,
                "frameId": params.payload.bikeId
            }
        );
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            // Update redux with ride details
        }
    } catch (error) {
        console.log(error)
    }
}

export function* endRide(params: BikeActions.EndRide) {
    try {
        // {
        //     "rideId":"123"
        // }
        // {
        //     "status": "OK",
        //     "body": {},
        //     "error": null,
        //     "date": "2020-08-09T11:51:27.462Z"
        // }
        // {
        //     "status": "OK",
        //     "body": {
        //         "frameId": "069bcc081a68a0832f123",
        //         "rideId": "123",
        //         "distance": 100,
        //         "duration": 60,
        //         "averageSpeed": 80,
        //         "maxSpeed": 85,
        //         "caloriesBurnt": 2,
        //         "petrolSaved": 50,
        //         "litreSaved": 0,
        //         "startTime": "2020-06-30 11:08:38",
        //         "endTime": "2020-06-30 12:45:30",
        //         "gpsPath": [
        //             {
        //                 "lat": 0.145,
        //                 "lng": 0.7845,
        //                 "utc": "2020-06-30 05:35:52.000"
        //             },
        //             {
        //                 "lat": 0.145,
        //                 "lng": 0.7845,
        //                 "utc": "2020-06-30 06:47:28.000"
        //             },
        //             {
        //                 "lat": 0.145,
        //                 "lng": 0.7845,
        //                 "utc": "2020-06-30 07:14:53.000"
        //             }
        //         ]
        //     },
        //     "error": null,
        //     "date": "2020-08-09T12:05:11.347Z"
        // }
        const dataResponse = yield request(`${config.baseUrl}/ride/`, "PUT",
            {
                "rideId": params.payload.rideId,
            }
        );
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            // Update redux with ride details
        }
    } catch (error) {
        console.log(error)
    }
}


export function* rateRide(params: BikeActions.SubmitRide) {
    try {
        // {
        // 	"rideId":"123",
        // 	"rating": 5,
        // 	"option":["Battery overHeating", "Low mileage"],
        // 	"comment": "this is a comment"
        // }
        // {
        // 	"rideId":"123",
        // 	"rating": 5,
        // 	"option":["Battery overHeating", "Low mileage"],
        // 	"comment": "this is a comment"
        // }
        const dataResponse = yield request(`${config.baseUrl}/ride/rating`, "PUT",
            {
                "rideId": params.payload.rideId,
                "rating": params.payload.rating,
                "option": [params.payload.comment],
                "comment": params.payload.comment
            }
        );
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            // Update redux with ride details
        }
    } catch (error) {
        console.log(error)
    }
}

export function* getLocation(params: BikeActions.ReadBikeLocation) {
    try {
        // {
        // 	"rideId":"123",
        // 	"rating": 5,
        // 	"option":["Battery overHeating", "Low mileage"],
        // 	"comment": "this is a comment"
        // }
        // {
        // 	"rideId":"123",
        // 	"rating": 5,
        // 	"option":["Battery overHeating", "Low mileage"],
        // 	"comment": "this is a comment"
        // }
        const dataResponse = yield request(`${config.baseUrl}/ride/livelocation/?frameId=${params.payload.bikeId}`, "GET",);
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            // Update redux with ride details
        }
    } catch (error) {
        console.log(error)
    }
}