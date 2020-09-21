import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import HalfPie from '../../subComponents/halfPie';
import DischargingTrend from '../../subComponents/graph/dischargingTrend';
import ChargingTrend from '../../subComponents/graph/chargingTrend';
import Battery from '../../assets/battery_health__g_icon.png'
import CustomizedTables from '../../subComponents/table/batteryStatusTable';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface AlertDetailProps { }

interface AlertDetailStates {
    activeTab: string
}
//Smart Alerts
//BMS Alerts
//Motor Controller Alerts
class AlertDetail extends PureComponent<AlertDetailProps, AlertDetailStates> {
    constructor(props: AlertDetailProps) {
        super(props)
        this.state = {
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
                <div className="container-battery">
                    <Row gutter={[16, 0]} className="battery-top">
                        <Col span={8}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>STATUS</Typography.Text>
                            {/* left tile */}
                            <div className="left-body">
                                <div style={{ height: '40%' }}>
                                    <HalfPie />
                                </div>
                                <div style={{ height: '40%' }}>
                                    <HalfPie />
                                </div>
                                <Row className="card-wrapper">
                                    <Typography.Text style={{ whiteSpace: "nowrap" }}>Soc</Typography.Text>
                                    <Col span={24} >
                                        <Row align="top">
                                            <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Charge</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap" }} strong>84%</Typography.Text>
                                            </Col>
                                            <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Pressure</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap" }} strong>2.3V</Typography.Text>
                                            </Col>
                                            <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Acquisition</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap", color: 'red' }} strong>2.2V</Typography.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        {/* right tile  */}
                        <Col span={16} >
                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>BATTERY STATUS</Typography.Text>

                            <div className="right-body" >
                                <div className="table">
                                    <CustomizedTables />
                                </div>
                                <div className="health">
                                    <Row gutter={[3, 0]} style={{ background: '#3C4473' }} justify="space-between">
                                        <Col span={11} className="health-card" >
                                            <Typography.Text style={{ whiteSpace: "normal" }}>Ambient Temperature</Typography.Text>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }}>24' C</Typography.Text>
                                        </Col>
                                        <Col span={11} className="health-card" >
                                            <Typography.Text style={{ whiteSpace: "normal" }}>Ambient Temperature</Typography.Text>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }}>24' C</Typography.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="battery-health-circle">
                                            <img src={Battery} style={{ width: '50px', height: '50px', alignSelf: 'center' }} />
                                            <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }} >
                                                <Typography.Text style={{ whiteSpace: "normal", }} strong>Health</Typography.Text>
                                                <Typography.Text style={{ whiteSpace: "nowrap" }} strong>82%</Typography.Text>
                                            </div>
                                        </div>

                                    </Row>
                                </div>
                            </div>
                        </Col>

                        {/* /////// */}
                    </Row>
                    <Row gutter={[16, 16]} className="battery-bottom">
                        <Col className="gutter-row" span={8}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>CELL VOLTAGE</Typography.Text>
                            <div style={style} className="body">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>LAST CHARGING TREND</Typography.Text>

                            <div style={style} className="body"><ChargingTrend /></div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>LAST DISCHARGING TREND</Typography.Text>
                            <div style={{ ...style }} className="body"><DischargingTrend /></div>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }

}

export default AlertDetail