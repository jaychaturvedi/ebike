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
    batchrgper: number; //batery charge
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