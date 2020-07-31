import { IAlertActions } from "../actions/alerts";
import { Alert as AlertModel, TAlertType, TSort, TPagination } from "../redux/connectm-state"
import { put } from "redux-saga/effects";

export type Store_AlertUpdate = {
    type: "STORE_ALERT_UPDATE",
    payload: {
        alertType: TAlertType,
        alerts: [AlertModel],
        pagination: TPagination,
        sort: TSort
    }
}

export type Store_AlertTabChange = {
    type: "STORE_ALERT_TAB_CHANGE",
    payload: {
        alertType: TAlertType,
        pagination: TPagination
    }
}

export function* getAlerts(params: IAlertActions) {
    console.log("called saga");
    const response: AlertModel[] = generateAlertsData(params)
    yield put({
        type: "STORE_ALERT_UPDATE",
        payload: {
            alertType: params.payload.alertType,
            alerts: response,
            pagination: params.payload.pagination,
            sort: params.payload.sort
        }
    } as Store_AlertUpdate);
}

export function* updateAlertTabChange(params: IAlertActions) {
    yield put({
        type: "STORE_ALERT_TAB_CHANGE",
        payload: params.payload
    } as Store_AlertTabChange)
}

function generateAlertsData(params: IAlertActions) {
    let datas: AlertModel[] = []
    for (var i = 1; i < params.payload.pagination.pageSize + 1; i++) {
        datas.push({
            alertId: i,
            alertName: i % 2 ? "Capacity Deterioration " : "Voltage Deviation",
            model: "Classic" + i,
            frameId: "BDS" + i,
            alertTime: i + " May 2020 10:05AM",
            openSince: "24 hrs " + i + "0 min",
            Severity: i,
            mfgDate: "",
            customerId: params.payload.alertType,
            batteryId: "",
            location: "Bangalore " + i
        })
    }
    return datas;
}
