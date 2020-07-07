import React, { PureComponent } from 'react';
import './index.scss';
import { Layout } from "antd";
import WebHeader from "../header"
import SubHeader from "../subHeader"
import InvetrySales from "../Inventry-sales"
import BatteryPerfromance from "../battery-performance"
import RidingPattern from "../Riding-Patterns"
import Service from "../service"
import VehicleUtilization from "../vehicle-utilization";
interface ContentProp { }
interface ContentState { }
class Content extends PureComponent<ContentProp, ContentState>{

    render() {
        return <>
            <Layout.Content className="web-content">
                <div className="content">
                    <SubHeader />
                    <div className="statistics-container">
                        <div className={"left-content"}>
                            <div className={"rows"}>
                                <InvetrySales />
                                <RidingPattern />
                            </div>
                            <div className={"rows"}>
                                <BatteryPerfromance />
                                <VehicleUtilization />
                            </div>
                        </div>
                        <div className={"right-content"}>
                            <Service />
                        </div>
                    </div>
                </div>
            </Layout.Content>
        </>
    }
}

export default Content;
