import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';
import { ReactComponent as Severity } from "../../../assets/severity_icon.svg"

interface SeverityRendereProps {
    text: any,
    record: any,
    index: any
}

interface SeverityRendereStates { }

class SeverityRendere extends PureComponent<SeverityRendereProps, SeverityRendereStates> {
    render() {
        { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <span style={{ textAlign: 'center', paddingLeft: '10px' }}>
                <Severity height="15" width="15" className={`${this.props.text == '1' ? "" : Number(this.props.text) % 2 ? "severity-color-major" : "severity-color-minor"}`} />
            </span>
        )
    }
}

export default SeverityRendere;