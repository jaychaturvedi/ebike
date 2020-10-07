import './index.scss';
import React, { PureComponent } from 'react';
import { Breadcrumb, Typography } from 'antd';
import AlertDetailSingle from "./alert-detail-single"
import AlertInsights from "./alert-additional-insights"
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
    activeAlertType: string
    alertCleared: boolean
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
            activeAlertType: "N/A",
            alert: alertLimpData(),
            alertCleared: false
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
        state.activeAlertType = state.alertType === "smart" ?
            "Smart Alerts" : state.alertType === "bms" ?
                "BMS Alerts" : "Motor Controller Alerts"
        if (state.alert === undefined || Object.keys(state.alert).length === 0) {
            //get single alert detail
            // state.alert = alertLimpData()
            props.getSingleAlertDetail({
                type: "GET_SINGLE_ALERT",
                payload: {
                    alertId: state.alertId,
                    alertType: state.alertType
                }
            })
        }
        state.alert = state.alert === undefined ? alertLimpData() : props.alerts[state.alertType][state.alertId]
        return state
    }

    alertCleared = (alertCleared: boolean) => {
        this.setState({ alertCleared: alertCleared })
    }

    getAlertClearedState = (alertCleared: boolean): boolean => {
        return this.state.alertCleared
    }

    goToHome = () => {
        this.props.navigation({
            type: "RESET_ALERT_MAIN_PAGE",
            payload: {
                alertId: Number(this.state.alertId),
                alertName: "",
                alertType: "smart",
                pagination: {
                    pageNumber: 1,
                    pageSize: 10
                },
                sort: {
                    direction: "descend",
                    fieldName: "alertTime"
                },
                comment: "",
                customerId: "",
                vehicleID: ""
            }
        })
    }

    goToAlert = () => {
        this.props.navigation({
            type: "RESET_ALERT_MAIN_PAGE",
            payload: {
                alertId: Number(this.state.alertId),
                alertName: "",
                alertType: this.state.alertType,
                pagination: {
                    pageNumber: 1,
                    pageSize: 10
                },
                sort: {
                    direction: "descend",
                    fieldName: "alertTime"
                },
                comment: "",
                customerId: "",
                vehicleID: ""
            }
        })
    }
    render() {
        return (
            <div className="connectm-AlertDetail">
                <Breadcrumb separator=">" className={"connectm-breadcrum"}>
                    <Breadcrumb.Item href=""><Link to={"/alerts"} className="link" onClick={this.goToHome}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item href="" ><Link to={"/alerts"} className="link" onClick={this.goToAlert}><span>{this.state.activeAlertType}</span></Link></Breadcrumb.Item>
                    <Breadcrumb.Item href={""} ><span className={"breadcrum-active"}>Alert Details</span></Breadcrumb.Item>
                </Breadcrumb>
                <div className={"connectm-alert-detail-container"}>
                    <div className={"alert-top-container"}>
                        <AlertDetailSingle alertId={this.state.alertId} alertType={this.state.alertType} alertCleared={this.alertCleared} />
                        <AlertGraph alertName={this.state.alert.alertName} clearAlertState={this.getAlertClearedState}
                            vehicleId={"12324"} alertCleared={this.state.alertCleared} alertId={Number(this.state.alertId)} alertDate={this.state.alert.alertTime} />
                    </div>
                    <div className={"alert-bottom-container"}>
                        <div className={"alert-bottom-content-left"}>
                            <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong className="additional-insights-text">ADDITIONAL INSIGHTS</Typography.Text>
                            </div>
                            <AlertInsights alertId={this.state.alertId} alertType={this.state.alertType} />
                        </div>
                        <div className={"alert-bottom-content-right"}>
                            {/* <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>PAST ALERTS</Typography.Text>
                            </div> */}
                            <AlertPastTable alertId={this.state.alertId} alertType={this.state.alertType} alertCleared={this.state.alertCleared}
                                alertName={this.state.alert.alertName}
                                vehicleId={this.state.alert.frameId} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDetail);