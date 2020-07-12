import { get, post, put } from 'request-promise'
import * as dotenv from "dotenv"
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
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getBikeLiveData(frameId: string) {
        const options = createOptions('/getlivedata', {
            frameid: frameId
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getCurrentLocation(frameId: string) {
        const options = createOptions('/getliveloc', {
            frameid: frameId,
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getCurrentRideDetails(frameId: string) {
        const options = createOptions('/getcurride', {
            frameid: frameId
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getEndRideDetails(frameId: string, startTime: string, endTime: string) {
        const options = createOptions('/getendridestat', {
            frameid: frameId,
            startTime,
            endTime
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getLocationHistory(frameId: string, startTime: string, endTime: string) {
        const options = createOptions('/getridegps', {
            frameid: frameId,
            startTime,
            endTime
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getBikeDetails(frameId: string) {
        const options = createOptions('/getmycycle', {
            frameid: frameId
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getRideHistory(frameId: string) {
        const options = createOptions('/getridehistory', {
            frameid: frameId
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async getRideHistoryStats(frameId: string) {
        const options = createOptions('/getridehistorystat', {
            frameid: frameId
        })
        const fetchedData = await post(options)
        return fetchedData
    }

}

export type TValidatePhone = {
    DEVICE_ID: string;
    STATUS: boolean;
    ERROR_CODE: string;
}

export type TBikeLocation = {
    STATUS: string,
    ERROR_CODE: string,
    LATITUDE: string,
    LONGITUDE: string,
    TIMESTAMP: string
}

export type TBikeDetails = {
    STATUS?: string,
    ERROR_CODE?: string,
    IGNITION_STATUS?: string,
    LOCKED?: string,
    NO_OF_BATTERIES?: string,
    BATTERY_DETAILS?: string
    RANGE_COVERED?: string,
    RANGE_AVAILABLE?: string,
    NEW_SERVICE_DATE?: string,
    DEVICE_ID?: string,
    OVERALL_BAT_HEALTH_PERCENTAGE?: string
    BATTERY_CHARGE_PERCENTAGE?: string,
    MOTOR_PERCENTAGE?: string,
    TOTAL_DISTANCE?: string,
}

export type TRideDetails = {
    STATUS: string,
    ERROR_CODE: string,
    FRAMEID: string,
    DISTANCE: string,
    DURATION: string,
    AVG_SPEED: string,
    MAX_SPEED: string,
    GREEN_MILES: string,
    POWER_SAVINGS: string,
    CALORIES_BURNT: string,
    SPEED_KMPH: string,
    MAP_COORDINATES: string,
    POWERMODE: string
}

export type TRideStatistics = {
    FRAMEID: string,
    CO2_SAVINGS: string,
    STATUS: string,
    ERROR_CODE: string,
    TOTAL_DISTANCE: string,
    PETROL_SAVINGS: string,
    GREEN_MILES: string,
    COST_RECOVERED: string,
    RATINGS: string
}

export type TRequestBody = {
    frameid?: string;
    phone_number?: string;
    startTime?: string;
    endTime?: string;
}