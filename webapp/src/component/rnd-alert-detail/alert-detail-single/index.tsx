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
interface AlertDetailSingleProps extends ReduxAlertDetailActions, ReduxAlertDetailState {
    alertId: string,
    alertType: TAlertType
}

interface AlertDetailSingleStates {
    clearanceComment: string;
    clearBoxToggle: boolean;
    alert: AlertData
}

class AlertDetailSingle extends PureComponent<AlertDetailSingleProps, AlertDetailSingleStates> {

    constructor(props: AlertDetailSingleProps) {
        super(props);
        this.state = {
            clearanceComment: "",
            clearBoxToggle: false,
            alert: alertLimpData()
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
                alertType: this.props.alertType ,
                comment: this.state.clearanceComment,
                customerId: this.state.alert.customerId,
                pagination: { pageNumber: -1, pageSize: -1 },
                sort: { fieldName: "", direction: 'ascend' },
                vehicleID: this.state.alert.frameId
            }
        })
        this.setState({
            clearBoxToggle: false,
        })
    }

    initiateClearAlert = () => {
        this.setState({
            clearBoxToggle: !this.state.clearBoxToggle,
            clearanceComment: ""
        })
    }

    render() {
        const clearAlert = (
            <Menu style={{ left: "-25%", backgroundColor: "#272B3C" }} className={"clear-alert-container"}>
                <Menu.Item key="1" disabled={true}>
                    <Typography.Text >Alert Clearance</Typography.Text>
                    <Input.TextArea rows={4} placeholder={"Enter Comments..."} onChange={this.onChange} value={this.state.clearanceComment} />
                    <Button className={"dropdown-clear-alert-button"} onClick={this.clearAlert}>
                        <Typography.Text style={{ color: "black" }} strong>Clear Alert</Typography.Text>
                    </Button>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="connectm-AlertDetailSingle">
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Alert Name:</div>
                    <div className={"single-cell-right"}>{this.state.alert.alertName}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Alert Time:</div>
                    <div className={"single-cell-right"}>{formatTime(this.state.alert.alertTime)}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Open Since:</div>
                    <div className={"single-cell-right toolate"}>{formatHourMin(this.state.alert.openSince)}</div>
                </div>
                <div className={"single-row"}>
                    <Dropdown overlay={clearAlert} trigger={['click']} visible={this.state.clearBoxToggle}>
                        <Button className={"clear-alert-button"} onClick={this.initiateClearAlert} >
                            <Typography.Text style={{ color: "black" }} strong>CLEAR ALERT</Typography.Text>
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