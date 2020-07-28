import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';

interface AlertInsightsProps { }

interface AlertInsightsStates { }

class AlertInsights extends PureComponent<AlertInsightsProps, AlertInsightsStates> {

    render() {
        return (
            <div className="connectm-AlertInsights">
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Total Distance:</div>
                    <div className={"single-cell-right"}>3200 Km</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Utilization:</div>
                    <div className={"single-cell-right"}>25 %</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"} style={{width:"60%"}}>Rides Per Month:</div>
                    <div className={"single-cell-right"} style={{ width: "40%" }}>10</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"} style={{ width: "60%" }}>Avg Range/ride:</div>
                    <div className={"single-cell-right"} style={{ width: "40%" }}>25 Km</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"} style={{ width: "60%" }}>Avg Mileage:</div>
                    <div className={"single-cell-right"} style={{ width: "40%" }}>40 Km</div>
                </div>
            </div>
        )
    }

}

export default AlertInsights;