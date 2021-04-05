import './index.scss';
import React, { PureComponent } from 'react';
import { formatTime, formatDateTime } from "../../../connectm-client/util/time-formater"
interface TimeRendererProps {
    text: any,
    record: any,
    index: any
}

interface TimeRendererStates { }

class TimeRenderer extends PureComponent<TimeRendererProps, TimeRendererStates> {
    render() {
        return (
            <span >
                {formatDateTime(this.props.text, "DD-MMM-YYYY hh:mm a")}
            </span>
        )
    }
}

export default TimeRenderer;