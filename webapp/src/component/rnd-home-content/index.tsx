import './index.scss';
import React, { PureComponent } from 'react';
import RandDData from "../rnd-data"
import RandDTrends from "../rnd-trends"

interface RandDHomeContentProps { }

interface RandDHomeContentStates { }

class RandDHomeContent extends PureComponent<RandDHomeContentProps, RandDHomeContentStates> {

    render() {
        return (
            <div className="connectm-RandDHomeContent">
                <div className={"connectM-left"}>
                    <RandDData />
                </div>
                <div className={"connectM-right"}>
                    <RandDTrends />
                </div>
            </div>
        )
    }

}

export default RandDHomeContent;