import './index.scss';
import React, { PureComponent } from 'react';
import { Breadcrumb, Typography } from 'antd';
import AlertDetailSingle from "./alert-detail-single"
import AlertInsights from "./alert-additional-insights"
import LineGraph from "./alert-detail-graph/line-graph"
import CellBatteryGraph from "./alert-detail-graph/cell-battery-graph"
import StackedBarGraph from "./alert-detail-graph/stacked-bar"
import {
    ReduxAlertDetailActions, ReduxAlertDetailState,
    mapDispatchToProps, mapStateToProps
} from "../../connectm-client/actions/alert-detail"
import AlertPastTable from "./alert-past-table"

import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import AlertGraph from './alert-detail-graph'
import { TAlertsTableData } from '../../connectm-client/saga/alert';
import { AlertData, TAlertType } from '../../connectm-client/redux/models';
import { alertLimpData } from '../../connectm-client/redux/connectm-state';

interface AlertDetailProps extends ReduxAlertDetailActions, ReduxAlertDetailState, RouteComponentProps { }

interface AlertDetailStates {
    alertId: string
    alert: AlertData
    alertType: TAlertType
    activeAlertType : string
}
//Smart Alerts
//BMS Alerts
//Motor Controller Alerts
class AlertDetail extends PureComponent<AlertDetailProps, AlertDetailStates> {
    constructor(props: AlertDetailProps) {
        super(props)
        this.state = {
            alertId: "",
            alertType: "smart",
            activeAlertType : "N/A",
            alert: alertLimpData()
        }
    }
    static getDerivedStateFromProps(props: AlertDetailProps, state: AlertDetailStates) {
        // props.getAlertTrends({
        //     type : "GET_ALERT_TRENDS"
        // })
        const pathNames = props.location.pathname.split('/')
        state.alertType = pathNames[1] as TAlertType
        state.alertId = pathNames[2]
        state.alert = props.alerts[state.alertType][state.alertId]
        state.activeAlertType = state.alertType == "smart" ?
            "Smart Alerts" : state.alertType == "bms" ?
                "BMS Alerts" : "Motor Controller Alerts"
        if (state.alert == undefined || Object.keys(state.alert).length == 0) {
            //get single alert detail
            state.alert = alertLimpData()
        }
        return state
    }

    render() {
        return (
            <div className="connectm-AlertDetail">
                <Breadcrumb separator=">" className={"connectm-breadcrum"}>
                    <Breadcrumb.Item href=""><Link to={"/"} className="link">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item href="" ><Link to={"/"} className="link"><span>{this.state.activeAlertType}</span></Link></Breadcrumb.Item>
                    <Breadcrumb.Item href={""} ><span className={"breadcrum-active"}>Alert Details</span></Breadcrumb.Item>
                </Breadcrumb>
                <div className={"connectm-alert-detail-container"}>
                    <div className={"alert-top-container"}>
                        <AlertDetailSingle alertId={this.state.alertId} alertType={this.state.alertType}/>
                        <AlertGraph alertName={this.state.alert.alertName}
                            vehicleId={"12324"} alertCleared={false} alertId={Number(this.state.alertId)} />
                    </div>
                    <div className={"alert-bottom-container"}>
                        <div className={"alert-bottom-content-left"}>
                            <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>ADDITIONAL INSIGHTS</Typography.Text>
                            </div>
                            <AlertInsights alertId={this.state.alertId} alertType={this.state.alertType}/>
                        </div>
                        <div className={"alert-bottom-content-right"}>
                            {/* <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>PAST ALERTS</Typography.Text>
                            </div> */}
                            <AlertPastTable alertId={this.state.alertId} alertType={this.state.alertType} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDetail);