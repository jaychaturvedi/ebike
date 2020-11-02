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
        if (props?.alertName !== undefined) {
            alertTypeId = getAlertTypeId(props.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase())
            if (state.dataLoaded === false || alertTypeId !== state.alertTypeId) {
                props.getAlertGraph({
                    type: "GET_ALERT_GRAPH",
                    payload: {
                        alertId: props.alertId!,
                        vehicleId: props.vehicleId!,
                        alertName: props.alertName!,
                        alertTypeId: alertTypeId,
                        timeStamp: props.alertDate
                    }
                })
                state.dataLoaded = true
            }
            state.alertTypeId = alertTypeId
        }
        console.log("component alert detail graph props", props);
        state.data = props.graphs[state.alertTypeId!]
        // state.data = lowMileageData
        return state
    }
  render() {
    switch (this.state.alertTypeId) {
      //voltage deviation graph
      case 1: {
        return <CellBatteryGraph
          data={this.state.data}
          title="12 Cell Battery Pack Info:"
          dataKey="name"
          barDataKey="value"
          minL1={3.731}
          maxL2={3.881}
          alertCleared={this.props.alertCleared}
        />
      }
      //vehicle idle active
      case 2: {
        return <StackedGraph
          data={this.state.data}
          dataKey="timeDate"
          title="Vehicle Usage (Active Vs Idle):"
          xAxisLabel="Days" yAxisLabel="Usage (in Hrs)"
          alertCleared={this.props.alertCleared}
          alertDate={this.props.alertDate}
          bar1Key="activeTime"
          bar2Key="idleTime"
          bar1Name="Active Time"
          bar2Name="Idle Time"
          bar1StrokeColor="#8599FE"
          bar2StrokeColor="#5A5BA0" L1={false} />
      }
      case 3: {
        return <DoubleLineGraph
          dataKey="timeDate"
          data={this.state.data}
          L1={true}
          L2={true}
          alertDate={this.props.alertDate}
          title="Battery Temperature:"
          alertCleared={this.props.alertCleared}
          line1Key="chrgTemp"
          line2Key="abintTemp"
          line1Name='Charging Temp'
          line2Name='Ambient Temp'
          line1StrokeColor="#4aa7cf"
          line2StrokeColor="#f3cd58"
          refColor="green"
          xAxisLabel="Time"
          yAxisLabel="Temperature (`C)" />
      }
      case 4: {
        return <SingleLineGraph
          data={this.state.data}
          dataKey="timeDate"
          L1={true}
          title="Battery Voltage Trend"
          alertDate={this.props.alertDate}
          line1Key="batteryPackVoltage"
          line1Name='Battery Pack Voltage'
          refColor="green"
          line1StrokeColor="#4aa7cf"
          xAxisLabel="Time"
          yAxisLabel="Voltage"
          alertCleared={this.props.alertCleared}
        />
      }
      //High charging temperature l1
      case 5: {
        return <DualAxisLineGraph
          title="Charging Temperature Trend"
          dataKey="timeDate"
          data={this.state.data}
          L1={true}
          line1Key="current"
          line2Key="chargingTemp"
          alertDate={this.props.alertDate}
          line1Name='Current'
          line2Name='Charging Temperature (T1 or T2)'
          line1StrokeColor="#D48D4F"
          line2StrokeColor="#4aa7cf"
          alertCleared={this.props.alertCleared}
          refColor="green"
          xAxisLabel="Time"
          yAxisLabel="Temperature `C"
          rightYaxisLabel="Current (A)" />
      }
      case 6: {
        return <SingleLineGraph
          data={this.state.data}
          dataKey="timeDate" L1={true}
          title="Charging Current Trend"
          alertDate={this.props.alertDate}
          line1Key="chargOverCurnt"
          line1Name='Charge Over Current'
          refColor="#e3e6e8"
          line1StrokeColor="#4aa7cf"
          xAxisLabel="Time"
          yAxisLabel="Current (A)"
          alertCleared={this.props.alertCleared}
        />
      }
      case 7: {
        return <SingleLineGraph 
        data={this.state.data} 
        dataKey="timeDate" L1={true} 
        title="Soc Trend"
          line1Key="soc" 
          line1Name="Soc" 
          refColor="#e3e6e8" 
          alertDate={this.props.alertDate}
          line1StrokeColor="#4aa7cf" 
          xAxisLabel="Time" 
          yAxisLabel="SOC" 
          alertCleared={this.props.alertCleared}
        />
      }
      case 8: {
        return <SingleLineGraph 
          data={this.state.data} 
          dataKey="timeDate" L1={true}
          title="Battery Temperature Difference Trend" 
          alertDate={this.props.alertDate}
          line1Key="deltaTemp" 
          line1Name="Delta Temperature (T1-T2)" 
          refColor="#e3e6e8"
          line1StrokeColor="#4aa7cf" 
          xAxisLabel="Time" 
          yAxisLabel="Temperature (`C)" 
          alertCleared={this.props.alertCleared}
        />
      }
      case 9: {
        return <SingleLineGraph 
          data={this.state.data} 
          dataKey="timeDate" 
          title="Speed Trend"
          line1Key="speed" 
          line1Name="Average Speed" 
          refColor="#e3e6e8" 
          L1={false} 
          alertDate={this.props.alertDate}
          line1StrokeColor="#4aa7cf" 
          xAxisLabel="Time" 
          yAxisLabel="Speed (Km)" 
          alertCleared={this.props.alertCleared}
        />
      }
      case 10: {
        return <DoubleLineGraph 
          data={this.state.data} 
          dataKey="nocycles" 
          line1Key="amilage" 
          line2Key="smilage" 
          title="Low Mileage"
          line2Name='Actual Mileage' 
          line1Name='Specified Mileage' 
          line1StrokeColor="#79a45b" 
          line2StrokeColor="#4aa7cf" 
          alertDate={this.props.alertDate}
          refColor="green" 
          xAxisLabel="No of Cycles" 
          yAxisLabel="Mileage (Km)" 
          L1={false} 
          L2={false} 
          alertCleared={this.props.alertCleared} />
      }
      default: {
        return <div>No graph available for alert name</div>
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertGraph);
