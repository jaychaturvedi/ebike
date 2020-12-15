import './index.scss';
import { Typography } from "antd";
import React, { PureComponent } from 'react';

interface VoltageProps {
    voltageDelta: number,
    maxVolt: string,
    minVolt: string,
    maxCellPos: number,
    minCellPos: number
}

interface VoltageStates { }

class VoltageDifference extends PureComponent<VoltageProps, VoltageStates> {
    render() {
        // { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <div className="voltage-difference-stats-container">
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '12px' }}>
                    <span>Max Cell Voltage : {this.props.maxVolt}</span><span>Cell Position : {this.props.maxCellPos}</span>  </div>
                <div style={{ width: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: '12px' }}>
                    <span>Min Cell Voltage : {this.props.minVolt} </span><span>Cell Position :{this.props.minCellPos}</span>  </div>
                <div style={{ width: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column-reverse', textAlign: 'left' }}
                className="voltage-difference-label-text">
                    <span><Typography.Text style={{ color: "#fcc84a", fontSize: '16px' }} strong className="voltage-difference-text">
                        Voltage Difference : {this.props.voltageDelta.toFixed(3) + " V"}
                    </Typography.Text>
                    </span> </div>
            </div>
        )
    }
}

export default VoltageDifference;