import './index.scss';
import { Typography } from "antd";
import React, { PureComponent } from 'react';

interface VoltageProps {
    voltageDelta: number,
    maxVolt: number,
    minVolt: number,
    maxCellPos: number,
    minCellPos: number
}

interface VoltageStates { }

class VoltageDifference extends PureComponent<VoltageProps, VoltageStates> {
    render() {
        // { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: "15%" }}>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '12px' }}>
                    <span>Max Cell Voltage : {this.props.maxVolt}</span><span>Cell Position : {this.props.maxCellPos}</span>  </div>
                <div style={{ width: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '12px' }}>
                    <span>Min Cell Voltage : {this.props.minVolt} </span><span>Cell Position :{this.props.minCellPos}</span>  </div>
                <div style={{ width: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span><Typography.Text style={{ color: "#fcc84a", fontSize: '16px' }} strong className="voltage-difference-text">
                        Voltage Difference : {this.props.voltageDelta.toFixed(3)}
                    </Typography.Text>
                    </span> </div>
            </div>
        )
    }
}

export default VoltageDifference;