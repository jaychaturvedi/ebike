import './index.scss';
import { Layout, Avatar,Tooltip } from 'antd'
import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import Motovolt from '../../assets/MotovoltLogo.png'
import { connect } from 'react-redux'
import { signout } from "../../connectm-client/authentication"
import { ReduxUserAction, ReduxUserState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/user"
import {
  ReduxAlertActions,
  ReduxAlertState,
  mapDispatchToProps as alertDispatchToProps,
  mapStateToProps as alertStateToProps,
} from "../../connectm-client/actions/alerts";

interface WebHeaderProp extends RouteComponentProps, ReduxUserAction, ReduxUserState { }

interface WebHeaderState {
    showPopup: boolean
    userEmail: string
}

class WebHeader extends PureComponent<WebHeaderProp, WebHeaderState> {
    constructor(props: WebHeaderProp) {
        super(props)
        this.state = {
            showPopup: false,
            userEmail: 'U'
        }
    }

    static getDerivedStateFromProps(props: WebHeaderProp, state: WebHeaderState) {
        if (props.user.user) {
            state.userEmail = props.user.user.attributes.email
        }
        return state
    }

    logoutFromCommandCenter = () => {
      const defaultPagination = {
        pageNumber: 1,
        pageSize: 10,
      };
      this.props.alertTabChanged({
        type: "UPDATE_ACTIVE_ALERT",
        payload: {
          alertType: this.props.alerts.activeAlertTab,
          pagination: {
            pageNumber: 1,
            pageSize: 10,
          },
          sort: this.props.alerts.sort,
          filter: this.props.alerts.filter,
          locationFilter: this.props.alerts.locationFilter,
          timeFrameFilter: this.props.alerts.timeFrameFilter,
          vehicleFilter: this.props.alerts.vehicleFilter,
          searchFilter: this.props.alerts.searchFilter,
          alertPagination: {
            smart: defaultPagination,
            bms: defaultPagination,
            mc: defaultPagination,
          },
        },
      });
        signout()
            .then(() => {
                this.props.usersAction({
                    type: "UPDATE_USER",
                    payload: {
                        authenticated: false,
                        user: null
                    }
                })
                
                this.props.history.push("/login")
            })
            .catch(() => {
                console.log("log out error")
            })
    }
    render() {
        return (
            <Layout.Header className="web-header">
                <div className={"header-logo"}> <img src={Motovolt} alt="motovolt-logo" /></div>
                <Tooltip placement="bottomRight" color="#1b1e27"
                title={<span onClick={this.logoutFromCommandCenter}>{"Sign Out"}</span>} trigger="click">
                    <Avatar size="small" gap={4} className={"header-avatar"} >
                        {this.state.userEmail.slice(0, 1).toUpperCase()}
                    </Avatar>
                </Tooltip>
            </Layout.Header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WebHeader));