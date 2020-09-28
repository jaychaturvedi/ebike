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
                <div className="connectmMis-Tabs">
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
                    <div onClick={() => this.tabClicked("analyser")} className={`analyser-button ${this.state.activeTab === "mc" ? 'tab-active' : ''}`} >
                        Analyser
                    </div>
                </div>
            </>
        )
    }
}

export default AlertDetail