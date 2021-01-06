import { IAlertActions, IDropdownFilterActions } from "../actions/alerts";
import { TAlertType, TSort, TPagination, TFilter, Alert, TDropdownFilters, TSearchFilter, TAlertPagination } from "../redux/models"
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
    pageSize: number,
    sortDirection:"asc"|"desc"
    sortKey:string
}

export type Store_AlertUpdate = {
    type: "STORE_ALERT_UPDATE",
    payload: {
        alertType: TAlertType,
        alerts: TAlertsTableData,
        pagination: TPagination,
        sort: TSort,
        alertPagination:TAlertPagination
    }
}

export type Store_AlertTabChange = {
    type: "STORE_ALERT_TAB_CHANGE",
    payload: {
        alertType: TAlertType,
        pagination: TPagination,
        alertPagination:TAlertPagination
    }
}

export type Store_AlertFilterChange = {
    type: "STORE_UPDATE_FILTER",
    payload: {
        alertType: TAlertType,
        pagination: TPagination,
        filter: TFilter,
        locationFilter: TFilter,
        vehicleFilter: TFilter,
        timeFrameFilter: TFilter,
        searchFilter: TSearchFilter,
        alertPagination:TAlertPagination
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
              sort: params.payload.sort,
              alertPagination:params.payload.alertPagination
          }
      } as Store_AlertUpdate)
  } catch (error) {
      console.log("get Alerts error", error)
  }
}

async function getAlerts(params: IAlertActions) {
  console.log("getAlerts data......", params);

    let response = [];
    if (params.payload.filter.fieldName !== "all") {
        const request = await getFilteredAlertDetailsRequest(params);
        response = await Promise.all([
          getFilteredSmartAlert(request!,params), 
          getFilteredBmsAlert(request!,params), 
          getFilteredMcAlert(request!,params)
        ])
    } else {
        response = await Promise.all([
          getSmartAlert(params), 
          getBmsAlert(params), 
          getMcAlert(params)])
    }
    const data: TAlertsTableData = {
      smart:  Object.assign({dataCount: 0, data: []}, response[0]),
      bms:  Object.assign({dataCount: 0, data: []}, response[1]),
      mc: Object.assign({dataCount: 0, data: []}, response[2]),
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
    let request: FilterAlertRequest = {
      alertType: params.payload.alertType,
      pageNo: params.payload.pagination.pageNumber,
      pageSize: params.payload.pagination.pageSize,
      sortDirection:params.payload.sort.direction==="descend"?"desc":"asc",
      sortKey:params.payload.sort.fieldName
    }
    if (params.payload.vehicleFilter.fieldName === "model") {
        const key = (params.payload.vehicleFilter.value === "Classic" || params.payload.vehicleFilter.value === "Cargo") ? "model" : "subModel"
        request = Object.assign(request,
          {
            [key]: params.payload.vehicleFilter.value
          }
        )
    }
    if (params.payload.locationFilter.fieldName === "location") {
        const key = (params.payload.locationFilter.value === "North"
            || params.payload.locationFilter.value === "South"
            || params.payload.locationFilter.value === "East"
            || params.payload.locationFilter.value === "West") ? "location" : "subLocation"
        request = Object.assign(request,
          {
            [key]: params.payload.locationFilter.value
          }
        )
    }
    if (params.payload.timeFrameFilter.fieldName === "timeFrame") {
      request = Object.assign(request, {
          timeFrame: params.payload.timeFrameFilter.value,
      })
    }
    if (params.payload.timeFrameFilter.fieldName === "DateRange") {
        const splitDate = params.payload.timeFrameFilter.value.split(" to ")
        const startDate = moment(splitDate[0].trim(), "DD/MM/YYYY").format("YYYY-MM-DD")
        const endDate = moment(splitDate[1].trim(), "DD/MM/YYYY").format("YYYY-MM-DD")
        request = Object.assign(request, {
            startDate: startDate,
            endDate: endDate
        })
    }
    if (params.payload.searchFilter.fieldName === "search") {
        const key = params.payload.searchFilter.isVehicle? "vehicleID":"alertName"
        request = Object.assign(request,
          {
            [key]: params.payload.searchFilter.value
          }
        )
    }
    console.log("my saga filter call", params.payload.searchFilter);
    return request
}


async function getSmartAlert(params: IAlertActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "smart",
            pageNo: params.payload.alertPagination?.smart.pageNumber,
            pageSize: params.payload.alertPagination?.smart.pageSize,
            sortDirection:params.payload.sort.direction==="descend"?"desc":"asc",
            sortKey:params.payload.sort.fieldName
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getBmsAlert(params: IAlertActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "bms",
            pageNo:params.payload.alertPagination?.bms.pageNumber,
            pageSize:params.payload.alertPagination?.bms.pageSize,
            sortDirection:params.payload.sort.direction==="descend"?"desc":"asc",
            sortKey:params.payload.sort.fieldName
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getMcAlert(params: IAlertActions) {
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/mainAlerts',
        {
            alertType: "mc",
            pageNo:params.payload.alertPagination?.mc.pageNumber,
            pageSize:params.payload.alertPagination?.mc.pageSize,
            sortDirection:params.payload.sort.direction==="descend"?"desc":"asc",
            sortKey:params.payload.sort.fieldName
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getFilteredSmartAlert(requestPayload: FilterAlertRequest,params:IAlertActions) {
    const smartFilter: FilterAlertRequest = {
        ...requestPayload,
        alertType: "smart",
        pageNo:params.payload.alertPagination.smart.pageNumber,
        pageSize:params.payload.alertPagination.smart.pageSize
    }
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/dashFilter',
        smartFilter
        , { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getFilteredBmsAlert(requestPayload: FilterAlertRequest,params:IAlertActions) {
    const bmsFilter: FilterAlertRequest = {
        ...requestPayload,
        alertType: "bms",
        pageNo:params.payload.alertPagination.bms.pageNumber,
        pageSize:params.payload.alertPagination.bms.pageSize
    }
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/dashFilter',
        bmsFilter, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
}

async function getFilteredMcAlert(requestPayload: FilterAlertRequest,params:IAlertActions) {
    const mcFilter: FilterAlertRequest = {
        ...requestPayload,
        alertType: "mc",
        pageNo:params.payload.alertPagination.mc.pageNumber,
        pageSize:params.payload.alertPagination.mc.pageSize
    }
    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/dashFilter',
        mcFilter, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data.body as Alert
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