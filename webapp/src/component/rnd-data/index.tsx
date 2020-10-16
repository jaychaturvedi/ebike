import './index.scss';
import React, { PureComponent } from 'react';
import Tabs from "./tabs"
import AlertsTable from "../alert-table"

interface RandDDataProps { }

interface RandDDataStates { }

class RandDData extends PureComponent<RandDDataProps, RandDDataStates> {

    render() {
        return (
            <div className="connectm-RandDData">
                <div className={"all-tabs"}>
                    <Tabs />
                </div>
                <div className={"alert-table"}>
                    <AlertsTable />
                </div>
            </div>
        )
    }

}

export default RandDData;