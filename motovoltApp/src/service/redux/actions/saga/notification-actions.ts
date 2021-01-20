export type ReadNotifications = {
    type: "ReadNotifications",
    payload: {
        pageNumber: number,
        pageSize: number,
        bikeId: string
    }
}

export type ClearNotifications = {
    type: "ClearNotifications",
    payload: {}
}