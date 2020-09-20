import './index.scss';
import React, { PureComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { TAlertsTableData } from '../../../connectm-client/saga/alert';
import { AlertData, TAlertType } from '../../../connectm-client/redux/models';
import { alertLimpData } from '../../../connectm-client/redux/connectm-state';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
// import Card from '../../subComponents/card'
import Tabs from '../../../subComponents/tabs'
import UserCard from '../../../subComponents/userCard'
import VehicleAlert from '../../../subComponents/vehicleAlerts'
import AlertHeader from '../../../subComponents/alertHeader'
import BottomAlert from '../../../subComponents/rightBottomAlert'
import { Meta } from 'antd/lib/list/Item';
import HalfPie from '../../../subComponents/halfPie';
import LineGraph from '../../../subComponents/graph/lineGraph';
import RideGraph from '../../../subComponents/graph/ridesGraph';
import Battery from '../../../assets/battery_health__g_icon.png'
import CustomizedTables from '../../../subComponents/table/batteryStatusTable';
import { ArrowLeftOutlined, LeftCircleFilled } from '@ant-design/icons';

interface AlertDetailProps extends RouteComponentProps { }

interface AlertDetailStates {
    alertId: string,
    alert: AlertData,
    alertType: TAlertType,
    activeAlertType: string,
    alertCleared: boolean,
    activeTab: string

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
            alertCleared: false,
            activeTab: 'mc'
        }
    }
    tabClicked = (params: any) => {
        console.log(params);

    }
    render() {
        const style = { background: '#3C4473', padding: '8px' };
        return (
            <>
                <div className="container-fluid">
                    <div className="connectm-Tabs" style={{ paddingLeft: '24px' }}>
                        {/* <LeftCircleFilled /> */}
                        <LeftCircleFilled style={{ padding: '5px', fontSize: '20px' }} />
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "customer" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("customer")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Customer</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "battery" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("battery")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Battery</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "vehicle" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("vehicle")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Vehicle</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "mc" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("mc")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Motor Controller</Typography.Text>
                        </Button>
                    </div>
                    <div className="content" style={{ paddingLeft: '24px' }}>
                        <Row gutter={[16, 16]} className="col">
                            <Col span={12} style={{ background: 'white' }} />
                            <Col span={12} style={{ background: 'red' }} />
                        </Row>

                        <Row gutter={[16, 16]} className="col">
                            <Col span={12} style={{ background: 'white' }} />
                            <Col span={12} style={{ background: 'red' }} />
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}

export default AlertDetail