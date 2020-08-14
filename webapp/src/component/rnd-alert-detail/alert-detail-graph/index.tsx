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
    alertCleared?: boolean
}

interface AlertGraphStates {
    dataLoaded: boolean
    alertTypeId: number,
    data: any,
}

class AlertGraph extends PureComponent<AlertGraphProps, AlertGraphStates> {
    constructor(props: AlertGraphProps) {
        super(props)
        this.state = {
            dataLoaded: false,
            alertTypeId: 0,
            data: {},
        }
    }

    static getDerivedStateFromProps(props: AlertGraphProps, state: AlertGraphStates) {
        let alertTypeId: number
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
        state.data = props.graphs[alertTypeId!]
        return state
    }
    render() {
        console.log("Low Milage alerts", this.state, this.props.alertId)
        console.log("switch case ", this.state.alertTypeId, this.state.data);

        switch (this.state.alertTypeId) {
            case 1: {
                return <CellBatteryGraph />
            }
            case 2: {
                return <StackedGraph data={this.state.data} />
            }
            case 3: {
                return <DoubleLineGraph dataKey="nocycles" data={this.state.data} L1={25} L2={35} title="Battery Temperature"
                    line1Key="amilage" line2Key="smilage"
                    line1Name='Charging Temp' line2Name='Ambient Temp'
                    line1StrokeColor="#4aa7cf" line2StrokeColor="#f3cd58"
                    refColor="green" xAxisLabel="Time" yAxisLabel="Temperature (C)" />
            }
            case 4: {
                return <SingleLineGraph data={this.state.data} dataKey="nocycles" L1={35} title="Battery Voltage Trend"
                    line1Key="smilage" line1Name='Battery Pack Voltage' refColor="green"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Voltage"
                />
            }
            case 5: {
                return <DualAxisLineGraph dataKey="name" data={this.state.data} L1={25} title="Charging Temperature Trend"
                    line1Key="uv" line2Key="pv"
                    line1Name='Current' line2Name='Charging Temperature (T1 or T2)'
                    line1StrokeColor="#D48D4F" line2StrokeColor="#79a45b"
                    refColor="green" xAxisLabel="Time" yAxisLabel="Temperature 'C" rightYaxis={true} rightYaxisLabel="Current (A)" />
            }
            case 6: {
                return <SingleLineGraph data={this.state.data} dataKey="nocycles" L1={30} title="Charging Current Trend"
                    line1Key="smilage" line1Name='Charge Over Current' refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Current (A)"
                />
            }
            case 7: {
                return <SingleLineGraph data={this.state.data} dataKey="nocycles" L1={25} title="Soc Trend"
                    line1Key="smilage" line1Name="Soc" refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="SOC"
                />
            }
            case 8: {
                return <SingleLineGraph data={this.state.data} dataKey="nocycles" L1={25} title="Battery Temperature Difference Trend"
                    line1Key="smilage" line1Name="Delta Temperature (T1-T2)" refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Temperature (C)"
                />
            }
            case 9: {
                return <SingleLineGraph data={this.state.data} dataKey="nocycles" L1={25} title="Speed Trend"
                    line1Key="smilage" line1Name="Average Speed" refColor="#e3e6e8"
                    line1StrokeColor="#4aa7cf" xAxisLabel="Time" yAxisLabel="Speed (Km)"
                />
            }
            case 10: {
                // return <GraphSelector graphType="double" />
                return <DoubleLineGraph data={this.state.data} dataKey="nocycles" line1Key="amilage" line2Key="smilage" title="Low Mileage"
                    line2Name='Actual Mileage' line1Name='Specified Mileage' line1StrokeColor="#79a45b" line2StrokeColor="#4aa7cf"
                    refColor="green" xAxisLabel="No. of cycle" yAxisLabel="Mileage in Km" />
            }
            default: {
                return <div>Nothing</div>
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertGraph);