import './index.scss';
import React, { PureComponent } from 'react';
import moment from 'moment'

interface TimeRendererProps {
    text: any,
    record: any,
    index: any
}

interface TimeRendererStates { }

class TimeRenderer extends PureComponent<TimeRendererProps, TimeRendererStates> {
    render() {
        const formatTime = (time: string) => {
            const newDate = new Date(time)
            console.log(newDate)
            return moment(newDate).format("DD-MMMM-YYYY HH:mm A")
        }
        // { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <span >
                {formatTime(this.props.text)}
            </span>
        )
    }
}

export default TimeRenderer;