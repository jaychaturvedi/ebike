export type ReadUser = {
    type: "ReadUser",
    payload: {}
}

export type UpdateUser = {
    type: "UpdateUser",
    payload: {
        name: string,
        email: string,
    }
}
