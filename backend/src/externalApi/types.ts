export type TValidatePhone = {
    fid: string; //frameid
    st: string; //status
    ec: string; //error code
    em: string //error message
}

export type TBikeStat = {
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
    ign: boolean; //ignition status
    lc: boolean; //locked
    rngcvr: number;//range covered
    rngavail: number; //range available
    batchrgper: number; //battery charge perceentage
    noty: boolean; //promotion
    prom: boolean; //promotion
    st: string; //status
    ec: string; //error code
    em: string //error message
}

export type TLiveLocation = {
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
    batchrgper: number; //batery charge
    rngavail: number; //range avialable
    rngcrv: number; //range covered
    dist: number; //distance
    kmph: number; //speed kmph
    timeelp: string; //unknown abbreviation
    avgspd: number; //average speed
    maxspd: number; //max speed
    pa: boolean; //unknown
    pm: boolean; //unknown
    ign: boolean; //ignition
    st: string;
    ec: string;
    em: string
}

export type TEndRideStat = {
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

export type TEndRideGps = {
    lat: number; //latitude
    long: number; //longitude
    utc: string; //Event_utc last used
    st: string;
    ec: string;
    em: string;
}

export type TMyBike = {
    fid: string;
    mtrper: number; //motor percentage
    batchrgper: number; //battery percentage
    batid: string; //battery id
    bathltper: number; //battery health
    vehid: number; //vehicle id
    model: string; // vehicle model
    type: string;
    servDate: string; //service date
    st: string;
    ec: string;
    em: string;
}

export type TRideHistory = {
    fid: string;
    dist: number; //distance
    kmph: number; //speed kmph
    pm: string;
    pa: string;
    ecom: string;
    startloc: string;
    endloc: string; //locationg name
    fromtime: string;
    totime: string;
    rating: number;
    date: string;
    st: string;
    ec: string;
    em: string;
}

export type TRideHistoryStats = {
    fid: string; //frameid
    co2sav: number; // co2savings
    dist: number //total distance
    grnmls: number; //green miles
    totdist: number //total distance
    avgspd: number; //average speed
    avgkmph: number; //unknown
    date: string;
    speed: string;
    st: string;
    ec: string;
    em: string;
}

export type TNotification = {
    fid: string; //frameid
    title: string;
    description: string;
    date: string;
    type: boolean;
    time: string;
    st: string;
    ec: string;
    em: string;
}

export type TRequestBody = {
    frameid?: string;
    pageSize?: number;
    pageNo?: number
    phone_number?: string;
    startTime?: string;
    endTime?: string;
}