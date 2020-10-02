import './index.scss';
import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
interface Props { title: string; extra?: string, width: string }


const tabList = [
    {
        key: 'tab1',
        tab: 'kivo easy',
    },
    {
        key: 'tab2',
        tab: 'kivo cargo',
    },
];

const contentList: any = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
};

const tabListNoTitle = [
    {
        key: 'article',
        tab: 'KivoE20',
    },
    {
        key: 'app',
        tab: 'KivoC30',
    },
    {
        key: 'project',
        tab: 'Kivo',
    },
];

const contentListNoTitle: any = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
};

export default class TabsCard extends React.Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
    };

    onTabChange = (key: any, type: any) => {
        console.log(key, type);
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
