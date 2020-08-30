import './index.scss';
import React, { PureComponent } from 'react';
import CellBatteryGraph from "./cell-battery-graph"
import StackedGraph from './stacked-bar'
import {
    mapDispatchToProps, mapStateToProps, ReduxAlertGraphActions,
    ReduxAlertGraphState
} from '../../../connectm-client/actions/graph';
import { connect } from 'react-redux';
import { getAlertTypeId } from '../../../connectm-client/util/alert-graph';
//Store will register all graph type data
import DoubleLineGraph from "./double-line";
import SingleLineGraph from './single-line';
import DualAxisLineGraph from './dualAxisGraph'

interface AlertGraphProps extends ReduxAlertGraphActions, ReduxAlertGraphState {
    alertName?: string,
    alertType?: string,
    alertId?: number,
    vehicleId?: string,
    alertDate: string,
    alertCleared?: boolean,
    clearAlertState: Function
}

interface AlertGraphStates {
    dataLoaded: boolean
    alertTypeId: number,
    data: any,
    clearAlertState: boolean

}

class AlertGraph extends PureComponent<AlertGraphProps, AlertGraphStates> {
    constructor(props: AlertGraphProps) {
        super(props)
        this.state = {
            dataLoaded: false,
            alertTypeId: 0,
            data: {},
            clearAlertState: props.clearAlertState()
        }
    }

    static getDerivedStateFromProps(props: AlertGraphProps, state: AlertGraphStates) {
        let alertTypeId: number
        console.log("Got alert graph request")
        if (props.alertName != undefined) {
            alertTypeId = getAlertTypeId(props.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase())
            if (state.dataLoaded == false || alertTypeId != state.alertTypeId) {
                props.getAlertGraph({
                    type: "GET_ALERT_GRAPH",
                    payload: {
                        alertId: props.alertId!,
                        vehicleId: props.vehicleId!,
                        alertName: props.alertName!,
                        alertTypeId: alertTypeId
                    }
                })
                state.dataLoaded = true
            }
            state.alertTypeId = alertTypeId
        }
        console.log("graph in deri", props.graphs);

        state.data = props.graphs[alertTypeId!]
        // state.data = lowMileageData
        return state
    }
    render() {
        // console.log("Low Milage alerts", this.state, this.props.alertId)
        console.log("graph in alert index  ", this.state.alertTypeId, this.state.data);

        switch (this.state.alertTypeId) {
            //voltage deviation graph

            case 1: {
                return <CellBatteryGraph data={this.state.data} title="12 Cell Battery Pack Info:" dataKey="name"
                    barDataKey="value" minL1={3.731} maxL2={3.881} alertCleared={this.props.alertCleared} />
            }
            //vehicle idle active
            case 2: {
                return <StackedGraph data={this.state.data} dataKey="timeDate"
                    title="Vehicle Usage Graph (Active Vs Idle):" xAxisLabel="Days" yAxisLabel="Usage (in Hrs)"
                    alertCleared={this.props.alertCleared} alertDate={this.props.alertDate}
                    bar1Key="activeTime" bar2Key="idleTime"
                    bar1Name="Active Time" bar2Name="Idle Time"
                    bar1StrokeColor="#4888ff" bar2StrokeColor="#5A5BA0" L1={false} />
            }
            case 3: {
                return <DoubleLineGraph dataKey="timeDate" data={this.state.data}
                    L1={true} L2={true}
                    title="Battery Temperature:" alertCleared={this.props.alertCleared}
                    line1Key="chrgTemp" line2Key="abintTemp"
                    line1Name='Charging Temp' line2Name='Ambient Temp'
                    line1StrokeColor="#4aa7cf" line2StrokeColor="#f3cd58"
                    refColor="green" xAxisLabel="Time" yAxisLabel="Temperature (`C)" />
            }
            case 4: {
                return <SingleLineGraph data={this.state.data} dataKey="timeDate"
                    L1={true} title="Battery Voltage Trend"
                    line1Key="batteryPackVoltage" line1Name='Battery Pack Voltage' refColor="green"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Voltage" alertCleared={this.props.alertCleared}
                />
            }
            //High charging temperature l1
            case 5: {
                return <DualAxisLineGraph title="Charging Temperature Trend"
                    dataKey="timeDate" data={this.state.data} L1={true}
                    line1Key="current" line2Key="chargingTemp"
                    line1Name='Current' line2Name='Charging Temperature (T1 or T2)'
                    line1StrokeColor="#D48D4F" line2StrokeColor="#4aa7cf" alertCleared={this.props.alertCleared}
                    refColor="4bfc38" xAxisLabel="Time" yAxisLabel="Temperature `C" rightYaxisLabel="Current (A)" />
            }
            case 6: {
                return <SingleLineGraph data={this.state.data} dataKey="timeDate" L1={true}
                    title="Charging Current Trend"
                    line1Key="chargOverCurnt" line1Name='Charge Over Current' refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Current (A)" alertCleared={this.props.alertCleared}
                />
            }
            case 7: {
                return <SingleLineGraph data={this.state.data} dataKey="timeDate" L1={true} title="Soc Trend"
                    line1Key="soc" line1Name="Soc" refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="SOC" alertCleared={this.props.alertCleared}
                />
            }
            case 8: {
                return <SingleLineGraph data={this.state.data} dataKey="timeDate" L1={true}
                    title="Battery Temperature Difference Trend"
                    line1Key="deltaTemp" line1Name="Delta Temperature (T1-T2)" refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Temperature (`C)" alertCleared={this.props.alertCleared}
                />
            }
            case 9: {
                return <SingleLineGraph data={this.state.data} dataKey="timeDate" title="Speed Trend"
                    line1Key="speed" line1Name="Average Speed" refColor="#e3e6e8" L1={false}
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Speed (Km)" alertCleared={this.props.alertCleared}
                />
            }
            case 10: {
                return <DoubleLineGraph data={this.state.data} dataKey="nocycles" line1Key="amilage" line2Key="smilage" title="Low Mileage"
                    line2Name='Actual Mileage' line1Name='Specified Mileage' line1StrokeColor="#79a45b" line2StrokeColor="#4aa7cf"
                    refColor="green" xAxisLabel="No of Cycles" yAxisLabel="Mileage (Km)" L1={false} L2={false} alertCleared={this.props.alertCleared} />
            }
            default: {
                return <div>Nothing</div>
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertGraph);

const volatgeDeviationData = {
    "cell1": 3.9,
    "cell2": 3.752,
    "cell3": 3.753,
    "cell4": 3.754,
    "cell5": 3.755,
    "cell6": 3.75,
    "cell7": 3.751,
    "cell8": 3.450,
    "cell9": 3.333,
    "cell10": 4.100,
    "cell11": 3.759,
    "cell12": 3.520,
    "volatgeDiffer": 0.9
}

const vehicleUsageData = [
    {
        "timeDate": "2020-07-25",
        "activeTime": 10,
        "idleTime": 14
    },
    {
        "timeDate": "2020-07-23",
        "activeTime": 20,
        "idleTime": 4
    },
    {
        "timeDate": "2020-07-24",
        "activeTime": 5,
        "idleTime": 19
    },
    {
        "timeDate": "2020-07-26",
        "activeTime": 0,
        "idleTime": 24,
        "alert": 1
    },
    {
        "timeDate": "2020-07-22",
        "activeTime": 24,
        "idleTime": 0,
    },
]

const batteryTempData = [
    {
        "timeDate": "2020-07-24 10:30:00",
        "chrgTemp": 20,
        "abintTemp": 15,
        "L1": 45,
        "L2": 50
    },
    {
        "timeDate": "2020-07-25 12:00:00",
        "chrgTemp": 45,
        "abintTemp": 25,
        "L1": 45,
        "L2": 50
    },
    {
        "timeDate": "2020-07-26 11:00:00",
        "chrgTemp": 10,
        "abintTemp": 35,
        "L1": 45,
        "L2": 50
    },
    {
        "timeDate": "2020-07-27 12:00:00",
        "chrgTemp": 45,
        "abintTemp": 25,
        "L1": 45,
        "L2": 50
    }
]

const voltageTrendData = [
    {
        "timeDate": "2020-07-24 10:30:00",
        "batteryPackVoltage": 34,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 11:00:00",
        "batteryPackVoltage": 60,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 12:00:00",
        "batteryPackVoltage": 37,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 13:00:00",
        "batteryPackVoltage": 30,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 14:00:00",
        "batteryPackVoltage": 20,
        "L1": 55
    },
]

const chargingTrendData = [
    {
        "timeDate": "2020-07-25 09:30:00",
        "current": 20,
        "chargingTemp": 50,
        "L1": 45
    },
    {
        "timeDate": "2020-07-25 10:00:00",
        "current": 30,
        "chargingTemp": 60,
        "L1": 45
    },
    {
        "timeDate": "2020-07-25 11:30:00",
        "current": 40,
        "chargingTemp": 70,
        "L1": 45
    }
]

const chargeOverTrendData = [
    {
        "timeDate": "2020-07-24 10:30:00",
        "chargOverCurnt": 10,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 11:00:00",
        "chargOverCurnt": 20,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 12:00:00",
        "chargOverCurnt": 30,
        "L1": 55
    }
]

const socData = [
    {
        "timeDate": "2020-07-24 10:30:00",
        "soc": 10,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 11:00:00",
        "soc": 20,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 12:00:00",
        "soc": 30,
        "L1": 55
    }
]

const batteryDiffData = [
    {
        "timeDate": "2020-07-24 10:30:00",
        "deltaTemp": 5,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 11:00:00",
        "deltaTemp": 7,
        "L1": 55
    },
    {
        "timeDate": "2020-07-24 12:00:00",
        "deltaTemp": 9,
        "L1": 55
    }
]

const speedData = [
    {
        "timeDate": "2020-07-24 10:30:00",
        "speed": 5
    },
    {
        "timeDate": "2020-07-24 11:00:00",
        "speed": 7
    },
    {
        "timeDate": "2020-07-24 12:00:00",
        "speed": 9
    }
]


const lowMileageData = [
    { nocycles: 0, amilage: 30, smilage: 39, },
    { nocycles: 100, amilage: 39, smilage: 30, },
    { nocycles: 200, amilage: 15, smilage: 20, },
    { nocycles: 300, amilage: 35, smilage: 15, },
    { nocycles: 400, amilage: 13, smilage: 19, },
    { nocycles: 500, amilage: 39, smilage: 29, },
    { nocycles: 600, amilage: 14, smilage: 31, },
    { nocycles: 700, amilage: 20, smilage: 15, },
    { nocycles: 800, amilage: 26, smilage: 22, },
    { nocycles: 900, amilage: 25, smilage: 35, },
    { nocycles: 1000, amilage: 15, smilage: 40, },
    { nocycles: 1100, amilage: 12, smilage: 12, },
    { nocycles: 1200, amilage: 40, smilage: 20, },
];
