import { IAlertActions, IDropdownFilterActions } from "../actions/alerts";
import { TAlertType, TSort, TPagination, TFilter, Alert, TDropdownFilters } from "../redux/models"
import { call, put } from "redux-saga/effects";
import moment from "moment";
import axios from "axios"
import * as dotenv from "dotenv"
import { searchKeyField } from "../util/search";
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
    pageNo: number,
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

export type Store_DropdownFilters={
  type: "STORE_DROPDOWN_FILTERS",
  payload:TDropdownFilters
}

export type TAlertsTableData = {
    smart: Alert,
    bms: Alert,
    mc: Alert
}

/////////////////////GET FILTER OPTIONS IN SUBHEADER//////////////////////
export function* getDropdownFilterOptions(params: IDropdownFilterActions) {
  try {
    const data: TDropdownFilters = yield call(fetchDropdownFilters, params)
    yield put({
      type: "STORE_DROPDOWN_FILTERS",
      payload: {
        location: data.location,
        vehicle: data.vehicle
      }
    } as Store_DropdownFilters)
  } catch (error) {
    console.log("get filters error", error)
  }
}
async function fetchDropdownFilters(params: IDropdownFilterActions) {
  const response = await axios.get(process.env.REACT_APP_WEBAPIURL + "/dropdownFilters")
  return response.data.body as TDropdownFilters
}


//////////////////////////////////GET ALERT TABLE DATA ///////////////////////////
export function* getAlertData(params: IAlertActions) {
  try {
      const data: TAlertsTableData = yield call(getAlerts, params)
      yield put({
          type: "STORE_ALERT_UPDATE",
          payload: {
              alertType: params.payload.alertType,
              alerts: data,
              pagination: params.payload.pagination,
              sort: params.payload.sort
          }
      } as Store_AlertUpdate)
  } catch (error) {
      console.log("get Alerts error", error)
  }
}

async function getAlerts(params: IAlertActions) {
    let response = [];
    if (params.payload.filter.value !== "") {
        const request = await getFilteredAlertDetailsRequest(params);
        response = await Promise.all([
          getFilteredSmartAlert(request!), 
          getFilteredBmsAlert(request!), 
          getFilteredMcAlert(request!)])
    } else {
        response = await Promise.all([
          getSmartAlert(params), 
          getBmsAlert(params), 
          getMcAlert(params)])
    }
    const data: TAlertsTableData = {
        smart: response[0],
        bms: response[1],
        mc: response[2]
    }
    return data
}


///////////////////////////change tabs to sms, bms, mc////////////////////////
export function* updateAlertTabChange(params: IAlertActions) {
  try {
    yield put({
      type: "STORE_ALERT_TAB_CHANGE",
      payload: params.payload
    } as Store_AlertTabChange)
  } catch (error) {
    console.log("error", error)
  }
}
//////////////////////////updates filters///////////////////////////////////
export function* updateAlertFilterChange(params: IAlertActions) {
    try{
      yield put(
        {
            type: "STORE_UPDATE_FILTER",
            payload: params.payload
        } as Store_AlertFilterChange
    )}
    catch (error) {
      console.log("error", error)
    }
}

async function getFilteredAlertDetailsRequest(params: IAlertActions) {
    let request: FilterAlertRequest
    if (params.payload.filter.fieldName === "model") {
        const key = (params.payload.filter.value === "Classic" || params.payload.filter.value === "Cargo") ? "model" : "subModel"
        request = {
            [key]: params.payload.filter.value,
            alertType: params.payload.alertType,
            pageNo: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName === "location") {
        const key = (params.payload.filter.value === "North"
            || params.payload.filter.value === "South"
            || params.payload.filter.value === "East"
            || params.payload.filter.value === "West") ? "location" : "subLocation"
        request = {
            [key]: params.payload.filter.value,
            alertType: params.payload.alertType,
            pageNo: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName === "timeFrame") {
        request = {
            timeFrame: params.payload.filter.value,
            alertType: params.payload.alertType,
            pageNo: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName === "DateRange") {
        const splitDate = params.payload.filter.value.split(" to ")
        const startDate = moment(splitDate[0].trim(), "DD/MM/YYYY").format("YYYY-MM-DD")
        const endDate = moment(splitDate[1].trim(), "DD/MM/YYYY").format("YYYY-MM-DD")
        request = {
            startDate: startDate,
            endDate: endDate,
            alertType: params.payload.alertType,
            pageNo: params.payload.pagination.pageNumber,
            pageSize: params.payload.pagination.pageSize
        }
        return request;
    }
    if (params.payload.filter.fieldName === "search") {
        let key = "";
        const searchString = params.payload.filter.value
        const searchStringSub = searchString.slice(0, 3)
        // console.log("search string", searchString, "Search sub", searchStringSub)
        key = searchKeyField(searchStringSub)
        if (key.length > 0) {
            request = {
                [key]: params.payload.filter.value,
                alertType: params.payload.alertType,
                pageNo: params.payload.pagination.pageNumber,
                pageSize: params.payload.pagination.pageSize
            }
            return request
        }
    }
}


async function getSmartAlert(params: IAlertActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "smart",
            pageSize: params.payload.pagination.pageSize,
            pageNo: params.payload.pagination.pageNumber
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getBmsAlert(params: IAlertActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "bms",
            pageSize: params.payload.pagination.pageSize,
            pageNo: params.payload.pagination.pageNumber
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getMcAlert(params: IAlertActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "mc",
            pageSize: params.payload.pagination.pageSize,
            pageNo: params.payload.pagination.pageNumber
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getFilteredSmartAlert(requestPayload: FilterAlertRequest) {
    const smartFilter: FilterAlertRequest = {
        ...requestPayload,
        alertType: "smart"
    }
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/dashFilter',
        smartFilter
        , { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body
}

async function getFilteredBmsAlert(requestPayload: FilterAlertRequest) {
    const bmsFilter: FilterAlertRequest = {
        ...requestPayload,
        alertType: "bms"
    }
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/dashFilter',
        bmsFilter, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body
}

async function getFilteredMcAlert(requestPayload: FilterAlertRequest) {
    const mcFilter: FilterAlertRequest = {
        ...requestPayload,
        alertType: "mc"
    }
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/dashFilter',
        mcFilter, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body
}


// function pastAlertDataGenerator() {
//     let datas: any = []
//     for (var i = 110; i < 202; i++) {
//         datas.push({
//             alertId: String(i),
//             time: i + "-May-2020 10:05AM",
//             openSince: "24 hrs " + i + "0 min",
//             vehicleId: "BDS" + i,
//             location: "Bangalore " + i,
//             Severity: i % 3,
//             alertName: 'my alert',
//             model: 'Classic',
//             mfgDate: i + "-May-2020 10:05AM",
//             batteryId: i,
//             customerId: i,
//             frameId: '111111111',
//             alertTime: i + "-May-2020 10:05AM",
//         })
//     }
//     const pastAlert: any = {
//         dataCount: 202 - 130,
//         data: datas
//     }
//     return pastAlert
// }