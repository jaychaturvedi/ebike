import './index.scss';
import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { ReactComponent as ReactLogo } from "../../assets/motovolt_logo_for_splash_screen.svg"
import { ReactComponent as Alerts } from "../../assets/alerts_tab_icon.svg"
import { ReactComponent as B2BLogo } from "../../assets/b2b_tab_icon.svg"
import { ReactComponent as CharginStation } from "../../assets/charging_station_tab_icon.svg"
import { Typography } from 'antd';

interface LeftPanelProps extends RouteComponentProps { }

interface LeftPanelStates {
    logoClicked: boolean,
    alertsClicked: boolean,
    b2bClicked: boolean,
    stationsClicked: boolean,
    misClicked : boolean
}
class LeftPanel extends PureComponent<LeftPanelProps, LeftPanelStates> {
    constructor(props: LeftPanelProps) {
        super(props);
        this.state = {
            logoClicked: false,
            alertsClicked: true,
            b2bClicked: false,
            stationsClicked: false,
            misClicked : false
        }
    }

    alertsClicked = (navigateTo :string) => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: false,
            stationsClicked: false,
            misClicked: false,
            alertsClicked: !this.state.alertsClicked
        })
        this.props.history.push("/" + navigateTo);
    }

    stationsClicked = (navigateTo :string) => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: false,
            stationsClicked: !this.state.stationsClicked,
            misClicked: false,
            alertsClicked: false
        })
        this.props.history.push("/" + navigateTo);
    }

    b2bClicked = (navigateTo : string) => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: !this.state.b2bClicked,
            stationsClicked: false,
            misClicked: false,
            alertsClicked: false
        });
        this.props.history.push("/" + navigateTo);
    }

    misClicked = (navigateTo :string) => {
        this.setState({
            ...this.state,
            logoClicked: false,
            b2bClicked: false,
            stationsClicked: false,
            misClicked: !this.state.misClicked,
            alertsClicked: false
        });
        this.props.history.push("/" + navigateTo);
    }
    render() {
        return (
            <div className="connectm-LeftPanel">
                <div className={"left-panel"}>
                    <div className={"logo"}>
                        <ReactLogo width="44" height="48" />
                    </div>
                    <div className={`tab-icons ${this.state.alertsClicked ? "option-clicked" : ""}`} onClick={() => this.alertsClicked("alerts")}>
                        <Alerts width="40" height="40" />
                        <Typography.Text >Alerts</Typography.Text>
                    </div>
                    {/* <div className={`tab-icons ${this.state.b2bClicked ? "option-clicked" : ""}`} onClick={this.b2bClicked}>
                        <B2BLogo width="32" height="32" />
                        <Typography.Text >B2B</Typography.Text>
                    </div>
                    <div className={`tab-icons ${this.state.stationsClicked ? "option-clicked" : ""}`} onClick={() => this.stationsClicked("")}>
                        <CharginStation width="32" height="32" />
                        <Typography.Text >Stations</Typography.Text>
                    </div> */}
                </div>
            </div>
        )
    }

}

export default withRouter(LeftPanel);