export type ReadRideData = {
    type: "ReadRideData",
    payload: {
        bikeId: string,
        rideId: string,
        startTime: string,
        endTime: string
    }
}

export type ReadCurrentRideData = {
    type: "ReadCurrentRideData",
    payload: {
        bikeId: string,
        rideId: string,
    }
}

export type ReadRideHistory = {
    type: "ReadRideHistory",
    payload: {
        bikeId: string,
        startTime: string,
        endTime: string,
        pageNumber: number,
        pageSize: number,
    }
}

export type StartRide = {
    type: "StartRide",
    payload: {
        bikeId: string,
        rideId: string,
        startDate: string
    }
}

export type EndRide = {
    type: "EndRide",
    payload: {
        bikeId: string,
        rideId: string,
        endDate: string
    }
}

export type SubmitRide = {
    type: "SubmitRide",
    payload: {
        bikeId: string,
        rideId: string,
        rating: number,
        reason: string[],
        comment: string,
    }
}

export type Speedometer = {
    type: "Speedometer",
    payload: {
        rideId: string,
    }
}