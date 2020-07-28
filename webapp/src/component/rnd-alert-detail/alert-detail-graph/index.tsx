import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text
} from 'recharts';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];
interface AlertDetailGraphProps { }

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
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }}
                    >
                        <Legend wrapperStyle={{ top: -18, left: 30 }} />
                        <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
                        <XAxis dataKey="name" tick={{ fill: 'white' }} interval="preserveEnd" padding={{ left: 30, right: 20 }}>
                            <Label
                                value="No. of Cycles"
                                position="bottom"
                                offset={0}
                                content={props => { return this.DynamicLabel(props) }}
                            />                        </XAxis>
                        <YAxis tick={{ fill: 'white', color: 'white' }} padding={{ top: 20, bottom: 30 }}>
                            <Label angle={270} position='left' offset={-10} fill="#ffffff"
                                style={{
                                    fontSize: '12px', textAnchor: 'middle', fontFamily: 'Roboto'
                                }} value="Mileage (KM)">
                            </Label>
                        </YAxis>
                        <Tooltip />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 6 }} strokeWidth={3} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        )
    }

}

export default AlertDetailGraph;