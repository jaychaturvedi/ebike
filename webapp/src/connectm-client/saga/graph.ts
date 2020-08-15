import { IAlertGraphActions, AlertGraphActions } from "../actions/graph"

import axios from "axios"

export type Store_AlertGraph = {
    type: "STORE_ALERT_GRAPH",
    payload: {
        alertTypeId: number,
        data: any
    }
}

export async function getAlertGraphData(params: IAlertGraphActions) {
    const data = await getGraphData(params)
    return data
}

async function getGraphData(params: IAlertGraphActions) {
    let response: any = []
    const alertName = params.payload.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
    if (alertName === "capacitydeterioration") {
        response = await axios.get(process.env.REACT_APP_WEBAPIURL + '/lowMileage',
            {
                params: {
                    vehicleId: params.payload.vehicleId,
                    alertId: params.payload.alertId,
                    alertName: params.payload.alertName
                }
            }
        )
    }
    else {
        response = await axios.get(process.env.REACT_APP_WEBAPIURL + '/graphs',
            {
                params: {
                    vehicleID: params.payload.vehicleId,
                    alertId: params.payload.alertId,
                    alertName: params.payload.alertName,
                    alertTypeId: params.payload.alertTypeId
                }
            }
        )
    }

    console.log("graph data call", response.data.body);
    return lowMileageData
}

const lowMileageData = [
    { nocycles: 0, amilage: 30, smilage: 39, },
    { nocycles: 100, amilage: 39, smilage: 30, },
    { nocycles: 200, amilage: 15, smilage: 20, },
    { nocycles: 300, amilage: 35, smilage: 15, },
    { nocycles: 400, amilage: 13, smilage: 19, },
    { nocycles: 500, amilage: 39, smilage: 29, },
    { nocycles: 600, amilage: 14, smilage: 31, },
    { nocycles: 700, amilage: 20, smilage: 15, },
    { nocycles: 800, amilage: 26, smilage: 22, },
    { nocycles: 900, amilage: 25, smilage: 35, },
    { nocycles: 1000, amilage: 15, smilage: 40, },
    { nocycles: 1100, amilage: 12, smilage: 12, },
    { nocycles: 1200, amilage: 40, smilage: 20, },
];
