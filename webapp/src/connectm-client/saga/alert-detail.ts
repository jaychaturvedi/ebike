import { IAlertDetailActions, AlertDetailActions } from "../actions/alert-detail";
import { TPastAlert, TAlertInsights } from "../redux/connectm-state"
import axios from "axios"

export type Store_AlertInsights = {
    type: AlertDetailActions,
    payload: {
        alertInsight: TAlertInsights
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