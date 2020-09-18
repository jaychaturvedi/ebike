import './index.scss';
import React, { PureComponent } from 'react';
// import { Breadcrumb, Typography } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { TAlertsTableData } from '../../connectm-client/saga/alert';
import { AlertData, TAlertType } from '../../connectm-client/redux/models';
import { alertLimpData } from '../../connectm-client/redux/connectm-state';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
// import Card from '../../subComponents/card'
import Tabs from '../../subComponents/tabs'
import UserCard from '../../subComponents/userCard'
import VehicleAlert from '../../subComponents/vehicleAlerts'
import AlertHeader from '../../subComponents/alertHeader'
import BottomAlert from '../../subComponents/rightBottomAlert'
import { Meta } from 'antd/lib/list/Item';
import HalfPie from '../../subComponents/halfPie';
import CustomizedTables from '../../subComponents/table/batteryStatusTable';

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
            activeTab: 'smart'
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
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "bms" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("bms")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>back</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "bms" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("bms")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Customer</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "smart" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("smart")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Battery</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "mc" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("mc")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Vehicle</Typography.Text>
                        </Button>
                        <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "mc" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("mc")}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Motor Controller</Typography.Text>
                        </Button>
                    </div>
                    <div className="content" style={{ paddingLeft: '24px' }}>
                        {/* left bar */}
                        {/* <Row className="col">
                            <Col span={16} style={{ background: "#2D3456" }}>
                                <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "bms" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("bms")}>
                                <Typography.Text style={{ whiteSpace: "nowrap" }}>Customer</Typography.Text>
                                </Button>
                            </Col>
                        </Row> */}
                        <Row gutter={[16, 24]} className="col">
                            <Col className="gutter-row" span={8}>
                                <div style={style}>
                                    <HalfPie />
                                    <HalfPie />
                                    <div className="site-card-wrapper" >
                                        <Row style={{
                                            paddingLeft: '24px',
                                            height: 80, background: '#2D3456'//dark
                                        }}>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>

                                            <Col span={24} >
                                                <Row gutter={[0, 24]} >
                                                    <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                                    </Col>
                                                    <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                                    </Col>
                                                    <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>

                            <Col className="gutter-row" span={16}>
                                <div style={style}>
                                    <CustomizedTables />
                                    <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>

                                </div>
                            </Col>

                            {/* /////// */}
                            <Col className="gutter-row" span={8}>
                                <div style={style}>col-6</div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <div style={style}>col-6</div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <div style={style}>col-6</div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        )
    }

}

export default AlertDetail