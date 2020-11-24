export const alertNameToIdMapping = {
    voltagesdeviation: 1,
    vehicleidleinactive: 2,
    highoperatingtemperature: 3,
    unitovervoltagel1: 4,
    highchargingtemperature: 5,
    chargeovercurrentl1: 6,
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
        case "highchargingtemperaturel1": {
            return 5
        }
        case "chargeovercurrentl1": {
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
        case "capacitydeterioration": {
            return 10 //user defined
        }
        default: {
            return 999
        }
    }
}

// 1	Voltages Deviation = CellBatteryGraph
// 2	Vehicle Idle / Inactive = BarGraph
// 3	High Operating Temperature = DoubleLineGraph
// 4	Unit Over Voltage - L1 = SingleLineGraph
// 5	High Charging Temperature - L1 = DualAxisLineGraph
// 6	Charge Over Current - L1 = SingleLineGraph
// 7	High SOC - L1 = SingleLineGraph
// 8	Excessive Temperature Difference L1 = SingleLineGraph
// 9	Hall Sensor Fault = SingleLineGraph
// 10 Capacity Deterioration = DoubleLineGraph
// 999 Single Line Graph 