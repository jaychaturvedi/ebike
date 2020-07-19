import './index.scss';
import React, { PureComponent } from 'react';
import Tabs from "./tabs"

interface RandDDataProps { }

interface RandDDataStates { }

class RandDData extends PureComponent<RandDDataProps, RandDDataStates> {

    render() {
        return (
            <div className="connectm-RandDData">
                <div className={"all-tabs"}>
                    <Tabs />
                </div>
                <div>
                    Table
                </div>
            </div>
        )
    }

}

export default RandDData;