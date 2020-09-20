import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import HalfPie from '../../subComponents/halfPie';
import DischargingTrend from '../../subComponents/graph/dischargingTrend';
import ChargingTrend from '../../subComponents/graph/ridesGraph';
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
                <div className="container-fluid">

                    <div className="content" style={{ paddingLeft: '24px' }}>
                        <Row gutter={[16, 0]} className="col">
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
                                                        <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Charge</Typography.Text>
                                                        <Typography.Text style={{ whiteSpace: "nowrap", fontSize: '24px' }} strong>84%</Typography.Text>
                                                    </Col>
                                                    <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                        <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Pressure</Typography.Text>
                                                        <Typography.Text style={{ whiteSpace: "nowrap", fontSize: '24px' }} strong>2.3V</Typography.Text>
                                                    </Col>
                                                    <Col className="gutter-row" span={8} style={{ display: 'flex', flexDirection: 'column' }} >
                                                        <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Acquisition</Typography.Text>
                                                        <Typography.Text style={{ whiteSpace: "nowrap", color: 'red', fontSize: '24px' }} strong>2.2V</Typography.Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>

                            <Col className="gutter-row" span={16} >
                                <div style={style}>

                                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                                        <div style={{ width: '60%', zIndex: 1 }}>

                                            <CustomizedTables />
                                        </div>
                                        <div style={{ width: '40%' }}>
                                            <Row gutter={[3, 0]} style={{ background: '#3C4473', padding: '8px' }} justify="space-between">
                                                <Col span={11} style={{ background: '#2D3456', display: 'flex', flexDirection: 'column' }} >
                                                    <Typography.Text style={{ whiteSpace: "normal" }}>Ambient Temperature</Typography.Text>
                                                    <Typography.Text style={{ whiteSpace: "nowrap" }}>24' C</Typography.Text>
                                                </Col>
                                                <Col span={11} style={{ background: '#2D3456', display: 'flex', flexDirection: 'column' }} >
                                                    <Typography.Text style={{ whiteSpace: "normal" }}>Ambient Temperature</Typography.Text>
                                                    <Typography.Text style={{ whiteSpace: "nowrap" }}>24' C</Typography.Text>
                                                </Col>
                                                <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '35%', marginTop: '10%' }}>
                                                    <div style={{ width: '150px', height: '150px', background: '#2D3456', borderRadius: '75px', display: 'flex', justifyContent: 'center' }}>
                                                        <img src={Battery} style={{ width: '50px', height: '50px', alignSelf: 'center' }} />
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }} >
                                                            <Typography.Text style={{ whiteSpace: "normal", }} strong>Health</Typography.Text>
                                                            <Typography.Text style={{ whiteSpace: "nowrap", fontSize: '24px' }} strong>82%</Typography.Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            {/* /////// */}

                            <Col className="gutter-row" span={8}>
                                <Typography.Text style={{ whiteSpace: "nowrap", fontSize: '16px' }} strong>Cell Voltage</Typography.Text>

                                <div style={style}>col-6</div>
                            </Col>

                            <Col className="gutter-row" span={8}>
                                <Typography.Text style={{ whiteSpace: "nowrap", fontSize: '16px' }} strong>Last Charging Trend</Typography.Text>

                                <div style={style}><ChargingTrend /></div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Typography.Text style={{ whiteSpace: "nowrap", fontSize: '16px' }} strong>Last Discharging Trend</Typography.Text>

                                <div style={{ ...style, width: '100%' }}><DischargingTrend /></div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        )
    }

}

export default AlertDetail