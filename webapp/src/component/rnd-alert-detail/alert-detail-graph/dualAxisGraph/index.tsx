import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, ReferenceLine, Brush
} from 'recharts';
import moment from 'moment';


const CustomizedDot = (props: any) => {
    // const {
    //     cx, cy, stroke, payload, value, L1, L2
    // } = props;

    // if (value == L2) {
    //     return (

    //         <svg x={cx - 5} y={cy - 10} width={20} height={20} fill="red">
    //             {/* <polygon points="0,0 10,0 5,10" /> */}
    //             <polygon points="6 2, 12 12, 0 12" />
    //         </svg>
    //     );
    // }
    return (
        <svg></svg>
    );

};
interface DualAxisGraphProps {
    data: any; line1StrokeColor?: string; line2StrokeColor?: string, L1?: number, L2?: number,
    xAxisLabel?: string, yAxisLabel?: string, line1Name?: string, line2Name?: string, refColor?: string,
    dataKey?: string, line1Key?: string, line2Key?: string, title?: string, rightYaxis?: boolean, rightYaxisLabel?: string,
}

interface DualAxisGraphStates { data: any }
class DoubleLineGraph extends PureComponent<DualAxisGraphProps, DualAxisGraphStates> {
    constructor(props: DualAxisGraphStates) {
        super(props);
        this.state = {
            data: props.data
        }
    }

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
        console.log(this.props.data);
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>{this.props.title}</Typography.Text>
                </div>
                {/* <LineGraph/> */}
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%' }} >
                    <ResponsiveContainer width="95%" height="95%">
                        <LineChart
                            data={this.props.data} margin={{
                                top: 10, right: -10, left: -15, bottom: 0,
                            }}>
                            <Legend wrapperStyle={{ top: -18, left: 30 }} iconType="circle" iconSize={10} />
                            <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
                            <XAxis dataKey={this.props.dataKey} height={35} tickFormatter={(label) => this.formatDate(label)}
                                tick={{ fill: 'white' }} stroke='#ffffff' interval="preserveEnd" padding={{ left: 30, right: 20 }}>
                                <Label
                                    value={this.props.xAxisLabel}
                                    position={"centerBottom"}
                                    offset={-22}
                                    style={{ padding: 5 }}
                                    content={props => { return this.DynamicLabel(props) }}
                                />
                            </XAxis>
                            <YAxis tick={{ fill: 'white' }} yAxisId="left" stroke='#ffffff' dataKey={this.props.line1Key as string}>
                                <Label angle={270} position='left' offset={-30} fill="#ffffff"
                                    style={{
                                        fontSize: '12px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value={this.props.yAxisLabel}>
                                </Label>
                            </YAxis>
                            {/* {this.props.L1 ? <ReferenceLine y={this.props.L1} stroke={this.props.refColor} strokeDasharray="3 3 5 2"
                                isFront={true} >
                                <Label position={'insideBottomLeft'} fill="#ffffff"
                                    style={{
                                        fontSize: '8px', textAnchor: 'center', fontFamily: 'Roboto'
                                    }} value="L1">
                                </Label>
                            </ReferenceLine> : ''} */}
                            <YAxis tick={{ fill: 'white' }} yAxisId="right" stroke='#ffffff' orientation="right"
                                dataKey={this.props.line2Key as string} >
                                <Label angle={270} position='right' offset={-30} fill="#ffffff"
                                    style={{
                                        fontSize: '12px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value={this.props.rightYaxisLabel}>
                                </Label>
                            </YAxis>
                            <Brush
                                dataKey='nocycles'
                                fill="#131731"
                                height={12}
                                stroke="#3C4473"
                                startIndex={0}
                                endIndex={0} />
                            <Line yAxisId="left" name={this.props.line1Name} type="monotone" dataKey={this.props.line1Key as string}
                                stroke={this.props.line1StrokeColor} strokeWidth={3} dot={<CustomizedDot L1={this.props.L1} />} />

                            <Line yAxisId="right" name={this.props.line2Name} type="monotone" dataKey={this.props.line2Key as string}
                                stroke={this.props.line2StrokeColor} strokeWidth={3} dot={<CustomizedDot L1={this.props.L2} />} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div >
        )
    }

}

export default DoubleLineGraph;