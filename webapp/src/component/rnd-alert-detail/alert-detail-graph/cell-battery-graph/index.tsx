import './index.scss';
import { Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, Tooltip, Label, ResponsiveContainer, BarChart, Bar, ReferenceLine, Cell
} from 'recharts';
import VoltageDifference from './voltageDifference';

const volatgeDeviationData = {
    "cell1": 3.0001,
    "cell2": 3.001,
    "cell3": 3.001,
    "cell4": 3.001,
    "cell5": 3.001,
    "cell6": 3.001,
    "cell7": 3.001,
    "cell8": 3.001,
    "cell9": 3.001,
    "cell10": 3.001,
    "cell11": 3.001,
    "cell12": 3.001,
    "volatgeDiffer": 0
}

interface CellBatteryGraphProps {
    data: any, title?: string, dataKey: string,
    barDataKey: string, minL1: number, maxL2: number, alertCleared?: boolean,
}

interface CellBatteryGraphStates {
    data: any
    data1?: any, data2?: any,
    voltageDelta: number,
    maxVolt: number,
    minVolt: number,
    maxCellPos: number,
    minCellPos: number
}
class CellBatteryGraph extends PureComponent<CellBatteryGraphProps, CellBatteryGraphStates> {

    constructor(props: CellBatteryGraphProps) {
        super(props)
        this.state = {
            data: volatgeDeviationData,
            data1: [],
            data2: [],
            voltageDelta: 0,
            maxVolt: 0,
            minVolt: 0,
            maxCellPos: 0,
            minCellPos: 0
        }
    }
    static getDerivedStateFromProps(props: CellBatteryGraphProps, state: CellBatteryGraphStates) {
        let data = state.data
        if (props.data !== undefined) {
            data = props.data
        }
        const keys = Object.keys(data)//["cell1","cell2","cell3","voltage difference"]
        const voltageDelta = keys.splice(-1)[0]
        let arr1: { name: string; value: any; }[] = [];
        let arr2: { name: string; value?: any; }[] = [];
        let max = 0; let min = 100; let maxPos = 0; let minPos = 0

        const datas1 = keys.map((i, j) => {
            if (data[i] >= max) {
                max = data[i]
                maxPos = j
            }
            if (data[i] < min) {
                min = data[i]
                minPos = j
            }
            j < 8 ? arr1.push({ 'name': i, 'value': data[i] }) : arr2.push({ 'name': i, 'value': data[i] })
        })
        arr2.push({ 'name': 'empty', }, { 'name': 'empty' }, { 'name': 'empty' }, { 'name': 'empty' })

        for (let i = 0; i < 2; i++) {
            arr1.push({ 'name': 'empty', 'value': 3.001 });
            arr2.push({ 'name': 'empty', 'value': 3.001 })
        }

        state.data1 = arr1;
        state.data2 = arr2;
        state.maxVolt = max;
        state.minVolt = min;
        state.maxCellPos = maxPos + 1;
        state.minCellPos = minPos + 1;
        state.voltageDelta = (max - min)
        // console.log(arr1, arr2, min, max, minPos, maxPos, data[voltageDelta], "formatted");
        console.log(state, "graph cell in func");
        return state
    }
    tooltipContent(tooltipProps: any) {
        return <div>items: {tooltipProps.payload.length}</div>
    }
    CustomTooltip = (obj: any) => {
        const { label, payload, active } = obj;
        if (!active || !label || !payload) return label;
        const style = {
            top: obj?.viewBox.y - 20,
            color: "#5FBDE0",
            zIndex: 10
        };
        if (active) {
            if (label === "empty") {
                return (<div><p></p></div>)
            }
            else
                return (
                    <div className="custom-tooltip" style={style}>
                        <p className="label">{`${payload[0]?.value ? payload[0]?.value.toFixed(3) + " V" : ''}`}</p>
                        <span className="intro">&nbsp;</span>
                        <span className="desc">&nbsp;</span>
                        <span className="intro">&nbsp;</span>
                        <span className="desc">&nbsp;</span>
                        <span className="intro">&nbsp;</span>
                    </div>
                );
        }
        return null;
    };

    render() {
        console.log(this.state, "rendered test graph cell");
        return (
            <div className="connectm-AlertDetailGraph voltage-deviation">
                <div className={"connectm-header"}>
                    <Typography.Text className="graph-header-text" strong>{this.props.title}</Typography.Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                    <div className="voltage-deviation-top" >
                        <pre className="normal-operating-voltage-text">Normal<br />Oprating<br />Voltage<br />
                        Range<br />(a)</pre>
                        <ResponsiveContainer className="top-graph-container" width="95%" height="100%">
                            <BarChart
                                data={this.state.data1}
                                margin={{
                                    top: 10, right: 0, left: 0, bottom: 0,
                                }} maxBarSize={25} style={{ fontSize: '7px' }} barGap={50}>
                                <XAxis dataKey={this.props.dataKey} padding={{ left: 10, right: 10 }}
                                    axisLine={false} tickLine={false}
                                    tick={{ fill: 'white' }} allowDecimals={true} />
                                <YAxis dataKey={this.props.dataKey} tick={{ fill: 'white' }}
                                    tickLine={false}
                                    ticks={[3.001, 3.700, 3.730, 3.760, 3.780, 3.800, 3.850, 3.900, 4.100, 4.201, 4.300]}
                                    orientation="right"
                                    tickFormatter={(label) => {
                                        if (label === 3.001) return label + " volt"
                                        else return label
                                    }}
                                    domain={['dataMin', 'dataMax']} interval={8} scale="sqrt" />
                                <Tooltip
                                    content={this.CustomTooltip}
                                    offset={-17}
                                    // position={{ y: 0, x: 0 }} stroke: "#5FBDE0"
                                    viewBox={{ x: 5, y: 5, height: 50, width: 20 }}
                                    cursor={{ fill: "transparent", top: 0, }}
                                />
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <ReferenceLine y={this.props.maxL2} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', paddingRight: '-50px'
                                        }} value={this.props.maxL2 + " Max"}>
                                    </Label>
                                </ReferenceLine>
                                <ReferenceLine y={this.props.minL1} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', paddingRight: '-50px'
                                        }} value={this.props.minL1 + " Min"}>
                                    </Label>
                                </ReferenceLine>
                                {!this.props.alertCleared ?
                                    <Bar dataKey={this.props.barDataKey} radius={[10, 10, 0, 0]} >
                                        {this.state.data1.map((entry: any, index: number) => (
                                            <Cell fill={entry[this.props.barDataKey] <= 3.730 ? 'red' : '#73A93C'} key={index} />
                                        ))}
                                    </Bar>
                                    : ''}
                            </BarChart>

                        </ResponsiveContainer>
                    </div>

                    <div className="voltage-deviation-bottom" >
                        <pre className="normal-operating-voltage-text">Normal<br />Oprating<br />Voltage<br />
                        Range<br />(b)</pre>
                        <ResponsiveContainer className="bottom-graph-container" width="95%" height="100%" >
                            <BarChart
                                data={this.state.data2}
                                margin={{
                                    top: 10, right: 0, left: 0, bottom: 0,
                                }}
                                maxBarSize={25}
                                style={{ fontSize: '7px' }}>
                                <XAxis dataKey={this.props.dataKey} padding={{ left: 10, right: 10 }}
                                    axisLine={false} tickLine={false}
                                    tick={{ fill: 'white' }} allowDecimals={true} />
                                <YAxis dataKey={this.props.dataKey} tick={{ fill: 'white' }} tickLine={false}
                                    ticks={[3.001, 3.700, 3.730, 3.760, 3.780, 3.800, 3.850, 3.900, 4.100, 4.201, 4.300]}
                                    orientation="right"
                                    tickFormatter={(label) => {
                                        if (label === 3.001) return label + " volt"
                                        else return label
                                    }}
                                    domain={['dataMin', 'dataMax']} interval={8} scale="sqrt" />
                                <Tooltip
                                    content={this.CustomTooltip}
                                    // position={{ y: 0, x: 0 }}
                                    offset={-17} viewBox={{ x: 5, y: 5, height: 10, width: 5 }}
                                    // viewBox={10} strokeWidth: 2, stroke: '#5FBDE0', 
                                    cursor={{ fill: "transparent", top: 0 }}
                                />
                                <ReferenceLine y={this.props.maxL2} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', paddingRight: '-50px'
                                        }} value={this.props.maxL2 + " Max"}>
                                    </Label>
                                </ReferenceLine>
                                <ReferenceLine y={this.props.minL1} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', paddingRight: '-50px'
                                        }} value={this.props.minL1 + " Min"}>
                                    </Label>
                                </ReferenceLine>
                                {!this.props.alertCleared ?
                                    <Bar dataKey={this.props.barDataKey} radius={[10, 10, 0, 0]} >
                                        {this.state.data2.map((entry: any, index: number) => (
                                            <Cell fill={entry[this.props.barDataKey] <= 3.730 ? 'red' : '#73A93C'} key={index} />
                                        ))}
                                    </Bar>
                                    : ''}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <VoltageDifference maxCellPos={this.state.maxCellPos} minCellPos={this.state.minCellPos}
                        maxVolt={this.state.maxVolt} minVolt={this.state.minVolt} voltageDelta={this.state.voltageDelta} />
                </div>
            </div>
        )
    }

}

export default CellBatteryGraph;