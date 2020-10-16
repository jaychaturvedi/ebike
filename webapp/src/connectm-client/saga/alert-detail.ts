import { IAlertDetailActions, AlertDetailActions, IPastAlertDetailActions, ISingleAlertDetailAction, IClearGraphActions } from "../actions/alert-detail";
import { TAlertInsights, TSort, TPagination, TPastAlert, AlertData, TAlertType } from "../redux/models"
import axios from "axios"
import { put } from "redux-saga/effects";
import { getAlertTypeId } from "../util/alert-graph";
import { IAlertGraphActions } from "../actions/graph";
import { getAlertGraphData } from "./graph";

export type Store_AlertInsights = {
    type: AlertDetailActions,
    payload: {
        alertInsight: TAlertInsights
    }
}

export type Store_PastAlert = {
    type: AlertDetailActions,
    payload: {
        pastAlert: TPastAlert,
        sort: TSort,
        pagination: TPagination,
    }
}

export type Store_UpdatePastAlert = {
    type: "STORE_UPDATE_PAST_ALERTS",
    payload: {
        pastAlert: TPastAlert,
        sort: TSort,
        pagination: TPagination,
        alertId: number,
    }
}

export type Store_UpdateSingleAlert = {
    type: "STORE_UPDATE_SINGLE_ALERT",
    payload: {
        alertType: TAlertType
        alertId: string,
        alertData: AlertData
    }
}

export async function getAlertInsight(params: IAlertDetailActions) {
    const alertInsight = await getAdditionalInsights(params);
    return alertInsight
}

export async function postAlertClearanceComment(params: IAlertDetailActions) {
    try {
        const postAlertComment = await alertClearanceComment(params);
        return postAlertComment
        //handle error
    } catch (error) {
        console.log("post clearance alert error", error)
    }
}

export async function postClearAlertGraph(params: IClearGraphActions) {
    const alertName = params.payload.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
    const clearGraphAlertTypeId = await getAlertTypeId(alertName);
    return clearGraphAlertTypeId
}

export async function getPastAlertData(params: IAlertDetailActions) {
    const pastAlertData = await getPastAlerts(params)
    return pastAlertData
}

export function* updatePastAlertData(params: IPastAlertDetailActions) {
    yield put({
        type: "STORE_UPDATE_PAST_ALERTS",
        payload: {
            pastAlert: params.payload.pastAlerts,
            pagination: params.payload.pagination,
            sort: params.payload.sort,
            alertId: params.payload.alertId
        }
    } as Store_UpdatePastAlert)
}

export async function getSingleAlertDetail(params: ISingleAlertDetailAction) {
    const data = await getSingleAlert(params)
    return data
}

//get graph data on past alert row click
export async function getPastAlertGraphData(params: IAlertGraphActions) {
    const data = await getAlertGraphData(params)
    return data
}

async function getAdditionalInsights(params: IAlertDetailActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/additionalInsight',
        {
            vehicleID: params.payload.vehicleID,
            alertId: params.payload.alertId,
            alertName: params.payload.alertName,
            customerId: params.payload.customerId
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as TAlertInsights
}

async function alertClearanceComment(params: IAlertDetailActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/clearAlert',
        {
            vehicleId: params.payload.vehicleID,
            alertId: params.payload.alertId,
            alertName: params.payload.alertName,
            comment: params.payload.comment
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body
}

async function getPastAlerts(params: IAlertDetailActions) {
    console.log("in getPastAlerts", params.payload);

    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/pastAlerts',
        {
            vehicleId: params.payload.vehicleID,
            alertId: params.payload.alertId,
            alertName: params.payload.alertName,
            customerId: params.payload.customerId,
            pageSize: params.payload.pagination.pageSize,
            pageNo: params.payload.pagination.pageNumber
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body
}

//need to change
///alertDetails/
async function getSingleAlert(params: ISingleAlertDetailAction) {
    const response = await axios.get(process.env.REACT_APP_WEBAPIURL + '/alertDetails/' + params.payload.alertId)
    return response.data.body as AlertData
}

// function pastAlertDataGenerator(params: IAlertDetailActions) {
//     let datas: TPastAlertData[] = []
//     for (var i = 110; i < 130; i++) {
//         datas.push({
//             alertId: String(i),
//             alertTime: i + "-May-2020 10:05AM",
//             tat: "24 hrs " + i + "0 min",
//             vehicleId: "BDS" + i,
//             location: "Bangalore " + i,
//             alertGraph: false
//         })
//     }
//     const pastAlert: TPastAlert = {
//         dataCount: 130 - 110,
//         data: datas
//     }
//     return pastAlert
// }