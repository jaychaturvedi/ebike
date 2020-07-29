import './index.scss';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
const data = [
    {
        days: 'MON', uv: 4000, pv: 10, amt: 2400, tv: 3000, av: 1000, bv: 7500,
    },
    {
        days: 'TUE', uv: 3000, pv: 20, amt: 2210, tv: 2500, av: 2000, bv: 8500,
    },
    {
        days: 'WED', uv: 2000, pv: 15, amt: 2290, tv: 5000, av: 4000, bv: 7855,
    },
    {
        days: 'THU', uv: 2780, pv: 30, amt: 2000, tv: 10000, av: 9000, bv: 2355,
    },
    {
        days: 'FRI', uv: 1890, pv: 45, amt: 2181, tv: 8000, av: 11000, bv: 6145,
    },
    {
        days: 'SAT', uv: 2390, pv: 15, amt: 2500, tv: 6230, av: 5000, bv: 1234,
    },
    {
        days: 'SUN', uv: 3490, pv: 90, amt: 2100, tv: 4000, av: 6600, bv: 4751,
    },
];


interface RandDTrendsProps { }

interface RandDTrendsStates {
    trendsPeriod: string
}

class RandDTrends extends PureComponent<RandDTrendsProps, RandDTrendsStates> {
    constructor(props: RandDTrendsProps) {
        super(props);
        this.state = {
            trendsPeriod: "Last 7 Days"
        }
    }
    handlePeriodChange = (e: any) => {
        this.setState({
            trendsPeriod: e.key
        })
    }

    trendPeriod = (
        <Menu onClick={this.handlePeriodChange}>
            <Menu.Item key="Last 7 Days">
                Last 7 Days
        </Menu.Item>
            <Menu.Item key="Last 30 Days">
                Last 30 Days
        </Menu.Item>
        </Menu>
    );


    render() {
        return <>
            <div className="connectm-RandDTrends">
                <div className="trends-header">
                    <Typography.Text strong style={{ paddingLeft: "2px" }}>TRENDS</Typography.Text>
                    <Dropdown overlay={this.trendPeriod} trigger={['click']}>
                        <Typography.Text className={"pair trend-dropdown-active"}
                            style={{ paddingLeft: "2px", whiteSpace: "nowrap", minWidth: "50%" }}>
                            {this.state.trendsPeriod}
                            <DownOutlined className={"flip"} style={{ marginLeft: "30px", paddingRight: "2px" }} />
                        </Typography.Text>
                    </Dropdown>
                </div>
                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Total Alerts</Typography.Text>
                </div>
                <ResponsiveContainer width="100%" height="28%">
                    <LineChart margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
                        data={data}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="days" tick={{ fill: 'white' }} interval="preserveEnd" />
                        <Tooltip />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Top 5 Alerts</Typography.Text>
                </div>
                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="days" tick={{ fill: 'white' }} interval="preserveEnd" />
                        <Tooltip />
                        <Legend />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Location-Wise Alerts</Typography.Text>
                </div>
                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={data} margin={{ top: 10, left: -20, right: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="days" tick={{ fill: 'white' }} interval="preserveEnd" />
                        <Tooltip />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    }

}

export default RandDTrends;