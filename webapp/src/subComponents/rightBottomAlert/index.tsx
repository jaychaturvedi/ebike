

import './index.scss';
import React from 'react';
import UserCard from '../userCard'
import { Card, Typography, Row, Col } from 'antd';
import Pie from '../pieChart'

interface Props { title: string; extra?: string, width: string }
export default class Cards extends React.PureComponent<{}, {}>{
    render() {
        let style = { backgroundColor: "red" }
        return (

            <>

                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div style={{ backgroundColor: "red" }}>                                                <UserCard title="Primary User label" extra="Vehicle" width="100%" />
                            <UserCard title="Primary User label" extra="Vehicle" width="100%" />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div style={{ backgroundColor: "red" }}>
                            <Pie />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div style={{ backgroundColor: "red" }}>col-8</div>
                    </Col>
                </Row>
            </>
        )
    }
}