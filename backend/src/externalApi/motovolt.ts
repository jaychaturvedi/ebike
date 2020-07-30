import { get, post, put } from 'request-promise'
import * as dotenv from "dotenv"
import {
    TValidatePhone, TRequestBody, TMyBike, TBikeLiveDate,
    TLiveLocation, TCurrentRide, TEndRideStat, TEndRideGps, TRideHistory,
    TRideHistoryStats, TBikeStat, TNotification
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

    static async getBikeStat(frameId: string) {
        const options = createOptions('/getstat', {
            frameid: frameId
        })
        const fetchedData: TBikeStat = await post(options)
        return fetchedData
    }

    static async getBikeLiveData(frameId: string) {
        const options = createOptions('/getlivedata', {
            frameid: frameId
        })
        const fetchedData: TBikeLiveDate = await post(options)
        return fetchedData
    }

    static async getLiveLocation(frameId: string) {
        const options = createOptions('/getliveloc', {
            frameid: frameId,
        })
        const fetchedData: TLiveLocation = await post(options)
        return fetchedData
    }

    static async getCurrentRide(frameId: string) {
        const options = createOptions('/getcurride', {
            frameid: frameId
        })
        const fetchedData: TCurrentRide = await post(options)
        return fetchedData
    }

    static async getEndRideStat(frameId: string, startTime: string, endTime: string) {
        const options = createOptions('/getendridestat', {
            frameid: frameId,
            startTime,
            endTime
        })
        const fetchedData: TEndRideStat = await post(options)
        return fetchedData
    }

    static async getEndRideGps(frameId: string, startTime: string, endTime: string) {
        const options = createOptions('/getendridegps', {
            frameid: frameId,
            startTime,
            endTime
        })
        const fetchedData: TEndRideGps[] = await post(options)
        return fetchedData
    }

    static async getMyBike(frameId: string) {
        const options = createOptions('/getmycycle', {
            frameid: frameId
        })
        const fetchedData: TMyBike = await post(options)
        return fetchedData
    }

    static async getRideHistory(frameId: string, startTime: string, endTime: string, pageNo: number, pageSize: number) {
        const options = createOptions('/getridehistory', {
            frameid: frameId,
            pageSize,
            pageNo,
            startTime,
            endTime

        })
        const fetchedData: TRideHistory[] = await post(options)
        return fetchedData
    }

    static async getRideHistoryStat(frameId: string, startTime: string, endTime: string, pageNo: number, pageSize: number) {
        const options = createOptions('/getridehistorystat', {
            frameid: frameId,
            pageSize,
            pageNo,
            startTime,
            endTime
        })
        const fetchedData: TRideHistoryStats[] = await post(options)
        return fetchedData
    }

    static async getNotification(frameId: string, pageNo: number, pageSize: number) {
        const options = createOptions('/getnotific', {
            frameid: frameId,
            pageSize,
            pageNo,
        })
        const fetchedData: TNotification = await post(options)
        return fetchedData
    }

}

