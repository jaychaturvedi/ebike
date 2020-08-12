export const alertNameToIdMapping = {
    voltagesdeviation: 1,
    vehicleidleinactive: 2,
    highoperatingtemperature: 3,
    unitovervoltagel1: 4,
    highchargingtemperature: 5,
    chargeovercurrent: 6,
    highsocl1: 7,
    excessivetemperaturedifferencel1: 8,
    hallsensorfault: 9
}

export function getAlertTypeId(alertName: string) {
    switch (alertName) {
        case "voltagesdeviation": {
            return 1
        }
        case "vehicleidleinactive": {
            return 2
        }
        case "highoperatingtemperature": {
            return 3
        }
        case "unitovervoltagel1": {
            return 4
        }
        case "highchargingtemperature": {
            return 5
        }
        case "chargeovercurrent": {
            return 6
        }
        case "highsocl1": {
            return 7
        }
        case "excessivetemperaturedifferencel1": {
            return 8
        }
        case "hallsensorfault": {
            return 9
        }
        case "capacitydeterioration" :{
            return 10 //user defined
        }
        default: {
            return 0
        }
    }
}

// 1	Voltages Deviation
// 2	Vehicle Idle / Inactive
// 3	High Operating Temperature
// 4	Unit Over Voltage - L1
// 5	High Charging Temperature - L1
// 6	Charge Over Current - L1
// 7	High SOC - L1
// 8	Excessive Temperature Difference L1
// 9	Hall Sensor Fault