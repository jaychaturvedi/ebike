import { get, post, put } from 'request-promise'
import * as dotenv from "dotenv"
import { type } from 'os';
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

export type TValidatePhone = {
    fid: string; //frameid
    st: string; //status
    ec: string; //error code
    em: string //error message
}

export type TRideStats = {
    fid: string; //frameid
    co2sav: number; // co2savings
    totdist: number //total distance
    petlsav: number; //petrol saving
    grnmls: number; //green miles
    costrcv: number; // cost recovered
    rats: number; // ratings
    st: string; //status
    ec: string; //error code
    em: string //error message
}

export type TBikeLiveDate = {
    fid: string; //frameid
    ign: number; //ignition status
    lc: number; //locked
    rngcvr: number;//range covered
    rngavail: number; //range available
    batchrgper: number; //battery charge perceentage
    noty: number; //promotion
    prom: number; //promotion
    st: string; //status
    ec: string; //error code
    em: string //error message
}

export type TCurrentLocation = {
    lat: number; //latitude
    long: number; //longitude
    addr: string; //address
    utc: string; //Event_utc last used
    st: string;
    ec: string;
    em: string
}

export type TCurrentRide = {
    fid: string;
    batchrg: number; //batery charge
    rngavail: number; //range avialable
    rngcrv: number; //range covered
    dist: number; //distance
    kmph: number; //speed kmph
    timeelp: string; //unknown abbreviation
    avgspd: number; //average speed
    maxspd: number; //max speed
    pa: number; //unknown
    pm: number; //unknown
    ign: number; //ignition
    st: string;
    ec: string;
    em: string
}

export type TEndRide = {
    fid: string;
    dist: number; //distance
    dur: string; //duration
    avgspd: number; //average speed
    maxspd: number; //max speed    
    grnmls: number; //green miles
    calbnt: number; //calories burnt
    ptrsav: number; //petrol saved
    ptrlt: number; //petrol saved inn liter
    st: string;
    ec: string;
    em: string
}

export type TLocationHistory = {
    lat: number; //latitude
    long: number; //longitude
    utc: string; //Event_utc last used
    st: string;
    ec: string;
    em: string;
}

export type TBikeDetails = {
    fid: string;
    mtrper: number; //motor percentage
    batper: number; //battery percentage
    batid: string; //battery id
    bathlt: number; //battery health
    vehid: number; //vehicle id
    model: string; // vehicle model
    servDate: string; //service date
    st: string;
    ec: string;
    em: string;
}

export type TRideHistory = {
    fid: string;
    dist: number; //distance
    kmph: number; //speed kmph
    loc: string; //locationg name
    fromtime: string;
    totime: string;
    date: string;
    st: string;
    ec: string;
    em: string;
}

export type TRideHistoryStats = {
    fid: string; //frameid
    co2sav: number; // co2savings
    grnmls: number; //green miles
    totdist: number //total distance
    petlsav: number; //petrol saving
    costrcv: number; // cost recovered
    avgspd: number; //average speed
    avgkmph: number; //unknown
    date: string;
    st: string;
    ec: string;
    em: string;
}

export type TRequestBody = {
    frameid?: string;
    phone_number?: string;
    startTime?: string;
    endTime?: string;
}