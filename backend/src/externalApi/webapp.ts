import { get, post, put } from 'request-promise'
import * as dotenv from "dotenv"
import { TDashboardFilter, TDashboard, TTotalAlert, TAdditionalInsight, TAlertDetails } from './types';

dotenv.config()
function createOptions(url: string, body: any,) {
    const uri = process.env.WEBAPPAPI + url
    console.log("WEBAPPAPI", uri)
    const options = {
        uri,
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        json: true
    };
    return options
}

export default class WebAPI {
    static async mainAlerts(alertType: string, pageNo: number, pageSize: number) {
        console.log("Start Yantrs Time", new Date())
        const options = createOptions('/allalerts', { alertType, pageNo, pageSize })
        const fetchedData: TDashboard = await post(options)
        console.log("End Yantra time", new Date)
        return fetchedData

    }

    static async totalAlerts(alertType: string, startDate: string, endDate: string) {
        const options = createOptions('/trendtotalerts', { alertType, startDate, endDate })
        const fetchedData: TTotalAlert = await post(options)
        return fetchedData
    }

    static async topFiveAlert(alertType: string, startDate: string, endDate: string) {
        const options = createOptions('/trndgphtopfivalrt', { alertType, startDate, endDate })
        const fetchedData = await post(options)
        return { lines: fetchedData[0], data: fetchedData.splice(1) }
    }

    static async locationWiseAlert(alertType: string, startDate: string, endDate: string) {
        const options = createOptions('/trndgphlocwise', { alertType, startDate, endDate })
        const fetchedData = await post(options)
        return { lines: fetchedData[0], data: fetchedData.splice(1) }
    }

    static async dashFilter(filter: TDashboardFilter) {//add filters
        const options = createOptions('/dashboardfilter', { ...filter })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async additionalInsight(vehicleId: string, alertId: number, alertName: string, customerId: string) {
        const options = createOptions('/additinsts', { vehicleID: vehicleId, alertId, alertName, customerId })
        const fetchedData:TAdditionalInsight = await post(options)
        return fetchedData
    }

    static async pastAlerts(vehicleId: string, alertId: number, alertName: string, pageNo: number, pageSize: number) {
        const options = createOptions('/pastalerts', { vehicleID: vehicleId, alertId, alertName, pageNo, pageSize })
        const fetchedData = await post(options)
        return fetchedData
    }


    static async clearAlert(vehicleId: string, alertId: number, alertName: string, comment: string) {
        const options = createOptions('/clearalerts', { vehicleID: vehicleId, alertId, alertName, comment })
        const fetchedData = await post(options)
        return fetchedData
    }


  static async getDynamicSubGraph(
    vehicleId: string,
    alertId: number,
    alertTypeId: number,
    alertName: string,
    timeStamp: string,
    alertCode: string
    ) {
    const options = createOptions('/dynamic', {
      vehicleId,
      alertId,
      alertTypeId,
      alertName,
      timeStamp,
      alertCode
    })
    console.log("External API Start Time : ", new Date())
    const fetchedData = await post(options)
    console.log("External API End Time : ", new Date())
    return fetchedData
  }

    static async getAlertDetails(alertId: number) {
        const options = createOptions('/alertdetails', { alertId })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async vehicleSearch(frameId: string, pageSize: number, pageNo: number) {
        const options = createOptions('/vehsearch', {
            frameId: frameId,
            pageSize: pageSize,
            pageNo: pageNo
        })
        console.log("External API Start Time: ", new Date())
        const fetchedData = await post(options)
        console.log("External API End Time: ", new Date())
        return fetchedData
    }

    static async lowMileageGraph(vehicleId: string, alertId: number, alertName: string) {
        const options = createOptions('/maingraph', { vehicleID: vehicleId, alertId, alertName })
        const fetchedData = await post(options)
        return fetchedData
    }
      
    static async getCustomerLiveLocations(customerId: string) {
      console.log("External API Start Time: ", new Date())
      const options = {
        uri: "https://fwvwsm1jsh.execute-api.us-east-2.amazonaws.com/yantra/custlivelocation",
        body: { custId: customerId},
        headers: {'Content-Type': 'application/json'},
        json: true
      };
      const fetchedData = await post(options)
      console.log("External API End Time : ", new Date())
      return fetchedData
    }

    static async getDropdownFilters(){
      const vehicle = await get(createOptions('/vehicledropdown', undefined))
      const location = await get(createOptions('/locationdropdown', undefined))
      return {vehicle,location}
    }

    ///////////////////////////////////////not using below routes//////////////////////////////



    static async batteryCellGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 1,
            alertName: "voltage deviation"
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async vehicleUsageGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 2,
            alertName: "vehicle active or idle"

        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async batteryTempGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 3,
            alertName: "high operating temperature "
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async unitVoltageGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 4,
            alertName: "unit over voltage"

        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async chargingTempGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 5,
            alertName: "high charging temperature "
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async chargingCurrentGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 6,
            alertName: "charging over current"

        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async highSocGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 7,
            alertName: "high soc"
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async batteryTempDiffGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 8,
            alertName: "excessive temperature difference"
        })
        const fetchedData = await post(options)
        return fetchedData
    }

    static async speedGraph(vehicleId: string, alertId: number) {
        const options = createOptions('/subgraph/dynamic', {
            vehicleID: vehicleId,
            alertId,
            alertTypeId: 9,
            alertName: "hall sensor fault"
        })
        const fetchedData = await post(options)
        return fetchedData
    }
}
