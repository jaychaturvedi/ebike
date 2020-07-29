import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, BarChart, Bar, ReferenceLine
} from 'recharts';

const data1 = [
    {
        name: 'Cell 1', uv: 4000,
    },
    {
        name: 'Cell 2', uv: 3000,
    },
    {
        name: 'Cell 3', uv: 2000,
    },
    {
        name: 'Cell 4', uv: 2780,
    },
    {
        name: 'Cell 5', uv: 1890,
    },
    {
        name: 'Cell 6', uv: 2390,
    },
];
const data2 = [
    {
        name: 'Cell 7', uv: 4000,
    },
    {
        name: 'Cell 8', uv: 3000,
    },
    {
        name: 'Cell 9', uv: 2000,
    },
    {
        name: 'Cell 10', uv: 2780,
    },
    {
        name: 'Cell 11', uv: 1890,
    },
    {
        name: 'Cell 12', uv: 2390,
    },
];
interface CellBatteryGraphProps { }

interface CellBatteryGraphStates { }
class CellBatteryGraph extends PureComponent<CellBatteryGraphProps, CellBatteryGraphStates> {
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
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>12 Cell Battery Pack Info</Typography.Text>
                </div>
                <ResponsiveContainer width="100%" height="50%">
                    <BarChart
                        data={data1}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }}
                        maxBarSize={50}
                    >
                        <XAxis dataKey="name" padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} hide={false} />
                        <YAxis tick={{ fill: 'white' }} orientation="right" />
                        {/* <Tooltip /> */}
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <Bar dataKey="uv" fill="green" background={{ fill: '#2D3456' }} radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height="50%">
                    <BarChart
                        data={data2}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }}
                        maxBarSize={50}
                    >
                        <XAxis dataKey="name" padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} />
                        <YAxis tick={{ fill: 'white' }} orientation="right" />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Legend />
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        {/* <ReferenceLine y={3200} stroke="#000" /> */}

                        <Bar dataKey="uv" fill="green" background={{ fill: '#2D3456' }} radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <span>Max Cell Voltage : 3.888v </span><span>Cell Position : 3</span>  </div>
                    <div style={{ width: '20px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <span>Min Cell Voltage : 3.888v </span><span>Cell Position : 2</span>  </div>
                    <div style={{ width: '20px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <span><Typography.Text style={{ color: "#fcc84a", fontSize: '13px' }} strong>Voltage Difference : 0.900V
                        </Typography.Text>
                        </span> </div>
                </div></div>
        )
    }

}

export default CellBatteryGraph;