import './index.scss';
import React, { PureComponent } from 'react';
import Tabs from "./tabs"
import SmartAlert from "../alert-table/aggrid"

interface RandDDataProps { }

interface RandDDataStates { }

class RandDData extends PureComponent<RandDDataProps, RandDDataStates> {

    render() {
        return (
            <div className="connectm-RandDData">
                <div className={"all-tabs"}>
                    <Tabs />
                </div>
                <div >
                    <SmartAlert />
                </div>
            </div>
        )
    }

}

export default RandDData;