import './index.scss';
import React, { PureComponent } from 'react';
import CellBatteryGraph from "./cell-battery-graph"
import {
    mapDispatchToProps, mapStateToProps, ReduxAlertGraphActions,
    ReduxAlertGraphState
} from '../../../connectm-client/actions/graph';
import { connect } from 'react-redux';
import { getAlertTypeId } from '../../../connectm-client/util/alert-graph';
//Store will register all graph type data
import DoubleLineGraph from "./double-line";

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
        const alertTypeId = getAlertTypeId(props.alertName!.replace(/[^a-zA-Z]/g, "").toLocaleLowerCase())
        if (state.dataLoaded == false) {
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
        state.data = props.graphs[alertTypeId]
        state.alertTypeId = alertTypeId
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
                return <CellBatteryGraph />
            }
            case 3: {
                return <CellBatteryGraph />
            }
            case 4: {
                return <CellBatteryGraph />
            }
            case 5: {
                return <CellBatteryGraph />
            }
            case 6: {
                return <CellBatteryGraph />
            }
            case 7: {
                return <CellBatteryGraph />
            }
            case 8: {
                return <CellBatteryGraph />
            }
            case 9: {
                return <CellBatteryGraph />
            }
            case 10: {
                // return <GraphSelector graphType="double" />
                return <DoubleLineGraph data={this.state.data} />
            }
            default: {
                return <div>Nothing</div>
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertGraph);