import './index.scss';
import { Button, Typography } from "antd";
import React, { PureComponent } from 'react';

interface AlertDetailSingleProps {}

interface AlertDetailSingleStates {}

class AlertDetailSingle extends PureComponent<AlertDetailSingleProps, AlertDetailSingleStates> {

    render() {
        return (
            <div className="connectm-AlertDetailSingle">
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Alert Name:</div>
                    <div className={"single-cell-right"}>Capacity Deterioration</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Alert Time:</div>
                    <div className={"single-cell-right"}>15-May-2020 10:05 AM</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Open Since:</div>
                    <div className={"single-cell-right"}>48 hrs 10 mins</div>
                </div>
                <div className={"single-row"}>
                    <Button className={"clear-alert-button"}>
                        <Typography.Text style={{ color: "black" }} strong>CLEAR ALERT</Typography.Text>
                    </Button>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Vehicle ID:</div>
                    <div className={"single-cell-right"}>BLR 327490</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Model:</div>
                    <div className={"single-cell-right"}>Kivo Easy</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Mfg Date:</div>
                    <div className={"single-cell-right"}>15-Feb-2020</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Battery ID:</div>
                    <div className={"single-cell-right"}>BAT 123456</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Customer ID:</div>
                    <div className={"single-cell-right"}>CUS 123456</div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Location:</div>
                    <div className={"single-cell-right"}>Kolkata</div>
                </div>
            </div>
        )
    }

}

export default AlertDetailSingle;