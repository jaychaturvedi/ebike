import { IAlertDetailActions, AlertDetailActions, IPastAlertDetailActions } from "../actions/alert-detail";
import { TPastAlert, TAlertInsights, TSort, TPagination } from "../redux/connectm-state"
import axios from "axios"
import { put } from "redux-saga/effects";

export type Store_AlertInsights = {
    type: AlertDetailActions,
    payload: {
        alertInsight: TAlertInsights
    }
}

export type Store_PastAlert = {
    type: AlertDetailActions,
    payload: {
        data: TPastAlert[],
        sort: TSort,
        pagination: TPagination,
    }
}

export type Store_UpdatePastAlert = {
    type: "STORE_UPDATE_PAST_ALERTS",
    payload: {
        data: TPastAlert[],
        sort: TSort,
        pagination: TPagination,
        alertId: number,
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

export async function getPastAlertData(params: IAlertDetailActions) {
    const pastAlertData = await pastAlertDataGenerator(params)
    return pastAlertData
}

export function* updatePastAlertData(params: IPastAlertDetailActions) {
    yield put({
        type: "STORE_UPDATE_PAST_ALERTS",
        payload: {
            data: params.payload.pastAlerts,
            pagination: params.payload.pagination,
            sort: params.payload.sort,
            alertId: params.payload.alertId
        }
    } as Store_UpdatePastAlert)
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
            vehicleID: params.payload.vehicleID,
            alertId: params.payload.alertId,
            alertName: params.payload.alertName,
            comment: params.payload.comment
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body
}

async function getPastAlerts() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/pastAlerts',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
            alertName: "voltage deviation",
            customerId: "CUS14567",
            pageSize: 10,
            pageNo: 1
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}

function pastAlertDataGenerator(params: IAlertDetailActions) {
    let datas: TPastAlert[] = []
    for (var i = 110; i < 130; i++) {
        datas.push({
            alertId: String(i),
            alertTime: i + "-May-2020 10:05AM",
            tat: "24 hrs " + i + "0 min",
            vehicleId: "BDS" + i,
            location: "Bangalore " + i,
            alertGraph: false
        })
    }
    return datas
}