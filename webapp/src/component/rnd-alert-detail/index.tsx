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

interface AlertDetailProps extends ReduxAlertDetailActions, ReduxAlertDetailState, RouteComponentProps { }

interface AlertDetailStates {
    alertId: string
}
class AlertDetail extends PureComponent<AlertDetailProps, AlertDetailStates> {
    constructor(props: AlertDetailProps) {
        super(props)
        this.state = {
            alertId: ""
        }
    }
    static getDerivedStateFromProps(props: AlertDetailProps, state: AlertDetailStates) {
        // props.getAlertTrends({
        //     type : "GET_ALERT_TRENDS"
        // })
        state.alertId = props.location.pathname.split('/')[1]
        //as soon as come here
        //make api call get data
        //also update active alertTab

        return state
    }

    render() {
        return (
            <div className="connectm-AlertDetail">
                <Breadcrumb separator=">" className={"connectm-breadcrum"}>
                    <Breadcrumb.Item href=""><Link to={"/"} className="link">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item href="" ><Link to={"/"} className="link"><span>Smart Alerts</span></Link></Breadcrumb.Item>
                    <Breadcrumb.Item href={""} ><span className={"breadcrum-active"}>Alert Details</span></Breadcrumb.Item>
                </Breadcrumb>
                <div className={"connectm-alert-detail-container"}>
                    <div className={"alert-top-container"}>
                        <AlertDetailSingle alertId={this.state.alertId} />
                        {/* <LineGraph graphType="double" /> */}
                        {/* <CellBatteryGraph /> */}
                        {/* <StackedBarGraph /> */}
                        <AlertGraph alertName={this.props.alerts[this.props.alerts.activeAlertTab][this.state.alertId].alertName}
                        vehicleId={"12324"} alertCleared={false} alertId={Number(this.state.alertId)}  />
                    </div>
                    <div className={"alert-bottom-container"}>
                        <div className={"alert-bottom-content-left"}>
                            <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>ADDITIONAL INSIGHTS</Typography.Text>
                            </div>
                            <AlertInsights alertId={this.state.alertId} />
                        </div>
                        <div className={"alert-bottom-content-right"}>
                            {/* <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>PAST ALERTS</Typography.Text>
                            </div> */}
                            <AlertPastTable alertId={this.state.alertId} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDetail);