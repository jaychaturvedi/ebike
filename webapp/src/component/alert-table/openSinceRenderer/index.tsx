import './index.scss';
import React, { PureComponent } from 'react';
import moment from 'moment'

interface OpenSinceRendererProps {
    text: any,
    record: any,
    index: any
}

interface OpenSinceRendererStates { }

class OpenSinceRenderer extends PureComponent<OpenSinceRendererProps, OpenSinceRendererStates> {
    render() {
        const formatOpenSinceRenderer = (time: string) => {
            console.log(time.split(':'))
            const splitTime = time.split(':')
            return `${splitTime[0]} hr ${splitTime[1]} min`
        }
        // { console.log(this.props.text, this.props.record, this.props.index) }
        return (
            <span >
                {formatOpenSinceRenderer(this.props.text)}
            </span>
        )
    }
}

export default OpenSinceRenderer;