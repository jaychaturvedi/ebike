import { get, post, put } from 'request-promise'
import * as dotenv from "dotenv"
import {
    TValidatePhone, TRequestBody, TBikeDetails, TBikeLiveDate,
    TCurrentLocation, TCurrentRide, TEndRide, TLocationHistory, TRideHistory,
    TRideHistoryStats, TRideStats
} from "./types";

dotenv.config()
function createOptions(url: string, body: TRequestBody,) {
    const uri = process.env.MOTOVOLTAPI + url
    const options = {
        uri,
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        json: true
    };
    return options
}

export default class ConnectmApi {
    static async validatePhone(phone_number: string) {
        const options = createOptions('/validateph', { phone_number })
        const fetchedData: TValidatePhone = await post(options)
        return fetchedData
    }

    static async getRideStats(frameId: string) {
        const options = createOptions('/getstat', {
            frameid: frameId
        })
        const fetchedData: TRideStats = await post(options)
        return fetchedData
    }

    static async getBikeLiveData(frameId: string) {
        const options = createOptions('/getlivedata', {
            frameid: frameId
        })
        const fetchedData: TBikeLiveDate = await post(options)
        return fetchedData
    }

    static async getCurrentLocation(frameId: string) {
        const options = createOptions('/getliveloc', {
            frameid: frameId,
        })
        const fetchedData: TCurrentLocation = await post(options)
        return fetchedData
    }

    static async getCurrentRideDetails(frameId: string) {
        const options = createOptions('/getcurride', {
            frameid: frameId
        })
        const fetchedData: TCurrentRide = await post(options)
        return fetchedData
    }

    static async getEndRideDetails(frameId: string, startTime: string, endTime: string) {
        const options = createOptions('/getendridestat', {
            frameid: frameId,
            startTime,
            endTime
        })
        const fetchedData: TEndRide = await post(options)
        return fetchedData
    }

    static async getLocationHistory(frameId: string, startTime: string, endTime: string) {
        const options = createOptions('/getendridegps', {
            frameid: frameId,
            startTime,
            endTime
        })
        const fetchedData: TLocationHistory = await post(options)
        return fetchedData
    }

    static async getBikeDetails(frameId: string) {
        const options = createOptions('/getmycycle', {
            frameid: frameId
        })
        const fetchedData: TBikeDetails = await post(options)
        return fetchedData
    }

    static async getRideHistory(frameId: string) {
        const options = createOptions('/getridehistory', {
            frameid: frameId
        })
        const fetchedData: TRideHistory = await post(options)
        return fetchedData
    }

    static async getRideHistoryStats(frameId: string) {
        const options = createOptions('/getridehistorystat', {
            frameid: frameId
        })
        const fetchedData: TRideHistoryStats = await post(options)
        return fetchedData
    }

}

