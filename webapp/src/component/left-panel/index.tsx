import "./index.scss";
import React, { PureComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { ReactComponent as ReactLogo } from "../../assets/motovolt_logo_for_splash_screen.svg";
import { ReactComponent as Alerts } from "../../assets/alert_tab_icon.svg";
import { ReactComponent as MisLogo } from "../../assets/Mis.svg";
import CustomerLogo from "../../assets/png/customer.png";
import { Typography } from "antd";
import { connect } from "react-redux";
import { RoleBasedMainRoutes } from "../../connectm-client/roles/role-access";
import {
  ReduxUserAction,
  ReduxUserState,
  mapDispatchToProps,
  mapStateToProps,
} from "../../connectm-client/actions/user";
interface LeftPanelProps
  extends RouteComponentProps,
    ReduxUserAction,
    ReduxUserState {}
interface LeftPanelStates {
  logoClicked: boolean;
  alertsClicked: boolean;
  b2bClicked: boolean;
  stationsClicked: boolean;
  misClicked: boolean;
  authenticated: boolean;
  userRole: string;
  customerClicked: boolean;
}
class LeftPanel extends PureComponent<LeftPanelProps, LeftPanelStates> {
  constructor(props: LeftPanelProps) {
    super(props);
    this.state = {
      logoClicked: false,
      alertsClicked: true,
      b2bClicked: false,
      stationsClicked: false,
      misClicked: false,
      authenticated: false,
      userRole: "",
      customerClicked: false,
    };
  }

  static getDerivedStateFromProps(
    props: LeftPanelProps,
    state: LeftPanelStates
  ) {
    if (props.user.authenticated) {
      state.authenticated = props.user.authenticated;
      state.userRole = props.user.user.attributes["custom:role"];
    }
    const dashboardActive = localStorage.getItem("dashboardFilters");
    if (dashboardActive === "true") {
      state = {
        ...state,
        logoClicked: false,
        b2bClicked: false,
        stationsClicked: false,
        misClicked: true,
        alertsClicked: false,
        customerClicked: false,
      };
    }
    return state;
  }

  componentDidMount() {
    this.props.history.push(
      RoleBasedMainRoutes(this.props.user.user.attributes["custom:role"])
    );
  }

  alertsClicked = (navigateTo: string) => {
    localStorage.removeItem("dashboardFilters");
    this.setState({
      ...this.state,
      logoClicked: false,
      b2bClicked: false,
      stationsClicked: false,
      misClicked: false,
      alertsClicked: true,
      customerClicked: false,
    });
    this.props.history.push("/" + navigateTo);
  };

  stationsClicked = (navigateTo: string) => {
    this.setState({
      ...this.state,
      logoClicked: false,
      b2bClicked: false,
      stationsClicked: !this.state.stationsClicked,
      misClicked: false,
      alertsClicked: false,
      customerClicked: false,
    });
    this.props.history.push("/" + navigateTo);
  };

  b2bClicked = (navigateTo: string) => {
    this.setState({
      ...this.state,
      logoClicked: false,
      b2bClicked: !this.state.b2bClicked,
      stationsClicked: false,
      misClicked: false,
      alertsClicked: false,
      customerClicked: false,
    });
    this.props.history.push("/" + navigateTo);
  };

  misClicked = (navigateTo: string) => {
    this.setState({
      ...this.state,
      logoClicked: false,
      b2bClicked: false,
      stationsClicked: false,
      misClicked: true,
      alertsClicked: false,
      customerClicked: false,
    });
    this.props.history.push("/" + navigateTo);
  };
  customerClicked = (navigateTo: string) => {
    this.setState({
      ...this.state,
      logoClicked: false,
      b2bClicked: false,
      stationsClicked: false,
      misClicked: false,
      alertsClicked: false,
      customerClicked: true,
    });
    this.props.history.push("/" + navigateTo);
  };
  render() {
    return (
      <div className="connectm-LeftPanel">
        <div className={"left-panel"}>
          {/* <div className={"logo"}>
            <ReactLogo width="44" height="48" />
          </div> */}
          {["DEVELOPER", "ADMIN"].includes(this.state.userRole) && (
            <div
              className={`tab-icons ${
                this.state.alertsClicked &&
                ["DEVELOPER", "ADMIN"].includes(this.state.userRole)
                  ? "option-clicked"
                  : ""
              }`}
              onClick={() => this.alertsClicked("alerts")}
            >
              <Alerts width="30" height="30" />
              {/* <Typography.Text style={{ color: "white" }}>
                Alerts
              </Typography.Text> */}
            </div>
          )}
          {/* <div className={`tab-icons ${this.state.b2bClicked ? "option-clicked" : ""}`} onClick={this.b2bClicked}>
                        <B2BLogo width="32" height="32" />
                        <Typography.Text >B2B</Typography.Text>
                    </div> */}
          {["ADMIN", "MIS"].includes(this.state.userRole) && (
            <div
              className={`tab-icons ${
                this.state.misClicked &&
                ["ADMIN", "MIS"].includes(this.state.userRole)
                  ? "option-clicked"
                  : ""
              }`}
              onClick={() => this.misClicked("mis")}
            >
              <MisLogo width="30" height="30" />
              {/* <Typography.Text style={{ color: "white" }}>MIS</Typography.Text> */}
            </div>
          )}

          <div
            className={`tab-icons ${
              this.state.customerClicked ? "option-clicked" : ""
            }`}
            onClick={() => this.customerClicked("customer")}
          >
            {/* <CustomerLogo width="30" height="30" /> */}
            <img src={CustomerLogo} height="30" width="30"></img>
            {/* <Typography.Text style={{ color: "white" }}>
              Customer
            </Typography.Text> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftPanel));
