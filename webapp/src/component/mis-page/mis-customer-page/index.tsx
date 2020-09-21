import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography } from 'antd';
import Card from '../../../subComponents/card'
import Tabs from '../../../subComponents/tabs'
import UserCard from '../../../subComponents/userCard'
import VehicleAlert from '../../../subComponents/vehicleAlerts'
import AlertHeader from '../../../subComponents/alertHeader'
import BottomAlert from '../../../subComponents/rightBottomAlert'
import { Meta } from 'antd/lib/list/Item';

interface AlertDetailProps { }

interface AlertDetailStates {
}

class AlertDetail extends PureComponent<AlertDetailProps, AlertDetailStates> {
    constructor(props: AlertDetailProps) {
        super(props)
    }
    render() {
        return (
            <>
                <div className="container-customer">
                    <div className="header-tabs">
                        <Row className="col" >
                            <Col span={2} style={{ background: "#272B3C" }} className="col" >back</Col>
                            <Col span={4} style={{ background: "green" }} className="col" >col-4</Col>
                            <Col span={4} style={{ background: "red" }} className="col" >col-4</Col>
                            <Col span={4} style={{ background: "green" }} className="col" >col-4</Col>
                            <Col span={4} style={{ background: "red" }} className="col" >col-4</Col>
                        </Row>
                    </div>
                    <div className="content">
                        {/* left bar */}
                        <Row className="customer" >
                            <Col span={8} style={{ background: "#2D3456" }}>
                                <div className="profile-text">
                                    <Typography.Text style={{ whiteSpace: "nowrap", paddingLeft: '24px' }} strong>Profile</Typography.Text>
                                </div>
                                <div style={{ paddingLeft: '24px' }}>
                                    <Col span={20} style={{ background: "#363E69", }}>
                                        <div className="profile-content" style={{ margin: "0 auto" }}>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Primary User</Typography.Text>
                                            <Typography.Text style={{ whiteSpace: "nowrap", float: "right" }} >  vehicle</Typography.Text>
                                            <div className="profile-card" style={{ height: 'calc(70vh)', width: '100%', backgroundColor: '#5763a8' }}>
                                                <Card title="Primary User label" extra="Vehicle" width="100%" />
                                                <UserCard title="Primary User label" extra="Vehicle" width="100%" />
                                                <UserCard title="Primary User label" extra="Vehicle" width="100%" />
                                                <Tabs />
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </Col>
                            {/* --------- */}
                            {/* vehicle trends */}
                            <Col span={16} style={{ background: "brown" }}>
                                <div className="profile-text">
                                    <Typography.Text style={{ whiteSpace: "nowrap" }} strong>Vehicle Trends</Typography.Text>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Col span={24} style={{ background: "#363E69", }}>
                                        <div className="profile-content" style={{ margin: "0 auto" }}>
                                            <AlertHeader />
                                            <div className="profile-card" style={{ height: 'calc(35vh)', backgroundColor: '#5763a8' }}>
                                                <VehicleAlert />
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                                <div className="profile-text">
                                    <Typography.Text style={{ whiteSpace: "nowrap" }} strong>Additional Insights</Typography.Text>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Col span={24} style={{ background: "#363E69", }}>
                                        <div className="profile-content" style={{ margin: "0 auto" }}>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }}>Primary User</Typography.Text>
                                            <Typography.Text style={{ whiteSpace: "nowrap", float: "right" }} >  vehicle</Typography.Text>
                                            <div className="profile-card" style={{ height: 'calc(25vh)', backgroundColor: '#5763a8' }}>
                                                <BottomAlert />
                                            </div>
                                        </div>
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