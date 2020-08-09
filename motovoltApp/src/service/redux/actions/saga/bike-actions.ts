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

export type ValidateFrame = {
    type: "ValidateFrame",
    payload: {
        frameNumber: string
    }
}

export type UpdateBike = {
    type: "UpdateBike",
    payload: {
        id: string,
        name: string
    }
}