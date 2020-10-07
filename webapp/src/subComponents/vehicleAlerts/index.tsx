import './index.scss';
import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import Table from '../tabsContent/table'
import RidesGraph from '../tabsContent/ridesGraph'


interface Props { title: string; extra?: string, width: string }

const tabListNoTitle = [
    {
        key: 'smart',
        tab: 'smart alerts',
    },
    {
        key: 'bms',
        tab: 'bms alerts',
    },
    {
        key: 'mca',
        tab: 'mcs alerts',
    },
    {
        key: 'cc',
        tab: 'charge cycles',
    }, {
        key: 'rides',
        tab: 'Rides',
    },
];

const contentListNoTitle: any = {
    smart: <Table />,
    bms: <p>app content</p>,
    mca: <p>project content</p>,
    cc: <p>cc content</p>,
    rides: <RidesGraph />,

};

export default class TabsCard extends React.Component {
    state = {
        key: 'rides',
        noTitleKey: 'rides',
    };

    onTabChange = (key: any, type: any) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
            <>
                {/* <Typography.Text style={{ whiteSpace: "nowrap" }}>{"Vehicles"} </Typography.Text> */}
                <Card
                    style={{ width: '100%', height: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={key => {
                        this.onTabChange(key, 'noTitleKey');
                    }}
                >
                    {contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </>
        );
    }
}
