import './index.scss';
import React, { PureComponent } from 'react';
import { formatHourMin } from "../../../../connectm-client/util/time-formater"

interface OpenSinceRendererProps {
    text: any,
    record: any,
    index: any
}

interface OpenSinceRendererStates { }

class OpenSinceRenderer extends PureComponent<OpenSinceRendererProps, OpenSinceRendererStates> {
    render() {
        return (
            <span >
                {formatHourMin(this.props?.text)}
            </span>
        )
    }
}

export default OpenSinceRenderer;