import "./index.scss";
import { Button, Typography, Dropdown, Menu } from "antd";
import React, { PureComponent } from "react";
import { AnyCnameRecord } from "dns";
import { Input } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import {
  ReduxAlertDetailActions,
  ReduxAlertDetailState,
  mapDispatchToProps,
  mapStateToProps,
} from "../../../connectm-client/actions/alert-detail";
import { AlertData, TAlertType } from "../../../connectm-client/redux/models";
import {
  formatTime,
  formatHourMin,
  formatDate,
  formatDateTime,
} from "../../../connectm-client/util/time-formater";
import { alertLimpData } from "../../../connectm-client/redux/connectm-state";
import moment from "moment";

interface AlertDetailSingleProps
  extends RouteComponentProps,
    ReduxAlertDetailActions,
    ReduxAlertDetailState {
  alertId: string;
  alertType: TAlertType;
  setAlertCleared: Function;
}

interface AlertDetailSingleStates {
  clearanceComment: string;
  clearBoxToggle: boolean;
  alert: AlertData;
  alertCleared: boolean;
  toolLateTime: number;
}

class AlertDetailSingle extends PureComponent<
  AlertDetailSingleProps,
  AlertDetailSingleStates
> {
  constructor(props: AlertDetailSingleProps) {
    super(props);
    this.state = {
      clearanceComment: "",
      clearBoxToggle: false,
      alert: alertLimpData(),
      alertCleared: false,
      //assumed constant value must be changed
      toolLateTime: 24,
    };
  }

  static getDerivedStateFromProps(
    props: AlertDetailSingleProps,
    state: AlertDetailSingleStates
  ) {
    const alert = props.alerts[props.alertType][props.alertId];
    if (alert) {
      state.alert = alert;
    }
    return state;
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
        sort: { fieldName: "", direction: "ascend" },
        vehicleID: this.state.alert.frameId,
      },
    });
    this.setState({
      clearBoxToggle: false,
      alertCleared: true,
    });
    // this.props.clearAlertGraph({
    //     type: "CLEAR_ALERT_GRAPH",
    //     payload: {
    //         alertName: this.state.alert.alertName
    //     }
    // })
    this.props.setAlertCleared(true);
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
          pageSize: 10,
        },
        sort: {
          fieldName: "alertTime",
          direction: "descend",
        },
        comment: "",
        alertCode: this.props.alerts[this.props.alertType][
          this.state.alert.alertId
        ].alertCode,
      },
    });
  };

  initiateClearAlert = () => {
    this.setState({
      clearBoxToggle: !this.state.clearBoxToggle,
      clearanceComment: "",
    });
  };
  getOpenAlertHoursClass = () => {
    const splitHours = this.state.alert.openSince.split(":");
    if (splitHours.length > 0) {
      return Number(splitHours[0]) > this.state.toolLateTime ? "toolate" : "";
    }
    return "";
  };
  openMisDashboard = () => {
    const FromDate = moment
      .utc(`${this.state.alert.alertTime}`)
      .local()
      .subtract(6, "hours")
      .format("YYYY-MM-DD HH:mm");
    const ToDate = moment
      .utc(`${this.state.alert.alertTime}`)
      .local()
      .add(6, "hours")
      .format("YYYY-MM-DD HH:mm");
    this.props.history.push(
      "/mis/10dc8576-35dd-4709-894c-f9aea6e5c060" +
        "?name=Battery Performance Analysis"
    );
    localStorage.setItem("dashboardFilters", "true");
    localStorage.setItem("VehicleID", this.state.alert.frameId);
    localStorage.setItem("FromDate", FromDate);
    localStorage.setItem("ToDate", ToDate);
  };

  openVehicleDashboard = () => {
    const FromDate = moment
      .utc(`${this.state.alert.alertTime}`)
      .local()
      .subtract(3, "hours")
      .format("YYYY-MM-DD HH:mm");
    const ToDate = moment
      .utc(`${this.state.alert.alertTime}`)
      .local()
      .add(3, "hours")
      .format("YYYY-MM-DD HH:mm");
    this.props.history.push(
      "/mis/d5a166e2-0724-47e5-b7b7-3e81a017d3b2" +
        "?name=Vehicle Performance Insights"
    );
    localStorage.setItem("dashboardFilters", "true");
    localStorage.setItem("VehicleID", this.state.alert.frameId);
    localStorage.setItem("FromDate", FromDate);
    localStorage.setItem("ToDate", ToDate);
  };
  render() {
    const clearAlert = (
      <Menu
        style={{ left: "-25%", backgroundColor: "#272B3C" }}
        className={"clear-alert-container"}
      >
        <Menu.Item key='1' disabled={true}>
          <Typography.Text>Alert Clearance</Typography.Text>
          <Input.TextArea
            rows={4}
            placeholder={"Enter Comments..."}
            onChange={this.onChange}
            value={this.state.clearanceComment}
          />
          <Button
            className={"dropdown-clear-alert-button"}
            onClick={this.clearAlert}
          >
            <Typography.Text strong className='dropdown-clear-alert-text'>
              Clear Alert
            </Typography.Text>
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='connectm-AlertDetailSingle'>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Alert Name:</div>
          <div className={"single-cell-right"}>
            {this.state.alertCleared ? "N/A" : this.state.alert.alertName}
          </div>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"} style={{ paddingLeft: "20%" }}>
            Customer Name:
          </div>
          <div className={"single-cell-right"}>
            {this.state.alertCleared ? "N/A" : this.state.alert.customerName}
          </div>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Alert Time:</div>
          <div className={"single-cell-right"}>
            {formatDateTime(this.state.alert.alertTime, "DD-MMM-YYYY hh:mm a")}
          </div>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Open Since:</div>
          <div className={`single-cell-right ${this.getOpenAlertHoursClass}`}>
            {this.state.alertCleared
              ? "N/A"
              : formatHourMin(this.state.alert.openSince)}
          </div>
        </div>
        <div className={"single-row"}>
          <Dropdown
            overlay={clearAlert}
            trigger={["click"]}
            visible={this.state.clearBoxToggle}
            disabled={this.state.alertCleared}
          >
            <Button
              className={"clear-alert-button"}
              onClick={this.initiateClearAlert}
              disabled={this.state.alertCleared}
            >
              <Typography.Text
                style={{ color: "black" }}
                strong
                className='clear-alert-text'
              >
                CLEAR ALERT
              </Typography.Text>
            </Button>
          </Dropdown>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Vehicle ID:</div>
          <div
            className={"single-cell-right"}
            style={{ cursor: "pointer" }}
            onClick={this.openVehicleDashboard}
          >
            <u>{this.state.alertCleared ? "N/A" : this.state.alert.frameId}</u>
          </div>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Model:</div>
          <div className={"single-cell-right"}>
            {this.state.alertCleared ? "N/A" : this.state.alert.model}
          </div>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Mfg Date:</div>
          <div className={"single-cell-right"}>
            {this.state.alertCleared
              ? "N/A"
              : formatDate(this.state.alert.mfgDate)}
          </div>
        </div>
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Battery ID:</div>
          <div
            className={"single-cell-right"}
            style={{ cursor: "pointer" }}
            onClick={this.openMisDashboard}
          >
            <u>
              {this.state.alertCleared ? "N/A" : this.state.alert.batteryId}
            </u>
          </div>
        </div>
        {/* <div className={"single-row"}>
                    <div className={"single-cell-left"}>Customer ID:</div>
                    <div className={"single-cell-right"}>{this.state.alertCleared ? "N/A":this.state.alert.customerId}</div>
                </div> */}
        <div className={"single-row"}>
          <div className={"single-cell-left"}>Location:</div>
          <div className={"single-cell-right"}>
            {this.state.alertCleared ? "N/A" : this.state.alert.location}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AlertDetailSingle));
