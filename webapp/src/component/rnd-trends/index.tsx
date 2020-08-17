import './index.scss';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TtrendTotalAlerts, TtrendLocationWise, TtrendTop5Alert, Alert } from "../../connectm-client/redux/models";
import { State } from "../../connectm-client/redux/connectm-state";
import React, { PureComponent } from 'react';
import moment from "moment";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush,
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
    reload: boolean,
    startDate: string,
    endDate: string,
    clickCount: number,
    zoom: number
}
let data: object[] = []
for (let i = 1; i <= 31; i++) {
    data.push({ date: `2020-07-${i}`, count: i % 3 ? 200 : 100 })
}
const re = data.sort((a: any, b: any): any => {
    return a["date"] > b["date"]
})

class RandDTrends extends PureComponent<RandDTrendsProps, RandDTrendsStates> {
    constructor(props: RandDTrendsProps) {
        super(props);
        this.state = {
            clickCount: 0,
            trendsPeriod: "Last 7 Days",
            totalAlerts: [],
            locationwiseAlerts: { lines: {}, data: [] },
            top5Alerts: { lines: {}, data: [] },
            zoom: 0,
            xAxis: 7,
            reload: true,
            startDate: moment().subtract(7, 'd').format("YYYY-MM-DD HH:mm:ss"),
            endDate: moment().format("YYYY-MM-DD HH:mm:ss")
        }
    }

    static getDerivedStateFromProps(props: RandDTrendsProps, state: RandDTrendsStates) {
        if (state.reload) {
            const data = props.getAlertTrends({
                type: "GET_ALERT_TRENDS",
                payload: {
                    alertType: 'smart',
                    startDate: state.startDate,
                    endDate: state.endDate,
                    trendsZoom: state.zoom
                }
            })
            state.reload = false;
        }
        state.totalAlerts = props.trendTotalAlert.sort((a: any, b: any): any => {
            return a["date"] - b["date"] ? 1 : -1
        })
        state.top5Alerts = {
            lines: props.trendTop5Alert.lines,
            data: props.trendTop5Alert.data.sort((a: any, b: any): any => {
                return a["date"] - b["date"] ? 1 : -1
            })
        }
        state.locationwiseAlerts = {
            lines: props.trendLocationWise.lines, data: props.trendLocationWise.data.sort((a: any, b: any): any => {
                return a["date"] - b["date"] ? 1 : -1
            })
        }
        state.zoom = props.trendsZoom
        // console.log(props.trendsZoom, "trends zoom");
        return state
    }

    handlePeriodChange = (e: any) => {
        let dateTo
        let dateFrom
        if (e.key == "Last 30 Days") {
            dateTo = moment().format("YYYY-MM-DD HH:mm:ss");
            dateFrom = moment().subtract(30, 'd').format("YYYY-MM-DD HH:mm:ss");
        } else {
            dateTo = moment().format("YYYY-MM-DD HH:mm:ss");
            dateFrom = moment().subtract(7, 'd').format("YYYY-MM-DD HH:mm:ss");
        }
        this.setState({
            trendsPeriod: e.key,
            startDate: dateFrom,
            endDate: dateTo,
            reload: !this.state.reload
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
        return label == this.state.endDate ?
            moment(`${label}`).format('DD').toString() + moment(`${label}`).format('ll').toString().split(' ')[0] :
            moment(`${label}`).format('DD')
    }
    handleZoom = () => {
        const { clickCount, totalAlerts, top5Alerts, locationwiseAlerts } = this.state
        let trendsZoom = this.state.zoom
        // console.log("im clicked");
        if (clickCount == 0) {
            // this.setState({ zoom: 4, clickCount: clickCount + 1 })
            trendsZoom = 4
        }
        if (clickCount == 1) {
            // this.setState({ zoom: 2, clickCount: clickCount + 1 })
            trendsZoom = 2
        }
        if (clickCount == 2) {
            // this.setState({ zoom: 0, clickCount: 0 })
            trendsZoom = 0
        }
        this.setState({ totalAlerts: { ...totalAlerts } })
        this.props.updateAlertTrends({
            type: "UPDATE_ALERT_TRENDS",
            payload: {
                trendLocationWise: this.state.locationwiseAlerts,
                trendTop5Alert: this.state.top5Alerts,
                trendTotalAlert: this.state.totalAlerts,
                trendsZoom: trendsZoom
            }
        })
    }

    render() {

        return <>
            <div className="connectm-RandDTrends" onClick={this.handleZoom}>
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
                    <LineChart margin={{ top: 10, right: 10, left: -30, bottom: 0 }} syncId="anyId"
                        data={data}>
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval={5} padding={{ left: 20, right: 20 }} minTickGap={1}
                            tickFormatter={(label) => this.formatDate(label)} />
                        {/* <Tooltip /> */}
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name="line 1" type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={false} />
                        <Brush padding={{ bottom: 10 }}
                            // dataKey='loc1count'
                            fill="#131731"
                            height={15}
                            stroke="#3C4473"
                            startIndex={0}
                            endIndex={0} />
                    </LineChart>
                </ResponsiveContainer>

                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Top 5 Alerts</Typography.Text>
                </div>

                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={this.props.trendTop5Alert.data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
                        syncId="anyId">
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        <Legend iconType="circle" iconSize={5}
                            wrapperStyle={{ width: '90%', marginLeft : "20%"}} />
                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name={this.state.top5Alerts.lines.alert1} type="monotone" dataKey="alert1count"
                            stroke="orange" strokeWidth={2} dot={false} />
                        <Line name={this.state.top5Alerts.lines.alert2} type="monotone" dataKey="alert2count" stroke="green" strokeWidth={2}
                            isAnimationActive={true} animationEasing={'ease-in-out'} animationDuration={100} dot={false} />
                        <Line name={this.state.top5Alerts.lines.alert3} type="monotone" dataKey="alert3count" stroke="red" strokeWidth={2} dot={false} />
                        <Line name={this.state.top5Alerts.lines.alert4} type="monotone" dataKey="alert4count" stroke="yellow" strokeWidth={2} dot={false} />
                        <Line name={this.state.top5Alerts.lines.alert5} type="monotone" dataKey="alert5count" stroke="blue" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>

                <div className={"title-header"}>
                    <Typography.Text strong style={{ paddingLeft: "10px" }} >Location-Wise Alerts</Typography.Text>
                </div>

                <ResponsiveContainer width="100%" height="28%">
                    <LineChart data={this.props.trendLocationWise.data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
                        syncId="anyId">
                        <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
                        <XAxis dataKey="date" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 20, right: 20 }}
                            tickFormatter={(label) => this.formatDate(label)} />
                        <Legend iconType="circle" iconSize={5} align="right"
                            wrapperStyle={{ width: '80%', paddingRight: '50px' }} />

                        <YAxis type="number" domain={[0, 100]} tick={{ fill: 'white' }} stroke='#131731' />
                        <Line name={this.state.locationwiseAlerts.lines.loc1} type="monotone" dataKey="loc1count" stroke="#8884d8" strokeWidth={2} dot={false} />
                        <Line name={this.state.locationwiseAlerts.lines.loc2} type="monotone" dataKey="loc2count" stroke="red" strokeWidth={2} dot={false} />
                        <Line name={this.state.locationwiseAlerts.lines.loc3} type="monotone" dataKey="loc3count" stroke="yellow" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
        // console.log(this.state.top5Alerts, 'top5')

    }
    scale(endIndex: any) {
        throw new Error("Method not implemented.");
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RandDTrends);