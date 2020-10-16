export type ReadUser = {
    type: "ReadUser",
    payload: {}
}

export type UpdateUser = {
    type: "UpdateUser",
    payload: {
        name: string,
        email: string,
        gender: string,
        age: string
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