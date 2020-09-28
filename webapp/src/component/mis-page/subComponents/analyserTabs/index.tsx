import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import HalfPie from '../../../../subComponents/halfPie';
import { LeftCircleFilled } from '@ant-design/icons';

interface AlertDetailProps {
    toggleComponent: Function
}

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
            activeTab: 'battery'
        }
    }
    tabClicked = (params: string) => {
        console.log(params);
        this.setState({ activeTab: params })
        this.props.toggleComponent(params)
    }
    render() {
        return (
            <>
                <div className="connectmAnalyser-Tabs">
                    <div><LeftCircleFilled style={{ padding: '5px', fontSize: '20px' }} />ANALYSER</div>
                </div>
            </>
        )
    }
}

export default AlertDetail