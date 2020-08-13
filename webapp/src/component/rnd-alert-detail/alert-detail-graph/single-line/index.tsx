import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, ReferenceLine
} from 'recharts';


const CustomizedDot = (props: any) => {
    const {
        cx, cy, stroke, payload, value, L1
    } = props;

    if (value === L1) {
        return (

            <svg xmlns="http://www.w3.org/2000/svg" x={cx - 5} y={cy - 10} width={20} height={20} fill="red">
                {/* <polygon points="0,0 10,0 5,10" /> */}
                <polygon points="6 2, 12 12, 0 12" />
            </svg>
        );
    }
    return (
        <svg></svg>
    );

};
interface AlertDetailGraphProps { data: any }

interface AlertDetailGraphStates { }
class AlertDetailGraph extends PureComponent<AlertDetailGraphProps, AlertDetailGraphStates> {
    DynamicLabel = (props: any) => {
        return (
            <text
                style={{ fontSize: "12px" }}
                x={props.viewBox.x + props.viewBox.width / 2}
                y={props.viewBox.y + props.viewBox.height + 5}
                text-anchor="middle"
                fill="#ffffff"
                fontFamily='Roboto'
            >
                {props.value}
            </text>
        );
    }

    render() {
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>Low Mileage</Typography.Text>
                </div>
                {/* <LineGraph/> */}
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%' }} >
                    <ResponsiveContainer width="95%" height="95%">
                        <LineChart
                            data={this.props.data}
                            margin={{
                                top: 0, right: 0, left: 0, bottom: 0,
                            }}
                        >
                            <Legend wrapperStyle={{ top: -18, left: 30 }} iconType="circle" iconSize={10} />
                            <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
                            <ReferenceLine y={35} stroke="white" strokeDasharray="3 3 5 2"
                                isFront={true} >
                                <Label position={'insideBottomLeft'} fill="#ffffff"
                                    style={{
                                        fontSize: '8px', textAnchor: 'center', fontFamily: 'Roboto'
                                    }} value="L1">
                                </Label>
                            </ReferenceLine>
                            {/* <XAxis orientation='top' stroke='#ffffff' tick={false} /> */}
                            <XAxis dataKey="nocycles" tick={{ fill: 'white' }} stroke='#ffffff' interval="preserveEnd" padding={{ left: 30, right: 20 }}>
                                <Label
                                    value="No. of Cycles"
                                    position="bottom"
                                    offset={0}
                                    style={{ padding: 5 }}
                                    content={props => { return this.DynamicLabel(props) }}
                                />
                            </XAxis>
                            <YAxis tick={{ fill: 'white' }} padding={{ top: 20, bottom: 30 }} domain={[5, 50]} stroke='#ffffff'>
                                <Label angle={270} position='left' offset={-20} fill="#ffffff"
                                    style={{
                                        fontSize: '12px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value="Mileage (KM)">
                                </Label>
                            </YAxis>
                            <Line name="Specified Mileage" type="monotone" dataKey="smilage" stroke="#8884d8" strokeWidth={3} dot={<CustomizedDot L1={35} />} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div >
        )
    }

}

export default AlertDetailGraph;