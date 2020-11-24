import './index.scss';
import React, { PureComponent } from 'react';

interface TimeRendererProps {
    text: string,
    record: any,
    index: any
}

interface TimeRendererStates { }

class Location extends PureComponent<TimeRendererProps, TimeRendererStates> {
    render() {
        return (
            <span >
                {this.props?.text?.length
                 ? this.props?.text[0]?.toUpperCase() + this.props?.text.slice(1)
                : ""}
            </span>
        )
    }
}

export default Location;