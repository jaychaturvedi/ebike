import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, ReduxAlertDetailActions, ReduxAlertDetailState, mapDispatchToProps } from '../../../connectm-client/actions/alert-detail';
import { TAlertInsights } from '../../../connectm-client/redux/connectm-state';

const limpInsight: TAlertInsights = {
    avgMileageInKm: "N/A",
    avgRangeRideInKm: "N/A",
    ridesPerMnthInKm: "N/A",
    totalDistInKm: "N/A",
    utilization: "N/A"
}

interface AlertInsightsProps extends ReduxAlertDetailActions, ReduxAlertDetailState {
    alertId: string
}

interface AlertInsightsStates {
    insights: TAlertInsights;
    reload : boolean
}

class AlertInsights extends PureComponent<AlertInsightsProps, AlertInsightsStates> {
    constructor(props: AlertInsightsProps) {
        super(props)
        this.state = {
            insights: {
                avgMileageInKm: "N/A",
                avgRangeRideInKm: "N/A",
                ridesPerMnthInKm: "N/A",
                totalDistInKm: "N/A",
                utilization: "N/A"
            },
            reload : true
        }
    }
    static getDerivedStateFromProps(props: AlertInsightsProps, state: AlertInsightsStates) {
        if (props.alertId) {
            const alert = props.alerts[props.alerts.activeAlertTab][props.alertId]
            if (alert && state.reload == true) {
                props.getAlertsInsights({
                    type: "GET_ALERTS_INSIGHTS",
                    payload: {
                        alertId: alert.alertId,
                        alertName: alert.alertName,
                        alertType: props.alerts.activeAlertTab,
                        comment: "",
                        customerId: alert.customerId,
                        pagination: { pageNumber: -1, pageSize: -1 },
                        sort: { fieldName: "", direction: 'ascend' },
                        vehicleID: alert.frameId
                    }
                })
                state.reload = false
            }
            state.insights = props.alertInsights !== undefined ? props.alertInsights : limpInsight
        } else {
            state.insights = limpInsight
        }
        return state
    }

    render() {
        return (
            <div className="connectm-AlertInsights">
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Total Distance:</div>
                    <div className={"single-cell-right"}>{this.state.insights.totalDistInKm} Km</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Utilization:</div>
                    <div className={"single-cell-right"}>{this.state.insights.utilization} %</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"} style={{ width: "60%" }}>Rides Per Month:</div>
                    <div className={"single-cell-right"} style={{ width: "40%" }}>{this.state.insights.ridesPerMnthInKm}</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"} style={{ width: "60%" }}>Avg Range/Ride:</div>
                    <div className={"single-cell-right"} style={{ width: "40%" }}>{this.state.insights.avgRangeRideInKm} Km</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"} style={{ width: "60%" }}>Avg Mileage:</div>
                    <div className={"single-cell-right"} style={{ width: "40%" }}>{this.state.insights.avgMileageInKm} Km</div>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertInsights);