import './index.scss';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TtrendTotalAlerts, TtrendLocationWise, TtrendTop5Alert, Alert, State } from "../../connectm-client/redux/connectm-state";
import React, { PureComponent } from 'react';
import moment from "moment";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { ReduxAlertTrendActions, ReduxAlertTrendState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/trends"
import { connect } from 'react-redux';

const totalAlerts = [
    { days: 'MON', date: "2020-07-24", count: 200 },
];
const top5alerts = [
    { alert1: "voltages deviation", alert2: "alertName2", alert3: "alertName3", alert4: "alertName4", alert5: "alertName5" },
    { date: "2020-07-24", alert1count: 200, alert2count: 100, alert3count: 50, alert4count: 150, alert5count: 0, days: 'MON' },
]


interface RandDTrendsProps extends ReduxAlertTrendActions, ReduxAlertTrendState { }

interface RandDTrendsStates {
    trendsPeriod: string,
    totalAlerts: TtrendTotalAlerts[],
    top5Alerts: TtrendTop5Alert,
    locationwiseAlerts: TtrendLocationWise,
    xAxis: number
}

class RandDTrends extends PureComponent<RandDTrendsProps, RandDTrendsStates> {
    constructor(props: RandDTrendsProps) {
        super(props);
        this.state = {
            trendsPeriod: "Last 7 Days",
            totalAlerts: [],
            locationwiseAlerts: { lines: {}, data: [] },
            top5Alerts: { lines: {}, data: [] },
            xAxis: 7
        }
    }

    static getDerivedStateFromProps(props: RandDTrendsProps, state: RandDTrendsStates) {
        // const data = props.getAlertTrends({
        //     type: "GET_ALERT_TRENDS",
        //     payload: {
        //         alertType: 'smart',
        //         startDate: "2020-07-07 10:49:38",
        //         endDate: "2020-07-08 16:50:38"
        //     }
        // })
        state.totalAlerts = props.trendTotalAlert
        state.top5Alerts = props.trendTop5Alert
        state.locationwiseAlerts = props.trendLocationWise
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
        if ("Last 7 Days" === this.state.trendsPeriod)
            return moment(`${label}`).format('dddd').slice(0, 3).toUpperCase()
        return label == "2020-07-22" ? moment(`${label}`).format('d MMM') : moment(`${label}`).format('d')

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
                        data={this.state.totalAlerts}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        {/* <Tooltip /> */}
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name="line 1" type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>

                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Top 5 Alerts</Typography.Text>
                </div>

                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={this.state.top5Alerts.data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        <Legend iconType="circle" iconSize={5} align='right' margin={{ top: 0, bottom: 0 }}
                            wrapperStyle={{ width: '90%', paddingRight: '50px' }} />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name={this.state.top5Alerts.lines.alert1} type="monotone" dataKey="alert1count"
                            stroke="orange" strokeWidth={2} dot={false} />
                        <Line name={this.state.top5Alerts.lines.alert2} type="monotone" dataKey="alert2count" stroke="green" strokeWidth={2} />
                        <Line name={this.state.top5Alerts.lines.alert3} type="monotone" dataKey="alert3count" stroke="red" strokeWidth={2} />
                        <Line name={this.state.top5Alerts.lines.alert4} type="monotone" dataKey="alert4count" stroke="yellow" strokeWidth={2} />
                        <Line name={this.state.top5Alerts.lines.alert5} type="monotone" dataKey="alert5count" stroke="blue" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>

                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Location-Wise Alerts</Typography.Text>
                </div>

                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={this.state.locationwiseAlerts.data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        <Legend iconType="circle" iconSize={5} align="right"
                            wrapperStyle={{ width: '80%', paddingRight: '50px' }} />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name={this.state.locationwiseAlerts.lines.loc1} type="monotone" dataKey="loc1count" stroke="#8884d8" strokeWidth={2} />
                        <Line name={this.state.locationwiseAlerts.lines.loc2} type="monotone" dataKey="loc2count" stroke="red" strokeWidth={2} />
                        <Line name={this.state.locationwiseAlerts.lines.loc3} type="monotone" dataKey="loc3count" stroke="yellow" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
        console.log(this.state.top5Alerts, 'top5')

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RandDTrends);