import './index.scss';
import React from 'react';
import { Row, Col } from 'antd';
interface Props { title: string; extra?: string, width: string }


export default class AlertHeader extends React.Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
    };

    onTabChange = (key: any, type: any) => {
        this.setState({ [type]: key });
    };

    render() {
        return (
            <>
                {/* <Typography.Text style={{ whiteSpace: "nowrap" }}>{"Vehicles"} </Typography.Text> */}
                <Row>
                    <Col span={4}>Total Distance 256km</Col>
                    <Col span={4}>Avg speed 24km/h</Col>
                    <Col span={4}>Avg Mileage 29km</Col>
                    <Col span={4}>Number of rides 43</Col>
                    <Col span={4}>Avg distance 4.6km</Col>
                    <Col span={4}>Avg Utilisation 48km</Col>
                </Row>
            </>
        );
    }
}
