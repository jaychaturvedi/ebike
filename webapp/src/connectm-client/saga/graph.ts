import { IAlertGraphActions, AlertGraphActions } from "../actions/graph"

import axios from "axios"


async function lowMileageGraph(params: IAlertGraphActions) {
    console.log(params, "in low mileage saga")
    // const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/lowMileage',
    //     {
    //         vehicleId: params.payload.vehicleId,
    //         alertId: params.payload.alertId,
    //         alertName: params.payload.alertName,
    //     }, { headers: { 'Content-Type': 'application/json' } }
    // )

    return [
        { "km": 20, "smilage": 30, "amilage": 40, "nocycles": 50 },
        { "km": 10, "smilage": 20, "amilage": 30, "nocycles": 40 },
        { "km": 10, "smilage": 20, "amilage": 30, "nocycles": 40 },
        { "km": 30, "smilage": 40, "amilage": 50, "nocycles": 60 }]
}

async function batteryCellGraph() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/batteryCell',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}


export type Store_AlertGraph = {
    type : "STORE_ALERT_GRAPH",
    payload : {
        alertTypeId : number,
        data : any
    }
}

export async function getAlertGraphData(params: IAlertGraphActions){
    const data = await getGraphData(params)
    return data
}

async function getGraphData(params: IAlertGraphActions) {
    // const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/vehicleUsage',
    //     {
    //         vehicleID: params.payload.vehicleId,
    //         alertId: params.payload.alertId,
    //     }, { headers: { 'Content-Type': 'application/json' } }
    // )
    const data = [
        {
            nocycles: 0, amilage: 30, smilage: 39,
        },
        {
            nocycles: 100, amilage: 39, smilage: 30,
        },
        {
            nocycles: 200, amilage: 15, smilage: 20,
        },
        {
            nocycles: 300, amilage: 35, smilage: 15,
        },
        {
            nocycles: 400, amilage: 13, smilage: 19,
        },
        {
            nocycles: 500, amilage: 39, smilage: 29,
        },
        {
            nocycles: 600, amilage: 14, smilage: 31,
        },
        {
            nocycles: 700, amilage: 20, smilage: 15,
        },
        {
            nocycles: 800, amilage: 26, smilage: 22,
        },
        {
            nocycles: 900, amilage: 25, smilage: 35,
        },
        {
            nocycles: 1000, amilage: 15, smilage: 40,
        },
        {
            nocycles: 1100, amilage: 12, smilage: 12,
        },
        {
            nocycles: 1200, amilage: 40, smilage: 20,
        },
    ];
    return data
}