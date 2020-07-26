import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';

interface AlertDetailSingleProps { }

interface AlertDetailSingleStates { }

class AlertDetailSingle extends PureComponent<AlertDetailSingleProps, AlertDetailSingleStates> {

    render() {
        return (
            <div className="connectm-AlertDetailSingle">
                <div className={"single-row"}>
                    <div>Alert Name:</div>
                    <div>Capacity Deterioration</div>
                </div>
                <div className={"single-row"}>
                    <div>Alert Time:</div>
                    <div>15-May-2020 10:05 AM</div>
                </div>
                <div className={"single-row"}>
                    <div>Open Since:</div>
                    <div>48 hrs 10 mins</div>
                </div>
                <div className={"single-row"}>
                    <div>Vehicle ID:</div>
                    <div>BLR 327490</div>
                </div>
                <div className={"single-row"}>
                    <div>Model:</div>
                    <div>Kivo Easy</div>
                </div>
                <div className={"single-row"}>
                    <div>Mfg Date:</div>
                    <div>15-Feb-2020</div>
                </div>
                <div className={"single-row"}>
                    <div>Battery ID:</div>
                    <div>BAT 123456</div>
                </div>
                <div className={"single-row"}>
                    <div>Customer ID:</div>
                    <div>CUS 123456</div>
                </div>
                <div className={"single-row"}>
                    <div>Location:</div>
                    <div>Kolkata</div>
                </div>
            </div>
        )
    }

}

export default AlertDetailSingle;