import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, BarChart, Bar, ReferenceLine, Cell
} from 'recharts';
import { FileExcelFilled } from '@ant-design/icons';

const data1 = [
    {
        name: 'Cell 1', uv: 4.300,
    },
    {
        name: 'Cell 2', uv: 4.200,
    },
    {
        name: 'Cell 3', uv: 4.000,
    },
    {
        name: 'Cell 4', uv: 3.000,
    },
    {
        name: 'Cell 5', uv: 2.300,
    },
    {
        name: 'Cell 6', uv: 4.200,
    },
    {
        name: 'Cell 7', uv: 3.500,
    },
    {
        name: 'Cell 8', uv: 3.200,
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
];
const data2 = [

    {
        name: 'Cell 9', uv: 4.300,
    },
    {
        name: 'Cell 10', uv: 2.900,
    },
    {
        name: 'Cell 11', uv: 4.000,
    },
    {
        name: 'Cell 12', uv: 3.400
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
    {
        name: '',
    },
];
interface CellBatteryGraphProps { }

interface CellBatteryGraphStates { }
class CellBatteryGraph extends PureComponent<CellBatteryGraphProps, CellBatteryGraphStates> {
    DynamicLabel = (props: any) => {
        return (
            <text
                style={{ fontSize: "7px" }}
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
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                    <div style={{ display: 'flex', justifyContent: 'center', height: '50%', width: '95%', flexDirection: 'row', alignItems: 'center' }} >
                        <pre style={{ fontSize: 8, textAlign: 'center' }}>Normal<br />Oprating<br />Voltage<br />
                        Range<br />(a)</pre>
                        <ResponsiveContainer className="top-graph-container" width="95%" height="100%">
                            <BarChart
                                data={data1}
                                margin={{
                                    top: 10, right: 0, left: 0, bottom: 0,
                                }}
                                maxBarSize={25}
                                style={{ fontSize: '7px' }}

                            >
                                <XAxis dataKey="name" padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} />
                                <YAxis tick={{ fill: 'white' }} orientation="right" allowDecimals={true} tickCount={5}
                                    domain={['dataMin', 'dataMax']} ticks={[2.000, 3.001, 3.730, 3.880, 4.201]} />
                                {/* <Tooltip /> */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <ReferenceLine y={3.880} stroke="#717171" strokeDasharray="3 3 5 2" dx={25}
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px'
                                        }} value="3.880 Max">
                                    </Label>
                                </ReferenceLine>
                                <ReferenceLine y={3.500} stroke="#717171" strokeDasharray="3 3 5 2" dx={25}
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px'
                                        }} value="3.730 Min">
                                    </Label>
                                </ReferenceLine>
                                <Bar dataKey="uv" radius={[10, 10, 0, 0]} fill='#86eb34' >
                                    {data1.map((entry: any, index) => (
                                        <Cell fill={entry.uv <= 2.500 ? 'red' : '#86eb34'} />
                                    ))}
                                </Bar>
                            </BarChart>

                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', height: '50%', width: '95%', flexDirection: 'row', alignItems: 'center' }} >
                        <pre style={{ fontSize: 8, textAlign: 'center' }}>Normal<br />Oprating<br />Voltage<br />
                        Range<br />(b)</pre>
                        <ResponsiveContainer className="bottom-graph-container" width="95%" height="100%" >
                            <BarChart
                                data={data2}
                                margin={{
                                    top: 10, right: 0, left: 0, bottom: 0,
                                }}
                                maxBarSize={25}
                                style={{ fontSize: '7px' }}
                            >
                                <XAxis dataKey="name" padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} />
                                <YAxis tick={{ fill: 'white', }} orientation="right"
                                    ticks={[2.000, 3.001, 3.730, 3.880, 4.201]} domain={['dataMin - 0.005', 'dataMax + 0.005']} />
                                {/* <Tooltip /> */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <ReferenceLine y={3.880} stroke="#717171" strokeDasharray="3 3 5 2" dx={25}
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px', paddingTop: '10px'
                                        }} value="3.880 Max">
                                    </Label>
                                </ReferenceLine>
                                <ReferenceLine y={3.500} stroke="#717171" strokeDasharray="3 3 5 2" dx={25}
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px', paddingTop: '10px'
                                        }} value="3.730 Min">
                                    </Label>
                                </ReferenceLine>
                                <Bar dataKey="uv" fill="#86eb34" radius={[10, 10, 0, 0]} >
                                    {data2.map((entry, index) => (
                                        <Cell fill={entry.uv! <= 3.000 ? 'red' : '#86eb34'} />
                                    ))}
                                </Bar>
                            </BarChart>

                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '10px' }}>
                            <span>Max Cell Voltage : 3.888v </span><span>Cell Position : 3</span>  </div>
                        <div style={{ width: '20px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '10px' }}>
                            <span>Min Cell Voltage : 3.888v </span><span>Cell Position : 2</span>  </div>
                        <div style={{ width: '20px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span><Typography.Text style={{ color: "#fcc84a", fontSize: '12px' }} strong>Voltage Difference : 0.900V
                        </Typography.Text>
                            </span> </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CellBatteryGraph;