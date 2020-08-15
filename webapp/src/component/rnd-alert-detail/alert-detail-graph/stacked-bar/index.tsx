import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, BarChart, Bar, ReferenceLine, Cell, Brush
} from 'recharts'
import { FileExcelFilled } from '@ant-design/icons';
import { mapDispatchToProps, mapStateToProps, ReduxAlertGraphActions, ReduxAlertGraphState } from "../../../../connectm-client/actions/graph"
import { connect } from 'react-redux';
import moment from 'moment';
// import { TlowMileageGraph, TvehicleUsageGraph } from '../../../../connectm-client/redux/connectm-state';

const data1 = [
    { name: '29 June', uv: 4000, pv: 2400, amt: 2400, },
    { name: '30th', uv: 4000, pv: 2400, amt: 2400, },
    { name: '1st July', uv: 4000, pv: 2400, amt: 2400, },
    { name: '2nd', uv: 3000, pv: 1398, amt: 2210, },
    { name: '3rd', uv: 2000, pv: 9800, amt: 2290, },
    { name: '4th', uv: 2780, pv: 3908, amt: 2000, },
    { name: '5th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '6th', uv: 2390, pv: 3800, amt: 2500, },
    { name: '7th', uv: 3490, pv: 4300, amt: 2100, },
    { name: '8th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '9th', uv: 2000, pv: 9800, amt: 2290, },
    { name: '10th', uv: 2780, pv: 0, amt: 2000, color: 'red' },
    { name: '11th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '12th', uv: 2000, pv: 9800, amt: 2290, },
    { name: '13th', uv: 2780, pv: 3908, amt: 2000, },
    { name: '14th', uv: 1890, pv: 4800, amt: 2181, },
    { name: '15th', uv: 3490, pv: 4300, amt: 2110, },
];

interface StackedGraphProps {
    data: any; bar1StrokeColor: string; bar2StrokeColor: string, L1?: number, L2?: number,
    xAxisLabel: string, yAxisLabel: string, bar1Name: string, bar2Name: string, refColor?: string,
    dataKey: string, bar1Key: string, bar2Key: string, title: string
}

interface StackedGraphStates {
    reload: boolean,
}

class StackedGraph extends PureComponent<StackedGraphProps, StackedGraphStates> {

    constructor(props: StackedGraphProps) {
        super(props);
        this.state = {
            reload: true,
        }
    }
    DynamicLabel = (props: any) => {
        return (
            <text
                style={{ fontSize: "7px" }}
                x={props.viewBox.x + props.viewBox.width / 2}
                y={props.viewBox.y + props.viewBox.height + 5}
                text-anchor="middle"
                fill="#ffffff"
                fontFamily='Roboto'>
                {props.value}
            </text>
        );
    }

    formatDate = (label: any) => {
        console.log("label", label)
        console.log(moment(`${label}`).format('hh:mm a'));
        // if ("Last 7 Days" === this.state.trendsPeriod)
        //     return moment(`${label}`).format('dddd').slice(0, 3).toUpperCase()
        return moment(`${label}`).format('DD').toString() + moment(`${label}`).format('ll').toString().split(' ')[0]
    }

    render() {
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>{this.props.title}</Typography.Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                    <ResponsiveContainer className="top-graph-container" width="95%" height="100%">
                        <BarChart
                            data={this.props.data}
                            margin={{
                                top: 10, right: 0, left: 0, bottom: 0,
                            }}
                            maxBarSize={25}
                            style={{ fontSize: '8px' }}>
                            <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
                            <Legend wrapperStyle={{ top: -18, left: 30, }} iconType="circle" iconSize={10} />
                            <XAxis dataKey={this.props.dataKey} height={35} tickFormatter={(label) => this.formatDate(label)}
                                tick={{ fill: 'white' }} stroke='#ffffff' padding={{ left: 20, right: 20 }}>
                                <Label
                                    value={this.props.xAxisLabel}
                                    position="bottom"
                                    offset={-18}
                                    style={{ padding: 5 }}
                                    content={props => { return this.DynamicLabel(props) }} />
                            </XAxis>
                            <YAxis tick={{ fill: 'white' }}
                                ticks={[5, 10, 15, 20, 25,]} interval={0}
                                padding={{ top: 10, bottom: 10 }} stroke='#ffffff'>
                                <Label angle={270} position='left' offset={-20} fill="#ffffff"
                                    style={{
                                        fontSize: '12px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value={this.props.yAxisLabel}>
                                </Label>
                            </YAxis>
                            <Brush
                                dataKey={this.props.dataKey}
                                fill="#131731"
                                height={12}
                                stroke="#3C4473"
                                startIndex={0}
                                endIndex={0} />
                            {/* <Tooltip /> */}
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <Bar name={this.props.bar1Name} dataKey={this.props.bar1Key!}
                                stackId="a" isAnimationActive={true}>
                                {this.props.data.map((entry: any, index: number) => (
                                    <Cell fill={this.props.data[index].activeTime == 0 ? 'red' : this.props.bar1StrokeColor} key={index} />
                                ))}
                            </Bar>
                            <Bar name={this.props.bar2Name} dataKey={this.props.bar2Key!} stackId="a" fill="#4888ff" isAnimationActive={true}>
                                {this.props.data.map((entry: any, index: number) => (
                                    <Cell fill={(this.props.data[index].alert == 1) ? 'red' : this.props.bar2StrokeColor} key={index} />
                                ))}
                            </Bar>
                        </BarChart>

                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

}

export default StackedGraph;