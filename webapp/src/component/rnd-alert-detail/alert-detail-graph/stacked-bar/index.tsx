import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, BarChart, Bar, ReferenceLine, Cell, Brush
} from 'recharts'
import { FileExcelFilled } from '@ant-design/icons';
import { mapDispatchToProps, mapStateToProps, ReduxAlertGraphActions, ReduxAlertGraphState } from "../../../../connectm-client/actions/graph"
import { connect } from 'react-redux';
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

interface StackedGraphProps extends ReduxAlertGraphActions, ReduxAlertGraphState {
    data: any
}

interface StackedGraphStates {
    reload: boolean,
    // lowMileage: TlowMileageGraph,
    // vehicleUsage: TvehicleUsageGraph
}
class StackedGraph extends PureComponent<StackedGraphProps, StackedGraphStates> {

    constructor(props: StackedGraphProps) {
        super(props);
        this.state = {
            reload: true,
            // lowMileage: { data: [] },
            // vehicleUsage: { data: [] }

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
                fontFamily='Roboto'
            >
                {props.value}
            </text>
        );
    }
    static getDerivedStateFromProps(props: StackedGraphProps, state: StackedGraphStates) {
        // if (state.reload) {
        //     const data = props.getAlertGraph({
        //         type: "GET_LOW_MILEAGE",
        //         payload: {
        //             alertId: 123,
        //             alertName: "voltage deviation",
        //             vehicleId: "069bcc081a68a0832f123"
        //         }
        //     })
        //     state.reload = false;
        // }
        // state.lowMileage = props.lowMileage
        // state.vehicleUsage = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
        return state
    }
    render() {
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>12 Cell Battery Pack Info</Typography.Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                    <ResponsiveContainer className="top-graph-container" width="95%" height="100%">
                        <BarChart
                            data={data1}
                            margin={{
                                top: 10, right: 0, left: 0, bottom: 0,
                            }}
                            maxBarSize={25}
                            style={{ fontSize: '8px' }}>
                            <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
                            <Legend wrapperStyle={{ top: -18, left: 30, }} iconType="circle" iconSize={10} />
                            <XAxis dataKey="name" padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} >
                                <Label position='bottom' offset={-5} fill="#ffffff"
                                    style={{
                                        fontSize: '10px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value="Days">
                                </Label>
                            </XAxis>
                            <YAxis tick={{ fill: 'white' }} domain={[5, 'auto']} stroke='#ffffff' >
                                <Label angle={270} position='left' offset={-20} fill="#ffffff"
                                    style={{
                                        fontSize: '10px', textAnchor: 'middle', fontFamily: 'Roboto'
                                    }} value="Usage (in Hrs)">
                                </Label>
                            </YAxis>

                            <Brush
                                dataKey='name'
                                fill="#131731"
                                y={255}
                                height={20}
                                stroke="#3C4473"
                                startIndex={0}
                                endIndex={10} />
                            {/* <Tooltip /> */}
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            {/* <ReferenceLine y={3.880} stroke="#717171" strokeDasharray="3 3 5 2" dx={25}
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
                                </ReferenceLine> */}
                            <Bar name="active time" dataKey="pv" stackId="a" isAnimationActive={true}>
                                {data1.map((entry: any, index) => (
                                    <Cell fill={entry.color ? 'red' : '#3C4473'} />
                                ))}
                            </Bar>
                            <Bar name="idle time" dataKey="uv" stackId="a" fill="#4888ff" isAnimationActive={true}>
                                {data1.map((entry: any, index) => (
                                    <Cell fill={(entry.pv == 0) ? 'red' : '#4888ff'} />
                                ))}
                            </Bar>
                        </BarChart>

                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(StackedGraph);