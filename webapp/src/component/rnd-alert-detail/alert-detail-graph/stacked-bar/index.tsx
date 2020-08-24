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

interface StackedGraphProps {
    data: any; bar1StrokeColor: string; bar2StrokeColor: string, L1?: boolean,
    xAxisLabel: string, yAxisLabel: string, bar1Name: string, bar2Name: string, refColor?: string,
    dataKey: string, bar1Key: string, bar2Key: string, title: string, alertCleared?: boolean, alertDate: string
}

interface StackedGraphStates {
    data: any, L1Value: number,
    xAxisLabel: string, yAxisLabel: string, bar1Name: string, bar2Name: string, refColor?: string,
    dataKey: string, bar1Key: string, bar2Key: string, title: string
}

class StackedGraph extends PureComponent<StackedGraphProps, StackedGraphStates> {
    constructor(props: StackedGraphProps) {
        super(props);
        this.state = {
            data: [{ a: 0, b: 0, c: 0 }],
            dataKey: 'a',
            xAxisLabel: "X Label",
            yAxisLabel: "Y Label",
            title: "Graph Name",
            L1Value: 0,
            refColor: "white",
            bar1Name: 'legend 1',
            bar2Name: 'legend 2',
            bar1Key: "b",
            bar2Key: "c"
        }
    }

    static getDerivedStateFromProps(props: StackedGraphProps, state: StackedGraphStates) {
        let data = state.data
        if (props.data != undefined) {
            data = props.data;
            state.L1Value = props.L1 ? props.data[0].L1 : 0;
            state.xAxisLabel = props.xAxisLabel;
            state.yAxisLabel = props.yAxisLabel;
            state.refColor = props.refColor;
            state.dataKey = props.dataKey;
            state.bar1Key = props.bar1Key;
            state.bar2Key = props.bar2Key;
            state.bar1Name = props.bar1Name;
            state.bar2Name = props.bar2Name;
        }
        state.data = data
        console.log(state.data, props.alertDate, "graph mount");
        return state
    }

    DynamicLabel = (props: any) => {
        return (
            <text
                style={{ fontSize: "12px" }}
                x={props.viewBox.x + props.viewBox.width / 2}
                y={props.viewBox.y + props.viewBox.height - 5}
                text-anchor="middle"
                fill="#ffffff"
                fontFamily='Roboto'>
                {props.value}
            </text>
        );
    }

    formatDate = (label: any) => {
        return this.props.xAxisLabel == "Days"
            ? this.state.data[0].timeDate === label
                ? moment(`${label}`).format("DD MMM YYYY")
                : moment(`${label}`).format("DD")
            : label
        // return moment(`${label}`).format('DD').toString() + moment(`${label}`).format('ll').toString().split(' ')[0]
    }
    CustomTooltip = (obj: any) => {
        const { label, payload, active } = obj;
        if (!active || !label || payload.length === 0 || this.props.data === undefined) return label;
        const style = { top: obj.viewBox.y - 20, color: "#ffffff", zIndex: 10, padding: '0px' };
        if (active) {
            return (
                <div className="custom-tooltip" style={style}>
                    <p className="label">{`${payload[1].name}: ${payload[1].value}`}</p>
                    <p className="label">{`${payload[0].name}: ${payload[0].value}`}</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>

                </div>
            );
        }
        return null;
    };

    render() {
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>{this.props.title}</Typography.Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                    <ResponsiveContainer className="top-graph-container" width="95%" height="100%">
                        <BarChart
                            data={this.state.data}
                            margin={{
                                top: 10, right: 10, left: -10, bottom: 0,
                            }}
                            maxBarSize={25}
                            style={{ fontSize: '8px' }}>
                            <Tooltip
                                content={this.CustomTooltip}
                                offset={-20}
                                // position={{ y: 0, x: 0 }} stroke: "#5FBDE0"
                                cursor={{ fill: "transparent", top: 0, }}
                            />
                            <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" vertical={false} />
                            <Legend wrapperStyle={{ top: -18, left: 30, }} iconType="circle" iconSize={10} />
                            <XAxis dataKey={this.state.dataKey} height={35} tickFormatter={(label) => this.formatDate(label)}
                                tick={{ fill: 'white' }} stroke='#ffffff' padding={{ left: 20, right: 20, }} interval={0}>
                                <Label
                                    value={this.state.xAxisLabel}
                                    position="bottom"
                                    offset={-18}
                                    content={props => { return this.DynamicLabel(props) }} />
                            </XAxis>
                            <YAxis tick={{ fill: 'white' }}
                                ticks={[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]} interval={0}
                                padding={{ top: 0, bottom: 1 }} stroke='#ffffff'>
                                <Label angle={270} position='left' offset={-20} fill="#ffffff"
                                    style={{
                                        fontSize: '12px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value={this.state.yAxisLabel}>
                                </Label>
                            </YAxis>
                            <Brush
                                dataKey={this.state.dataKey}
                                fill="#131731"
                                height={12}
                                stroke="#3C4473"
                                startIndex={0}
                                endIndex={0} />
                            {!this.props.alertCleared ?
                                <Bar name={this.state.bar2Name} dataKey={this.state.bar2Key}
                                    stackId="a" fill={this.props.bar2StrokeColor} isAnimationActive={true}>
                                    {this.state.data.map((entry: any, index: number) => (
                                        <Cell fill={(entry.timeDate === this.props.alertDate) ? 'red' : this.props.bar2StrokeColor} key={index} />
                                    ))}
                                </Bar>
                                : ''}
                            {!this.props.alertCleared ?
                                <Bar name={this.state.bar1Name} dataKey={this.state.bar1Key} fill={this.props.bar1StrokeColor} radius={[5, 5, 0, 0]}
                                    stackId="a" isAnimationActive={true}>
                                    {this.state.data.map((entry: any, index: number) => (
                                        <Cell fill={this.state.data[index][this.state.dataKey] === this.props.alertDate ? 'red' : this.props.bar1StrokeColor} key={index} />
                                    ))}
                                </Bar>
                                : ''}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

}

export default StackedGraph;