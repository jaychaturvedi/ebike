import './index.scss';
import React, { PureComponent } from 'react';
import { Breadcrumb, Typography } from 'antd';
import AlertDetailSingle from "./alert-detail-single"
import AlertInsights from "./alert-additional-insights"
import AlertDetailGraph from "./alert-detail-graph"
import AlertPastTable from "./alert-past-table"
interface AlertDetailProps { }

interface AlertDetailStates { }

class AlertDetail extends PureComponent<AlertDetailProps, AlertDetailStates> {

    render() {
        return (
            <div className="connectm-AlertDetail">
                <Breadcrumb separator=">" className={"connectm-breadcrum"}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="" ><span>Smart Alerts</span></Breadcrumb.Item>
                    <Breadcrumb.Item href={""} ><span className={"breadcrum-active"}>Alert Details</span></Breadcrumb.Item>
                </Breadcrumb>
                <div className={"connectm-alert-detail-container"}>
                    <div className={"alert-top-container"}>
                        <AlertDetailSingle />
                        <AlertDetailGraph />
                    </div>
                    <div className={"alert-bottom-container"}>
                        <div className={"alert-bottom-content-left"}>
                            <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>ADDITIONAL INSIGHTS</Typography.Text>
                            </div>
                            <AlertInsights />
                        </div>
                        <div className={"alert-bottom-content-right"}>
                            {/* <div className={"connectm-header"}>
                                <Typography.Text style={{ color: "#ffffff" }} strong>PAST ALERTS</Typography.Text>
                            </div> */}
                            <AlertPastTable />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AlertDetail;