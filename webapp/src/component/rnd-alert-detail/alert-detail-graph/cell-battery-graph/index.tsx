import './index.scss';
import { Layout, Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Text, BarChart, Bar, ReferenceLine, Cell
} from 'recharts';
import { FileExcelFilled } from '@ant-design/icons';

interface CellBatteryGraphProps { data: any, title?: string, dataKey: string, barDataKey: string, minL1: number, maxL2: number }

interface CellBatteryGraphStates {
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
            data1: [],
            data2: [],
            voltageDelta: 0,
            maxVolt: 0,
            minVolt: 0,
            maxCellPos: 0,
            minCellPos: 0
        }
    }
    formatData = (data: any) => {
        if (data === undefined) return []
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
        arr2.push({ 'name': '', }, { 'name': '', }, { 'name': '', }, { 'name': 'cell16', })

        // for (let i = 0; i <= 8 - arr2.length; i++) arr2.push({ 'name': '', 'value': 0 })
        this.setState({
            data1: arr1, data2: arr2, maxVolt: max, minVolt: min, maxCellPos: maxPos, minCellPos: minPos,
            voltageDelta: (max - min)
        })
        this.forceUpdate()
        // console.log(arr1, arr2, min, max, minPos, maxPos, data[voltageDelta], "formatted");
        console.log(this.state, "graph cell in func");
    }
    componentWillMount() {
        this.formatData(this.props.data)
    }

    // componentDidMount() {
    //     console.log(this.state.data1, this.state.data2, this.props.data, "graph mount");
    // }
    render() {
        console.log(this.state, "graph cell");
        return (
            <div className="connectm-AlertDetailGraph">
                <div className={"connectm-header"}>
                    <Typography.Text style={{ color: "#ffffff", fontSize: '15px' }} strong>{this.props.title}</Typography.Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                    <div style={{ display: 'flex', justifyContent: 'center', height: '50%', width: '95%', flexDirection: 'row', alignItems: 'center' }} >
                        <pre style={{ fontSize: 8, textAlign: 'center' }}>Normal<br />Oprating<br />Voltage<br />
                        Range<br />(a)</pre>
                        <ResponsiveContainer className="top-graph-container" width="95%" height="100%">
                            <BarChart
                                data={this.state.data1}
                                margin={{
                                    top: 10, right: 0, left: 0, bottom: 0,
                                }} maxBarSize={25} style={{ fontSize: '7px' }}>
                                <XAxis dataKey={this.props.dataKey} padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} allowDecimals={true} />
                                <YAxis dataKey={this.props.dataKey} tick={{ fill: 'white' }}
                                    ticks={[3.001, 3.700, 3.730, 3.760, 3.780, 3.800, 3.850, 3.900, 4.100, 4.201, 4.300]}
                                    orientation="right"
                                    domain={['dataMin', 'dataMax']} interval={8} scale="sqrt" />
                                {/* <Tooltip /> */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <ReferenceLine y={this.props.maxL2} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px'
                                        }} value={this.props.maxL2 + " Max"}>
                                    </Label>
                                </ReferenceLine>
                                <ReferenceLine y={this.props.minL1} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px'
                                        }} value={this.props.minL1 + " Min"}>
                                    </Label>
                                </ReferenceLine>
                                <Bar dataKey={this.props.barDataKey} radius={[10, 10, 0, 0]} >
                                    {this.state.data1.map((entry: any, index: number) => (
                                        <Cell fill={entry[this.props.barDataKey] <= 3.730 ? 'red' : '#73A93C'} key={index} />
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
                                data={this.state.data2}
                                margin={{
                                    top: 10, right: 0, left: 0, bottom: 0,
                                }}
                                maxBarSize={25}
                                style={{ fontSize: '7px' }}

                            >
                                <XAxis dataKey={this.props.dataKey} padding={{ left: 10, right: 10 }} tick={{ fill: 'white' }} allowDecimals={true} />
                                <YAxis dataKey={this.props.dataKey} tick={{ fill: 'white' }}
                                    ticks={[3.001, 3.700, 3.730, 3.760, 3.780, 3.800, 3.850, 3.900, 4.100, 4.201, 4.300]}
                                    orientation="right"
                                    domain={['dataMin', 'dataMax']} interval={8} scale="sqrt" />
                                {/* <Tooltip /> */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <ReferenceLine y={this.props.maxL2} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px'
                                        }} value={this.props.maxL2 + " Max"}>
                                    </Label>
                                </ReferenceLine>
                                <ReferenceLine y={this.props.minL1} stroke="#717171" strokeDasharray="3 3 5 2"
                                    isFront={true} >
                                    <Label position={'right'} fill="#ffffff"
                                        style={{
                                            fontSize: '7px', fontFamily: 'Roboto', paddingRight: '-50px'
                                        }} value={this.props.minL1 + " Min"}>
                                    </Label>
                                </ReferenceLine>
                                <Bar dataKey={this.props.barDataKey} radius={[10, 10, 0, 0]} >
                                    {this.state.data2.map((entry: any, index: number) => (
                                        <Cell fill={entry[this.props.barDataKey] <= 3.730 ? 'red' : '#73A93C'} key={index} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', maxHeight: "15%" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '10px' }}>
                            <span>Max Cell Voltage : {this.state.maxVolt}</span><span>Cell Position : {this.state.maxCellPos}</span>  </div>
                        <div style={{ width: '20px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '10px' }}>
                            <span>Min Cell Voltage : {this.state.minVolt} </span><span>Cell Position :{this.state.minCellPos}</span>  </div>
                        <div style={{ width: '20px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <span><Typography.Text style={{ color: "#fcc84a", fontSize: '12px' }} strong>
                                Voltage Difference : {this.state.voltageDelta.toFixed(3)}
                            </Typography.Text>
                            </span> </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CellBatteryGraph;