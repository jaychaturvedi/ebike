export type TAlertType = "smart" | "bms" | "mc"
export type TSort = { fieldName: string, direction: 'descend' | 'ascend' }
export type TPagination = {
    pageNumber: number,
    pageSize: number,
}
export interface Alert {
    alertId: number,
    alertName: string,
    mfgDate: string,
    batteryId: string,
    customerId: string,
    model: string,
    frameId: string,
    alertTime: string,
    openSince: string,    // hh:mm
    Severity: number // 1 means RED, 2 means Orange, 3 means Yellow
    location: string,
}

export interface State {
    alerts: {
        smart: {
            [alertId: string]: Alert
        },
        bms: {
            [alertId: string]: Alert,
        },
        mc: {
            [alertId: string]: Alert
        },
        sort: TSort,
        pagination: TPagination
        activeAlertTab: TAlertType
    }
}

const connectmState: State = {
    alerts: {
        smart: {},
        bms: {},
        mc: {},
        pagination: {
            pageNumber: 1,
            pageSize: 10,
        },
        sort: {
            fieldName: "Time",
            direction: 'descend'
        },
        activeAlertTab: "smart"
    }
}
//filter - option, filter type,

export default connectmState;