import './index.scss';
import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import AlertDetailSingle from "./alert-detail-single"
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
                        <AlertDetailSingle/>
                        {/* //graph */}
                    </div>
                    <div className={"alert-bottom-container"}>
                        Bottom
                        {/* //ins */}
                        {/* //past table */}
                    </div>
                </div>
            </div>
        )
    }

}

export default AlertDetail;