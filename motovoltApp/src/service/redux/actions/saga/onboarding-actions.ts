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
