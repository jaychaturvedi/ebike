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

                <div className='container-fluid mc'>
                    <Row>
                        <Col className="gutter-row">
                            <div className='heading-div' style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                <div>
                                    <Typography.Text style={{ whiteSpace: "nowrap", width:'40%' }} className="header-title" strong>BATTERY STATUS</Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text style={{ whiteSpace: "nowrap",width:'60%'  }} className="header-title" strong>BATTERY STATUS</Typography.Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

            </>
        )
    }
}

export default AlertDetail