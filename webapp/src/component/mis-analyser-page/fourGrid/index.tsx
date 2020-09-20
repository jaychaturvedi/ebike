import './index.scss';
import React, { PureComponent } from 'react';
// import { Breadcrumb, Typography } from 'antd';
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
                        <Row gutter={[16, 0]} className="col">
                            <Col className="gutter-row" span={8}>
                                <div style={style}>
                                    <HalfPie />
                                    <HalfPie />
                                </div>
                            </Col>

                            <Col className="gutter-row" span={16} >
                                <div style={style}>
                                    <Col span={20}>
                                        <Row gutter={[3, 0]} style={{ background: '#3C4473', padding: '8px' }} justify="space-between">
                                            <Col span={4} style={{ background: '#2D3456', display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "normal" }}>RUNNING CURRENT</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap" }}>2.345 A</Typography.Text>
                                            </Col>
                                            <Col span={4} style={{ background: '#2D3456', display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "normal" }}>CURRENT PROPORTIONAL VALUE</Typography.Text>

                                                <Typography.Text style={{ whiteSpace: "normal" }}>2.344 A</Typography.Text>
                                            </Col>
                                            <Col span={4} style={{ background: '#2D3456', display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "normal" }}>AVERAGE RANGE</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap" }}>20.3 KM</Typography.Text>
                                            </Col>
                                            <Col span={4} style={{ background: '#2D3456', display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "normal" }}>BATTERY CAPACITY</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap" }}>24.36 mAH</Typography.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}

export default AlertDetail