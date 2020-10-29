import moment from "moment"

export const formatTime = (time: string) => {
    const newDate = new Date(time)
    return moment(newDate).format("DD-MMM-YYYY HH:mm A")
}

export const formatDate = (time: string) => {
    const newDate = new Date(time)
    return moment(newDate).format("DD-MMM-YYYY")
}

export const formatHourMin = (time : string|undefined) => {
    const splitTime =time?time.split(':'):""
    if(splitTime.length > 0) {
        return `${splitTime[0]} hr ${splitTime[1]} min`
    }
    return time
}