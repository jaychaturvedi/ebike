import './index.scss';
import React, { PureComponent } from 'react';
import { ReactComponent as ReactLogo } from "../../assets/motovolt_logo_for_splash_screen.svg"
import { ReactComponent as Alerts } from "../../assets/alerts_tab_icon.svg"
import { ReactComponent as B2BLogo } from "../../assets/b2b_tab_icon.svg"
import { ReactComponent as CharginStation } from "../../assets/charging_station_tab_icon.svg"
import { Typography } from 'antd';
//charging_station_tab_icon

interface LeftPanelProps { }

interface LeftPanelStates {
    logoClicked: boolean,
    alertsClicked: boolean,
    b2bClicked: boolean,
    stationsClicked: boolean
}

class LeftPanel extends PureComponent<LeftPanelProps, LeftPanelStates> {

    constructor(props: LeftPanelProps) {
        super(props);
        this.state = {
            logoClicked: false,
            alertsClicked: true,
            b2bClicked: false,
            stationsClicked: false,
        }
    }

    alertsClicked = () => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: false,
            stationsClicked: false,
            alertsClicked: !this.state.alertsClicked
        })
    }

    stationsClicked = () => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: false,
            stationsClicked: !this.state.stationsClicked,
            alertsClicked: false
        })
    }

    b2bClicked = () => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: !this.state.b2bClicked,
            stationsClicked: false,
            alertsClicked: false
        })
    }

    render() {
        return (
            <div className="connectm-LeftPanel">
                <div className={"left-panel"}>
                    <div className={"logo"}>
                        <ReactLogo width="40" height="40" />
                    </div>
                    <div className={`tab-icons ${this.state.alertsClicked ? "option-clicked" : ""}`} onClick={this.alertsClicked}>
                        <Alerts width="32" height="32" />
                        <Typography.Text >Alerts</Typography.Text>
                    </div>
                    <div className={`tab-icons ${this.state.b2bClicked ? "option-clicked" : ""}`} onClick={this.b2bClicked}>
                        <B2BLogo width="32" height="32" />
                        <Typography.Text >B2B</Typography.Text>
                    </div>
                    <div className={`tab-icons ${this.state.stationsClicked ? "option-clicked" : ""}`} onClick={this.stationsClicked}>
                        <CharginStation width="32" height="32" />
                        <Typography.Text >Stations</Typography.Text>
                    </div>
                </div>
            </div>
        )
    }

}

export default LeftPanel;