import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import HalfPie from '../../../subComponents/halfPie';
import { LeftCircleFilled } from '@ant-design/icons';

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
                <div className="container-mc">
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