export type ReadBikeStat = {
    type: "ReadBikeStat",
    payload: {
        bikeId: string,
    }
}

export type ReadBikeLocation = {
    type: "ReadBikeLocation",
    payload: {
        bikeId: string,
    }
}


export type ReadRideData = {
    type: "ReadRideData",
    payload: {
        bikeId: string,
        rideId: string,
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
        comment: string,
    }
}

export type ValidateFrame = {
    type: "ValidateFrame",
    payload: {
        frameNumber: string
    }
}

export type SetBikeName = {
    type: "SetBikeName",
    payload: {
        bikeName: string
    }
}

export type SetPersonalDetails = {
    type: "SetPersonalDetails",
    payload: {
        name: string,
        email: string,
        password: string,
    }
}