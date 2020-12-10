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
        console.log("component alert detail graph props and state", props,state);
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
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="name"
          barDataKey="value"
          minL1={3.051}
          maxL2={3.885}
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
          dataKey="xAxisValue"
          data={this.state.data}
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
          L2={this.props.graphs[this.state.alertTypeId!]?.secondaryLimit}
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          line1Key="primaryValue" 
          line2Key="secondaryValue"
          line1Name={this.props.graphs[this.state.alertTypeId!]?.primaryLegend}
          line2Name={this.props.graphs[this.state.alertTypeId!]?.secondaryLegend}
          line1StrokeColor="#4aa7cf"
          line2StrokeColor="#f3cd58"
          refColor="green"
          xAxisLabel={this.props.graphs[this.state.alertTypeId!]?.xAxis}
          yAxisLabel={this.props.graphs[this.state.alertTypeId!]?.primaryYAxis}
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 4: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
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
      //High charging temperature l1
      case 5: {
        return <DualAxisLineGraph
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
          line1Key="primaryValue"
          line2Key="secondaryValue"
          line1Name={this.props.graphs[this.state.alertTypeId!]?.primaryLegend}
          line2Name={this.props.graphs[this.state.alertTypeId!]?.secondaryLegend}
          line1StrokeColor="#D48D4F"
          line2StrokeColor="#4aa7cf"
          refColor="green"
          xAxisLabel={this.props.graphs[this.state.alertTypeId!]?.xAxis}
          yAxisLabel={this.props.graphs[this.state.alertTypeId!]?.primaryYAxis}
          rightYaxisLabel={this.props.graphs[this.state.alertTypeId!]?.secondaryYAxis} 
          data={this.state.data}
          alertDate={this.state.alertTime}
          alertCleared={this.props.alertCleared}
        />
      }
      case 6: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
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
      case 7: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
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
      case 8: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
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
      case 9: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
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
      case 10: {
        return <DoubleLineGraph 
        dataKey="xAxisValue"
        data={this.state.data}
        L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
        L2={this.props.graphs[this.state.alertTypeId!]?.secondaryLimit}
        title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
        line1Key="primaryValue" 
        line2Key="secondaryValue"
        line1Name={this.props.graphs[this.state.alertTypeId!]?.primaryLegend}
        line2Name={this.props.graphs[this.state.alertTypeId!]?.secondaryLegend}
        line1StrokeColor="#4aa7cf"
        line2StrokeColor="#f3cd58"
        refColor="green"
        xAxisLabel={this.props.graphs[this.state.alertTypeId!]?.xAxis}
        yAxisLabel={this.props.graphs[this.state.alertTypeId!]?.primaryYAxis}
        alertDate={this.state.alertTime}
        alertCleared={this.props.alertCleared}
        />
      }
      case 999: {
        return <SingleLineGraph 
          title={this.props.graphs[this.state.alertTypeId!]?.graphTitle}
          dataKey="xAxisValue"
          L1={this.props.graphs[this.state.alertTypeId!]?.primaryLimit? true :false}
          L1Value={this.props.graphs[this.state.alertTypeId!]?.primaryLimit}
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
