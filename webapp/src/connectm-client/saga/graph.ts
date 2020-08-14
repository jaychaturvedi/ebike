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
    // const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/vehicleUsage',
    //     {
    //         vehicleID: params.payload.vehicleId,
    //         alertId: params.payload.alertId,
    //     }, { headers: { 'Content-Type': 'application/json' } }
    // )
    let data: any = []
    const alertName = params.payload.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
    // if (alertName === "capacitydeterioration") {
    //     data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/maingraph',
    //         {
    //             vehicleID: params.payload.vehicleId,
    //             alertId: params.payload.alertId,
    //             alertName: params.payload.alertName
    //         }, { headers: { 'Content-Type': 'application/json' } }
    //     )
    // }
    // else {
    //     data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/subgraph/dynamic',
    //         {
    //             vehicleID: params.payload.vehicleId,
    //             alertId: params.payload.alertId,
    //             alertName: params.payload.alertName,
    //             alertTypeId: params.payload.alertTypeId
    //         }, { headers: { 'Content-Type': 'application/json' } }
    //     )
    // }

    console.log("graph data call", alertName);

    enum GraphType {
        BATTERYCELL = 'voltagesdeviation',
        VEHICLEUSAGE = 'vehicleidleinactive',
        BATTERYTEMP = 'highoperatingtemperature',
        BATTERYVOLTAGETREND = 'unitovervoltagel1',
        CHARGINGTEMPTREND = 'highchargingtemperature',
        CHARGINGCURRENTTREND = 'chargeovercurrentl1',
        SOCTREND = 'highsocl1',
        TEMPDIFFERENCETREND = 'excessivetemperaturedifferencel1',
        SPEEDTREND = 'hallsensorfault',
        LOWMILEAGE = 'capacitydeterioration',
    }
    console.log(params, "in saga getgraphdata");
    switch (alertName) {
        case GraphType.BATTERYCELL: {
            return voltagesdeviationData
        }
        case GraphType.VEHICLEUSAGE: {
            return VehicleUsageData
        }
        case GraphType.BATTERYTEMP: {
            return lowMileageData
        }
        case GraphType.BATTERYVOLTAGETREND: {
            return lowMileageData
        }
        case GraphType.CHARGINGTEMPTREND: {
            return lowMileageData
        }
        case GraphType.CHARGINGCURRENTTREND: {
            return lowMileageData
        }
        case GraphType.SOCTREND: {
            return lowMileageData
        }
        case GraphType.TEMPDIFFERENCETREND: {
            return lowMileageData
        }
        case GraphType.SPEEDTREND: {
            return lowMileageData
        }
        case GraphType.LOWMILEAGE: {
            return lowMileageData
        }
        default: {
            return 0
        }
    }

    return data
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

const VehicleUsageData = [
    { name: '29 June', uv: 4000, pv: 2400, amt: 2400, },
    { name: '30th', uv: 4000, pv: 2400, amt: 2400, },
    { name: '1st July', uv: 4000, pv: 2400, amt: 2400, },
    { name: '2nd', uv: 3000, pv: 1398, amt: 2210, },
    { name: '3rd', uv: 2000, pv: 9800, amt: 2290, },
    { name: '4th', uv: 2780, pv: 3908, amt: 2000, },
    { name: '5th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '6th', uv: 2390, pv: 3800, amt: 2500, },
    { name: '7th', uv: 3490, pv: 4300, amt: 2100, },
    { name: '8th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '9th', uv: 2000, pv: 9800, amt: 2290, },
    { name: '10th', uv: 2780, pv: 0, amt: 2000, color: 'red' },
    { name: '11th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '12th', uv: 2000, pv: 9800, amt: 2290, },
    { name: '13th', uv: 2780, pv: 3908, amt: 2000, },
    { name: '14th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '15th', uv: 3490, pv: 4300, amt: 2110, },
];

const voltagesdeviationData = {
    "cell1": 3.900,
    "cell2": 3.752,
    "cell3": 3.753,
    "cell4": 3.754,
    "cell5": 3.755,
    "cell6": 3.750,
    "cell7": 3.751,
    "cell8": 3.755,
    "cell9": 3.756,
    "cell10": 3.757,
    "cell11": 3.759,
    "cell12": 3.000,
    "volatgeDiffer": 0.900,
}