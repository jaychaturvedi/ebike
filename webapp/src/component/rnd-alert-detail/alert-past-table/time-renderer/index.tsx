import './index.scss';
import React, { PureComponent } from 'react';
import {formatTime} from "../../../../connectm-client/util/time-formater"

interface TimeRendererProps {
    text: any,
    record: any,
    index: any
}

interface TimeRendererStates { }

class TimeRenderer extends PureComponent<TimeRendererProps, TimeRendererStates> {
    render() {
        // { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <span >
                {formatTime(this.props.text)}
            </span>
        )
    }
}

export default TimeRenderer;