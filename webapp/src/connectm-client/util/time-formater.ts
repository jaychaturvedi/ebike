import moment from "moment"

export const formatDateTime = (time: string, format: string) => {
    const newDate = new Date(time)
    const localAlertTime = moment(newDate).format(format)
    // moment(newDate).format("DD-MMM-YYYY HH:mm A")
    return localAlertTime
}
export const formatTime = (time: string) => {
    const newDate = new Date(time)
    const localAlertTime = formatDateTime(time, "DD-MMM-YYYY hh:mm a")
    // moment(newDate).format("DD-MMM-YYYY HH:mm A")
    return localAlertTime
}

export const formatDate = (time: string) => {
    const newDate = new Date(time)
    return moment.utc(newDate).local().format("DD-MMM-YYYY")
}

export const formatHourMin = (time : string|undefined) => {
    const splitTime =time?time.split(':'):""
    if(splitTime.length > 0) {
        return `${splitTime[0]} hr ${splitTime[1]} min`
    }
    return time
}