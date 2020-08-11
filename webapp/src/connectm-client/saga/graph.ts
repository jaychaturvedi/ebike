import { IAlertGraphActions, AlertGraphActions } from "../actions/graph"
import { TlowMileageGraph, TvehicleUsageGraph } from "../redux/connectm-state"
import axios from "axios"
export type Store_GetLowMileage = {
    type: AlertGraphActions,
    payload: {
        lowMileage: TlowMileageGraph,
    }
}

export type Store_GetVehicleUsage = {
    type: AlertGraphActions,
    payload: {
        vehicleUsage: TvehicleUsageGraph
    }
}


export type TAlertsTrendData = {
    lowMileage: TlowMileageGraph,
    vehicleUsage: TvehicleUsageGraph
}

export async function getLowMileage(params: IAlertGraphActions) {
    console.log("called trend saga");
    const data = await lowMileageGraph(params)
    console.log(params.payload, 'in lowMileage')
    return data
}

export async function getVehicleUsage(params: IAlertGraphActions) {
    console.log("called trend saga");
    const data = await vehicleUsageGraph(params)
    console.log(params.payload, 'in vehicleusage')
    return data
}

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

async function vehicleUsageGraph(params: IAlertGraphActions) {
    const data = await axios.post(process.env.REACT_APP_HOST + '/vehicleUsage',
        {
            vehicleID: params.payload.vehicleId,
            alertId: params.payload.alertId,
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return data
}
