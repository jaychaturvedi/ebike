import './index.scss';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { PureComponent } from 'react';
import moment from "moment";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
const data = [
    { days: 'MON', uv: 4000, pv: 10, amt: 2400, tv: 3000, av: 1000, bv: 7500 },
    { days: 'TUE', uv: 3000, pv: 20, amt: 2210, tv: 2500, av: 2000, bv: 8500 },
    { days: 'WED', uv: 2000, pv: 15, amt: 2290, tv: 5000, av: 4000, bv: 7855, },
    { days: 'THU', uv: 2780, pv: 30, amt: 2000, tv: 10000, av: 9000, bv: 2355, },
    { days: 'FRI', uv: 1890, pv: 45, amt: 2181, tv: 8000, av: 11000, bv: 6145, },
    { days: 'SAT', uv: 2390, pv: 15, amt: 2500, tv: 6230, av: 5000, bv: 1234, },
    { days: 'SUN', uv: 3490, pv: 90, amt: 2100, tv: 4000, av: 6600, bv: 4751, },
];
const totalAlerts = [
    { days: 'MON', date: "2020-07-24", count: 200 },
    { days: 'TUE', date: "2020-07-25", count: 150 },
    { days: 'WED', date: "2020-07-26", count: 50 },
    { days: 'THU', date: "2020-07-27", count: 100 },
    { days: 'FRI', date: "2020-07-28", count: 0 },
    { days: 'SAT', date: "2020-07-29", count: 150 },
    { days: 'SUN', date: "2020-07-30", count: 200 },
];
const top5alerts = [
    { alert1: "voltages deviation", alert2: "alertName2", alert3: "alertName3", alert4: "alertName4", alert5: "alertName5" },
    { date: "2020-07-24", alert1count: 200, alert2count: 100, alert3count: 50, alert4count: 150, alert5count: 0, days: 'MON' },
    { date: "2020-07-24", alert1count: 150, alert2count: 150, alert3count: 100, alert4count: 200, alert5count: 50, days: 'TUE' },
    { date: "2020-07-24", alert1count: 100, alert2count: 200, alert3count: 150, alert4count: 150, alert5count: 150, days: 'WED' },
    { date: "2020-07-24", alert1count: 50, alert2count: 150, alert3count: 0, alert4count: 100, alert5count: 200, days: 'THU' },
    { date: "2020-07-24", alert1count: 100, alert2count: 100, alert3count: 100, alert4count: 50, alert5count: 150, days: 'FRI' },
    { date: "2020-07-24", alert1count: 150, alert2count: 50, alert3count: 150, alert4count: 100, alert5count: 100, days: 'SAT' },
    { date: "2020-07-24", alert1count: 200, alert2count: 100, alert3count: 50, alert4count: 150, alert5count: 50, days: 'SUN' },
]


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

    static getDerivedStateFromProps(props: RandDTrendsProps, state: RandDTrendsStates) {
        return state
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

    formatDate = (label: any) => {
        // console.log("label", label)
        // console.log(moment(`${label}`).format('dddd'));
        return moment(`${label}`).format('dddd').slice(0, 3).toUpperCase()
        // return <Moment format="DDDD">
        //     {`${labels}`}
        // </Moment>
    }


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
                        data={totalAlerts}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="days" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }} />
                        {/* <Tooltip /> */}
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name="line 1" type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>

                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Top 5 Alerts</Typography.Text>
                </div>

                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={top5alerts.slice(1)} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        <Legend iconType="circle" iconSize={5} align="right"
                            wrapperStyle={{
                                paddingRight: "10px"
                            }} />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name={top5alerts[0].alert1} type="monotone" dataKey="alert1count"
                            stroke="orange" strokeWidth={2} dot={false} />
                        <Line name={top5alerts[0].alert2} type="monotone" dataKey="alert2count" stroke="green" strokeWidth={2} />
                        <Line name={top5alerts[0].alert3} type="monotone" dataKey="alert3count" stroke="red" strokeWidth={2} />
                        <Line name={top5alerts[0].alert4} type="monotone" dataKey="alert4count" stroke="yellow" strokeWidth={2} />
                        <Line name={top5alerts[0].alert5} type="monotone" dataKey="alert5count" stroke="blue" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>

                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Location-Wise Alerts</Typography.Text>
                </div>

                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="days" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        <Legend iconType="circle" iconSize={10} />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name="line 1" type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    }

}

export default RandDTrends;