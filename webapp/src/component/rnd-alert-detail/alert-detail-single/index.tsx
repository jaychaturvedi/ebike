import './index.scss';
import { Button, Typography, Modal, Dropdown, Menu } from "antd";
import React, { PureComponent } from 'react';
import { AnyCnameRecord } from 'dns';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    ReduxAlertDetailActions, ReduxAlertDetailState,
    mapDispatchToProps, mapStateToProps
} from "../../../connectm-client/actions/alert-detail"
import { AlertData, TAlertType } from '../../../connectm-client/redux/models';
import { formatTime, formatHourMin, formatDate } from '../../../connectm-client/util/time-formater'
import { alertLimpData } from '../../../connectm-client/redux/connectm-state';
import { ReduxAlertGraphActions } from '../../../connectm-client/actions/graph';
interface AlertDetailSingleProps extends ReduxAlertDetailActions, ReduxAlertDetailState {
    alertId: string,
    alertType: TAlertType,
    alertCleared: Function
}

interface AlertDetailSingleStates {
    clearanceComment: string;
    clearBoxToggle: boolean;
    alert: AlertData
    alertCleared: boolean
    toolLateTime: number
}

class AlertDetailSingle extends PureComponent<AlertDetailSingleProps, AlertDetailSingleStates> {

    constructor(props: AlertDetailSingleProps) {
        super(props);
        this.state = {
            clearanceComment: "",
            clearBoxToggle: false,
            alert: alertLimpData(),
            alertCleared: false,
            //assumed constant value must be changed
            toolLateTime: 24
        }
    }

    static getDerivedStateFromProps(props: AlertDetailSingleProps, state: AlertDetailSingleStates) {
        const alert = props.alerts[props.alertType][props.alertId]
        if (alert) {
            state.alert = alert
        }
        return state
    }

    onChange = (e: any) => {
        this.setState({ clearanceComment: e.target.value });
    };

    clearAlert = () => {
        this.props.postAlertClearanceComment({
            type: "POST_ALERT_CLEARANCE",
            payload: {
                alertId: Number(this.props.alertId),
                alertName: this.state.alert.alertName,
                alertType: this.props.alertType,
                comment: this.state.clearanceComment,
                customerId: this.state.alert.customerId,
                pagination: { pageNumber: -1, pageSize: -1 },
                sort: { fieldName: "", direction: 'ascend' },
                vehicleID: this.state.alert.frameId
            }
        })
        this.setState({
            clearBoxToggle: false,
            alertCleared: true
        })
        // this.props.clearAlertGraph({
        //     type: "CLEAR_ALERT_GRAPH",
        //     payload: {
        //         alertName: this.state.alert.alertName
        //     }
        // })
        this.props.alertCleared(true)
        this.props.getPastAlerts({
            type: "GET_PAST_ALERTS",
            payload: {
                alertId: Number(this.state.alert.alertId),
                alertName: this.state.alert.alertName,
                alertType: this.props.alertType,
                customerId: this.state.alert.customerId,
                vehicleID: this.state.alert.frameId,
                pagination: {
                    pageNumber: 1,
                    pageSize: 10
                },
                sort: {
                    fieldName: "alertTime",
                    direction: "descend"
                },
                comment: "",
            }
        })
    }

    initiateClearAlert = () => {
        this.setState({
            clearBoxToggle: !this.state.clearBoxToggle,
            clearanceComment: ""
        })
    }
    getOpenAlertHoursClass = () => {
        const splitHours = this.state.alert.openSince.split(':')
        if (splitHours.length > 0) {
            return Number(splitHours[0]) > this.state.toolLateTime ? "toolate" : ""
        }
        return ""
    }
    render() {
        const clearAlert = (
            <Menu style={{ left: "-25%", backgroundColor: "#272B3C" }} className={"clear-alert-container"}>
                <Menu.Item key="1" disabled={true}>
                    <Typography.Text >Alert Clearance</Typography.Text>
                    <Input.TextArea rows={4} placeholder={"Enter Comments..."} onChange={this.onChange} value={this.state.clearanceComment} />
                    <Button className={"dropdown-clear-alert-button"} onClick={this.clearAlert}>
                        <Typography.Text strong className="dropdown-clear-alert-text">Clear Alert</Typography.Text>
                    </Button>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="connectm-AlertDetailSingle">
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Alert Name:</div>
                    <div className={"single-cell-right"}>{this.state.alertCleared ? "N/A" : this.state.alert.alertName}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Alert Time:</div>
                    <div className={"single-cell-right"}>{formatTime(this.state.alert.alertTime)}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Open Since:</div>
                    <div className={`single-cell-right ${this.getOpenAlertHoursClass}`}>{this.state.alertCleared ? "N/A" : formatHourMin(this.state.alert.openSince)}</div>
                </div>
                <div className={"single-row"}>
                    <Dropdown overlay={clearAlert} trigger={['click']} visible={this.state.clearBoxToggle} disabled={this.state.alertCleared}>
                        <Button className={"clear-alert-button"} onClick={this.initiateClearAlert} disabled={this.state.alertCleared}>
                            <Typography.Text style={{ color: "black", }} strong className="clear-alert-text">CLEAR ALERT</Typography.Text>
                        </Button>
                    </Dropdown>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Vehicle ID:</div>
                    <div className={"single-cell-right"}><Link to={""} className={"detail-link"}>{this.state.alert.frameId}</Link></div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Model:</div>
                    <div className={"single-cell-right"}>{this.state.alert.model}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Mfg Date:</div>
                    <div className={"single-cell-right"}>{formatDate(this.state.alert.mfgDate)}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Battery ID:</div>
                    <div className={"single-cell-right"}><Link to={""} className={"detail-link"}>{this.state.alert.batteryId}</Link></div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Customer ID:</div>
                    <div className={"single-cell-right"}><Link to={""} className={"detail-link"}>{this.state.alert.customerId}</Link></div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Location:</div>
                    <div className={"single-cell-right"}>{this.state.alert.location}</div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDetailSingle);