export type ReportIssue = {
    type: "ReportIssue",
    payload: {
        bikeId: string,
        bikeName: string,
        model: string,
        comments: string,
    }
}

export type ReadService = {
    type: "ReadService",
    payload: {}
}

export type ReadNearByService = {
    type: "ReadNearByService",
    payload: {
        latitude: number,
        longitude: number,
        distance: number
    }
}