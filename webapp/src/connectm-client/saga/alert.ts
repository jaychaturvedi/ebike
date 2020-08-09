import { IAlertActions } from "../actions/alerts";
import { AlertData, TAlertType, TSort, TPagination, TFilter, Alert } from "../redux/connectm-state"
import { put } from "redux-saga/effects";
import moment from "moment";
import axios from "axios"
import * as dotenv from "dotenv"
dotenv.config()
type FilterAlertRequest = {
    vehicleID?: string,
    alertName?: string,
    model?: string,
    subModel?: string,
    location?: string,
    subLocation?: string,
    startDate?: string,
    endDate?: string,
    batteryId?: string,
    customerId?: string,
    timeFrame?: string,
    alertType: TAlertType,
    page: number,
    pageSize: number
}

export type Store_AlertUpdate = {
    type: "STORE_ALERT_UPDATE",
    payload: {
        alertType: TAlertType,
        alerts: TAlertsTableData,
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

export type Store_AlertFilterChange = {
    type: "STORE_UPDATE_FILTER",
    payload: {
        alertType: TAlertType,
        pagination: TPagination,
        filter: TFilter
    }
}
export type TAlertsTableData = {
    smart: Alert,
    bms: Alert,
    mc: Alert
}

export async function getAlerts(params: IAlertActions) {
    console.log("called saga");
    let response = [];
    if (params.payload.filter.value != "") {
        const request = await getFilteredAlertDetailsRequest(params);
        response = await Promise.all([generateQueryAlertsData(params), generateQueryAlertsData(params), generateQueryAlertsData(params)])
        await getSmartAlert()
    } else {
        response = await Promise.all([generateAlertsData(params), generateAlertsData(params), generateAlertsData(params)])
    }
    const data: TAlertsTableData = {
        smart: response[0],
        bms: response[1],
        mc: response[2]
    }
    return data
}

export function* updateAlertTabChange(params: IAlertActions) {
    yield put({
        type: "STORE_ALERT_TAB_CHANGE",
        payload: params.payload
    } as Store_AlertTabChange)
}

export function* updateAlertFilterChange(params: IAlertActions) {
    yield put(
        {
            type: "STORE_UPDATE_FILTER",
            payload: params.payload
        } as Store_AlertFilterChange
    )
}

async function getFilteredAlertDetailsRequest(params: IAlertActions) {
    let request: FilterAlertRequest
    if (params.payload.filter.fieldName == "model") {
        const key = (params.payload.filter.value == "Classic" || params.payload.filter.value == "Cargo") ? "model" : "subModel"
        request = {
            [key]: params.payload.filter.value,
            alertType: params.payload.alertType,
            page: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName == "location") {
        const key = (params.payload.filter.value == "North"
            || params.payload.filter.value == "South"
            || params.payload.filter.value == "East"
            || params.payload.filter.value == "West") ? "location" : "subLocation"
        request = {
            [key]: params.payload.filter.value,
            alertType: params.payload.alertType,
            page: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName == "timeFrame") {
        request = {
            timeFrame: params.payload.filter.value,
            alertType: params.payload.alertType,
            page: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName == "DateRange") {
        const splitDate = params.payload.filter.value.split(" to ")
        const startDate = moment(splitDate[0].trim(), "DD/MM/YYYY").format("YYYY-MM-DD")
        const endDate = moment(splitDate[1].trim(), "DD/MM/YYYY").format("YYYY-MM-DD")
        request = {
            startDate: startDate,
            endDate: endDate,
            alertType: params.payload.alertType,
            page: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }

}

async function generateAlertsData(params: IAlertActions) {
    let datas: AlertData[] = []
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
    const alert: Alert = {
        data: datas,
        dataCount: 100
    };
    return alert;
}

function generateQueryAlertsData(params: IAlertActions) {
    let datas: AlertData[] = []
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
            customerId: params.payload.alertType + params.payload.filter.fieldName,
            batteryId: "",
            location: "Bangalore " + i
        })
    }
    const alert: Alert = {
        data: datas,
        dataCount: 100
    };
    return alert;
}

async function getSmartAlert() {
    console.log('envvv', process.env.REACT_APP_WEBAPIURL);

    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "smart",
            pageSize: 10,
            pageNo: 1
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(data);
}

async function getBmsAlert() {
    console.log('envvv', process.env.REACT_APP_WEBAPIURL);

    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "bms",
            pageSize: 10,
            pageNo: 1
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(data);
}

async function getMcAlert() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "mc",
            pageSize: 10,
            pageNo: 1
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(data);
}

async function totalAlerts() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/totalAlerts',
        {
            alertType: "smart",
            startDate: "2020-07-07 10:49:38",
            endDate: "2020-07-08 16:50:38"
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(data);
}

async function top5Alerts() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/topFive',
        {
            alertType: "smart",
            startDate: "2020-07-07 10:49:38",
            endDate: "2020-07-08 16:50:38"
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(data);
}

async function locationWiseAlerts() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/locationWise',
        {
            alertType: "smart",
            startDate: "2020-07-07 10:49:38",
            endDate: "2020-07-08 16:50:38"
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}

async function getAdditionalInsights() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/additionalInsight',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
            alertName: "voltage deviation",
            customerId: "CUS14567"
        }, { headers: { 'Content-Type': 'application/json' } }
    )
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

async function clearAlert() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/clearAlert',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
            alertName: "voltage deviation",
            comment: "comment cleared",
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}

async function lowMileageGraph() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/lowMileage',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
            alertName: "voltage deviation",
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}

async function batteryCellGraph() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/lowMileage',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}

async function vehicleUsageGraph() {
    const data = await axios.post(process.env.REACT_APP_WEBAPIURL + '/vehicleUsage',
        {
            vehicleID: "069bcc081a68a0832f123",
            alertId: 123,
        }, { headers: { 'Content-Type': 'application/json' } }
    )
}