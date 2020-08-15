import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, ReferenceLine, Brush
} from 'recharts';
import moment from 'moment';


const CustomizedDot = (props: any) => {
    const {
        cx, cy, stroke, payload, value, L1
    } = props;

    if (value >= L1) {
        return (
            <svg x={cx - 5} y={cy - 10} width={20} height={20} fill="red">
                {/* <polygon points="0,0 10,0 5,10" /> */}
                <polygon points="6 2, 12 12, 0 12" />
            </svg>
        );
    }
    return (
        <svg></svg>
    );

};
interface AlertDetailGraphProps {
    data: any; line1StrokeColor?: string, L1?: number,
    xAxisLabel?: string, yAxisLabel?: string, line1Name?: string, refColor?: string,
    dataKey?: string, line1Key?: string, title: string
}

interface AlertDetailGraphStates { }
class AlertDetailGraph extends PureComponent<AlertDetailGraphProps, AlertDetailGraphStates> {
    DynamicLabel = (props: any) => {
        return (
            <text
                style={{ fontSize: "12px" }}
                x={props.viewBox.x + props.viewBox.width / 2}
                y={props.viewBox.y + props.viewBox.height - 5}
                textAnchor="middle"
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
        return this.props.xAxisLabel == "Time" ? moment(`${label}`).format("hh:mm a") : label
    }

    render() {
        console.log(this.props.data, "graph data");
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>{this.props.title}</Typography.Text>
                </div>
                {/* <LineGraph/> */}
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%' }} >
                    <ResponsiveContainer width="95%" height="95%">
                        <LineChart
                            data={this.props.data}
                            margin={{
                                top: 10, right: 10, left: -10, bottom: 0,
                            }}>
                            <Legend wrapperStyle={{ top: -18, left: 30 }} iconType="circle" iconSize={10} />
                            <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
                            {this.props.L1 ? <ReferenceLine y={this.props.L1} stroke={this.props.refColor} strokeDasharray="3 3 5 2"
                                isFront={true} >
                                <Label position={'insideBottomLeft'} fill="#ffffff"
                                    style={{
                                        fontSize: '8px', textAnchor: 'center', fontFamily: 'Roboto'
                                    }} value="L1">
                                </Label>
                            </ReferenceLine> : ''}
                            {/* <Brush /> */}
                            {/* <XAxis orientation='top' stroke='#ffffff' tick={false} /> */}
                            <XAxis dataKey={this.props.dataKey} height={35} tickFormatter={(label) => this.formatDate(label)}
                                // ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]}
                                // domain={[100, 1200]}
                                tick={{ fill: 'white' }} stroke='#ffffff' padding={{ left: 30, right: 20 }}>
                                <Label
                                    value={this.props.xAxisLabel}
                                    position="bottom"
                                    offset={-18}
                                    style={{ padding: 5 }}
                                    content={props => { return this.DynamicLabel(props) }} />
                            </XAxis>
                            <YAxis tick={{ fill: 'white' }}
                                ticks={[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]} interval={1}
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
                                endIndex={this.props.data.length - 1} />
                            <Line name={this.props.line1Name} type="monotone" dataKey={this.props.line1Key as string}
                                stroke={this.props.line1StrokeColor} strokeWidth={3} dot={<CustomizedDot L1={this.props.L1} />} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div >
        )
    }

}

export default AlertDetailGraph;