import './index.scss';
import { Button, Typography, Modal, Dropdown, Menu } from "antd";
import React, { PureComponent } from 'react';
import { AnyCnameRecord } from 'dns';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
interface AlertDetailSingleProps { }

interface AlertDetailSingleStates {
    clearanceComment: string;
    clearBoxToggle: boolean;
}

class AlertDetailSingle extends PureComponent<AlertDetailSingleProps, AlertDetailSingleStates> {

    constructor(props: AlertDetailSingleProps) {
        super(props);
        this.state = {
            clearanceComment: "",
            clearBoxToggle: false
        }
    }

    onChange = (e: any) => {
        this.setState({ clearanceComment: e.target.value });
    };

    clearAlert = () => {
        this.setState({
            clearBoxToggle: false,
        })
    }

    initiateClearAlert = () => {
        this.setState({
            clearBoxToggle: !this.state.clearBoxToggle,
            clearanceComment: ""
        })
    }

    render() {
        const clearAlert = (
            <Menu style={{ left: "-25%", backgroundColor: "#272B3C" }} className={"clear-alert-container"}>
                <Menu.Item key="1" disabled={true}>
                    <Typography.Text >Alert Clearance</Typography.Text>
                    <Input.TextArea rows={4} placeholder={"Enter Comments..."} onChange={this.onChange} value={this.state.clearanceComment} />
                    <Button className={"dropdown-clear-alert-button"} onClick={this.clearAlert}>
                        <Typography.Text style={{ color: "black" }} strong>Clear Alert</Typography.Text>
                    </Button>
                </Menu.Item>
            </Menu>
        )
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
                    <div className={"single-cell-right toolate"}>48 hrs 10 mins</div>
                </div>
                <div className={"single-row"}>
                    <Dropdown overlay={clearAlert} trigger={['click']} visible={this.state.clearBoxToggle}>
                        <Button className={"clear-alert-button"} onClick={this.initiateClearAlert} >
                            <Typography.Text style={{ color: "black" }} strong>CLEAR ALERT</Typography.Text>
                        </Button>
                    </Dropdown>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Vehicle ID:</div>
                    <div className={"single-cell-right"}><Link to={""} className={"detail-link"}>BLR 327490</Link></div>
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
                    <div className={"single-cell-right"}><Link to={""} className={"detail-link"}>BAT 123456</Link></div>
                </div>
                <div className={"single-row"}>
                    <div className={"single-cell-left"}>Customer ID:</div>
                    <div className={"single-cell-right"}><Link to={""} className={"detail-link"}>CUS 123456</Link></div>
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