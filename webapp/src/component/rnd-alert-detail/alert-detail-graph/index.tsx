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
    alertTypeId:number,
    alertCode:string,
    clearAlertState: Function
}

interface AlertGraphStates {
    dataLoaded: boolean
    alertTypeId: number,
    data: any,
    clearAlertState: boolean,
    alertTime:string

}

class AlertGraph extends PureComponent<AlertGraphProps, AlertGraphStates> {
    constructor(props: AlertGraphProps) {
        super(props)
        this.state = {
            dataLoaded: false,
            alertTypeId: 0,
            data: {},
            clearAlertState: props.clearAlertState(),
            alertTime:""
        }
    }
    componentWillUnmount() {
      const props = this.props
      props.clearAlertGraph({
        type: "CLEAR_ALERT_GRAPH_DATA",
        payload: {
            alertTypeId: props.alertTypeId
        }
    })
    }

    static getDerivedStateFromProps(props: AlertGraphProps, state: AlertGraphStates) {
        // let alertTypeId: number
        if (props?.alertName !== undefined) {
            // alertTypeId = getAlertTypeId(props.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase())
            if (state.dataLoaded === false || props.alertTypeId !== state.alertTypeId) {
                props.getAlertGraph({
                    type: "GET_ALERT_GRAPH",
                    payload: {
                        alertId: props.alertId!,
                        vehicleId: props.vehicleId!,
                        alertName: props.alertName!,
                        alertTypeId: props.alertTypeId,
                        timeStamp: props.alertDate,
                        alertCode: props.alertCode
                    }
                })
                state.dataLoaded = true
            }
            state.alertTypeId = props.alertTypeId
        }
        // console.log("component alert detail graph props and state", props,state);
        ///////// props.graphs[state.alertTypeId!] is storing graph data as { alertTime:"", data:[]}/////////
        state.data = props.graphs[state.alertTypeId!]?.data
        state.alertTime = props.graphs[state.alertTypeId!]?.alertTime
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
          xAxisLabel="Days" 
          yAxisLabel="Usage (in Hrs)"
          bar1Key="activeTime"
          bar2Key="idleTime"
          bar1Name="Active Time"
          bar2Name="Idle Time"
          bar1StrokeColor="#8599FE"
          bar2StrokeColor="#5A5BA0" 
          L1={false} 
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 3: {
        return <DoubleLineGraph
          dataKey="timeDate"
          data={this.state.data}
          L1={true}
          L2={true}
          title="Battery Temperature:"
          line1Key="chrgTemp"
          line2Key="abintTemp"
          line1Name='Charging Temp'
          line2Name='Ambient Temp'
          line1StrokeColor="#4aa7cf"
          line2StrokeColor="#f3cd58"
          refColor="green"
          xAxisLabel="Time"
          yAxisLabel="Temperature (`C)" 
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 4: {
        return <SingleLineGraph
          data={this.state.data}
          dataKey="timeDate"
          L1={true}
          title="Battery Voltage Trend"
          line1Key="batteryPackVoltage"
          line1Name='Battery Pack Voltage'
          refColor="green"
          line1StrokeColor="#4aa7cf"
          xAxisLabel="Time"
          yAxisLabel="Voltage"
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      //High charging temperature l1
      case 5: {
        return <DualAxisLineGraph
          title="Charging Temperature Trend"
          dataKey="timeDate"
          L1={true}
          L1Value={30}
          line1Key="current"
          line2Key="chargingTemp"
          line1Name='Current'
          line2Name='Charging Temperature (T1 or T2)'
          line1StrokeColor="#D48D4F"
          line2StrokeColor="#4aa7cf"
          refColor="green"
          xAxisLabel="Time"
          yAxisLabel="Temperature `C"
          rightYaxisLabel="Current (A)" 
          data={this.state.data}
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 6: {
        return <SingleLineGraph
          title="Charging Current Trend"
          dataKey="timeDate" 
          L1={true}
          line1Key="chargOverCurnt"
          line1Name='Charge Over Current'
          line1StrokeColor="#4aa7cf"
          refColor="#e3e6e8"
          xAxisLabel="Time"
          yAxisLabel="Current (A)"
          data={this.state.data}
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 7: {
        return <SingleLineGraph 
          title="Soc Trend"
          dataKey="timeDate"
          L1={true}
          line1Key="soc"
          line1Name="Soc"
          line1StrokeColor="#4aa7cf"
          refColor="#e3e6e8"
          xAxisLabel="Time"
          yAxisLabel="SOC"
          data={this.state.data}
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 8: {
        return <SingleLineGraph 
          title="Battery Temperature Difference Trend" 
          dataKey="timeDate" 
          L1={true}
          line1Key="deltaTemp" 
          line1Name="Delta Temperature (T1-T2)" 
          line1StrokeColor="#4aa7cf" 
          refColor="#e3e6e8"
          xAxisLabel="Time" 
          yAxisLabel="Temperature (`C)" 
          data={this.state.data} 
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 9: {
        return <SingleLineGraph 
          title="Speed Trend"
          dataKey="timeDate" 
          L1={false} 
          line1Key="speed" 
          line1Name="Average Speed" 
          line1StrokeColor="#4aa7cf" 
          refColor="#e3e6e8" 
          xAxisLabel="Time" 
          yAxisLabel="Speed (Km)" 
          data={this.state.data} 
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 10: {
        return <DoubleLineGraph 
          title="Low Mileage"
          dataKey="nocycles" 
          L1={false} 
          L2={false} 
          line1Key="amilage" 
          line2Key="smilage" 
          line1Name='Specified Mileage'
          line2Name='Actual Mileage' 
          line1StrokeColor="#79a45b" 
          line2StrokeColor="#4aa7cf" 
          refColor="green" 
          xAxisLabel="No of Cycles" 
          yAxisLabel="Mileage (Km)" 
          data={this.state.data} 
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared} />
      }
      case 999: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={false}
          // L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
          line1Key="primaryValue" 
          line1Name={this.props.graphs[this.state.alertTypeId!]?.primaryLegend}
          line1StrokeColor="#4aa7cf" 
          refColor="#e3e6e8"
          xAxisLabel={this.props.graphs[this.state.alertTypeId!]?.xAxis}
          yAxisLabel={this.props.graphs[this.state.alertTypeId!]?.primaryYAxis}
          data={this.state.data} 
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      // case 999:{
      //   return <DualAxisLineGraph
      //     title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
      //     dataKey="timeDate"
      //     L1={true}
      //     L1Value={this.props.graphs[this.state.alertTypeId!]?.threshold}
      //     line1Key="value1"
      //     line2Key="value2"
      //     line1Name={this.state.data?.length?this.state.data[0]["param1"]:"common alerts"}
      //     line2Name={this.state.data?.length?this.state.data[0]["param2"]:"common alerts"}
      //     line1StrokeColor="#D48D4F"
      //     line2StrokeColor="#4aa7cf"
      //     refColor="green"
      //     xAxisLabel="Time"
      //     yAxisLabel={this.props.graphs[this.state.alertTypeId!]?.yAxisLabel1}
      //     rightYaxisLabel={this.props.graphs[this.state.alertTypeId!]?.yAxisLabel2} 
      //     data={this.state.data}
      //     alertDate={this.state.alertTime}
      //     alertCleared={this.props.alertCleared}
      //   />
      // }
      default: {
        return <div>No graph available for alert name</div>
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertGraph);
