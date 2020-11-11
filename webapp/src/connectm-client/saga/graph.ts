import { IAlertGraphActions } from "../actions/graph"
import axios from "axios"
import { call, put } from "redux-saga/effects"

export type Store_AlertGraph = {
    type: "STORE_ALERT_GRAPH",
    payload: {
        alertTypeId: number,
        data: any
    }
}

export function* getAlertGraphDatas(params: IAlertGraphActions) {
  try {
      const data = yield call(getAlertGraphData, params)
      yield put({
          type: "STORE_ALERT_GRAPH",
          payload: {
              alertTypeId: params.payload.alertTypeId,
              data: data
          }
      } as Store_AlertGraph)
  } catch (error) {
      console.log("error", error)
  }
}

export function* clearAlertGraphDatas(params: IAlertGraphActions) {
    yield put({
      type: "STORE_ALERT_GRAPH",
      payload: {
        alertTypeId: params.payload.alertTypeId,
        data:undefined
      }
    } as Store_AlertGraph)
}

export async function getAlertGraphData(params: IAlertGraphActions) {
    const data = await getGraphData(params)
    return data
}


async function getGraphData(params: IAlertGraphActions) {
    let response: any = []
    const alertName = params.payload.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase()
    if (alertName === "capacitydeterioration") {
        response = await axios.get(process.env.REACT_APP_WEBAPIURL + '/lowMileage',
            {
                params: {
                    vehicleId: params.payload.vehicleId,
                    alertId: params.payload.alertId,
                    alertName: params.payload.alertName
                }
            }
        )
    }
    else {
        response = await axios.get(process.env.REACT_APP_WEBAPIURL + '/graphs',
            {
                params: {
                    vehicleId: params.payload.vehicleId,
                    alertId: params.payload.alertId,
                    alertName: params.payload.alertName,
                    alertTypeId: params.payload.alertTypeId,
                    timeStamp: params.payload.timeStamp,
                    alertCode: params.payload.alertCode
                }
            }
        )
    }
    return response.data.body
}

