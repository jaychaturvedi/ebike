import './index.scss';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const data = [
    {
        days: 'MON', uv: 4000, pv: 2400, amt: 2400, tv: 3000, av: 1000, bv: 7500,
    },
    {
        days: 'TUE', uv: 3000, pv: 1398, amt: 2210, tv: 2500, av: 2000, bv: 8500,
    },
    {
        days: 'WED', uv: 2000, pv: 9800, amt: 2290, tv: 5000, av: 4000, bv: 7855,
    },
    {
        days: 'THU', uv: 2780, pv: 3908, amt: 2000, tv: 10000, av: 9000, bv: 2355,
    },
    {
        days: 'FRI', uv: 1890, pv: 4800, amt: 2181, tv: 8000, av: 11000, bv: 6145,
    },
    {
        days: 'SAT', uv: 2390, pv: 3800, amt: 2500, tv: 6230, av: 5000, bv: 1234,
    },
    {
        days: 'SUN', uv: 3490, pv: 4300, amt: 2100, tv: 4000, av: 6600, bv: 4751,
    },
];
const menu = (
    <Menu style={{ float: 'right' }}>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">Today</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">Last 7 Days</a>
        </Menu.Item>
        <Menu.Item key="3">Last 30 Days</Menu.Item>
    </Menu>
);

interface RandDTrendsProps { }

interface RandDTrendsStates { }

class RandDTrends extends PureComponent<RandDTrendsProps, RandDTrendsStates> {

    render() {
        return <>
            <div className="trends-header">
                <h1><b>TRENDS </b></h1>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Last 7 Days<DownOutlined />
                    </a>
                </Dropdown>

            </div>
            <div className="connectm-RandDTrends">
                <h3>Total Alerts</h3>
                <div className="graph">
                    <LineChart width={420} height={150} data={data}>
                        <CartesianGrid strokeDasharray="3 4 5 2" />
                        <XAxis dataKey="days" />
                        <Tooltip />
                        <YAxis type="number" domain={[0, 500]} />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />

                    </LineChart>
                </div>
                <h3>Top 5 Alerts</h3>
                <div className="graph">
                    <LineChart width={420} height={150} data={data}>
                        <CartesianGrid strokeDasharray="3 4 5 2" />
                        <XAxis dataKey="days" />
                        <Tooltip />
                        <YAxis type="number" domain={['auto', 'auto']} />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="uv" stroke="#77bdf8" strokeWidth={2} />
                        <Line type="monotone" dataKey="tv" stroke="#999fff" strokeWidth={2} />
                        <Line type="monotone" dataKey="av" stroke="#338fff" strokeWidth={2} />
                        <Line type="monotone" dataKey="bv" stroke="#2287ff" strokeWidth={2} />
                        <Legend />
                    </LineChart>
                </div>
                <h3>Location-Wise Alerts</h3>
                <div className="graph">
                    <LineChart width={420} height={150} data={data}>
                        <CartesianGrid strokeDasharray="3 5 5 2" />
                        <XAxis dataKey="days" />
                        <YAxis type="number" domain={['auto', 'auto']} />
                        <Legend />
                        <Tooltip />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="tv" stroke="#999fff" strokeWidth={2} />
                        <Line type="monotone" dataKey="bv" stroke="#2287ff" strokeWidth={2} />
                    </LineChart>
                </div>
            </div>
        </>
    }

}

export default RandDTrends;