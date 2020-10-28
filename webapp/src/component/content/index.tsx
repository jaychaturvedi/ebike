import React, { PureComponent } from 'react';
import './index.scss';
import { Layout } from "antd";
import WebHeader from "../header"
import LeftPanel from "../left-panel"
import { Route, withRouter, RouteComponentProps, Switch } from "react-router";
import HomePage from "../rnd-home-page"
import MisContent from "../mis-page"
import MisAnalyserFour from '../mis-page/mis-analyser-page/fourGrid'
// import User from "../user"
import AlertDetail from "../rnd-alert-detail"
import { ReduxUserAction, ReduxUserState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/user"
import { connect } from 'react-redux'
import Quicksight from "../quicksight"
import Dashboard from "../quicksight/dashboard"
import SimpleMap from '../googleMap';

interface ContentProp extends RouteComponentProps, ReduxUserAction, ReduxUserState { }
interface ContentState {
    userRole: string
}

type AccessibleRoutes = {
    role: string
}
function AccessibleRoutes(props: AccessibleRoutes) {
    switch (props.role) {
        case "DEVELOPER": {
            return (
                <Switch>
                    <Route exact path="/alerts" component={HomePage} />
                    <Route exact path="/alerts/:alertType/:id" component={AlertDetail} />
                </Switch>
            )
        }
        case "ADMIN": {
            return (
                <Switch>
                    <Route exact path="/alerts" component={HomePage} />
                    <Route exact path="/alerts/:alertType/:id" component={AlertDetail} />
                    {/* <Route exact path="/" component={MisPage} /> */}
                    {/* <Route exact path="/" component={MisBattery} /> */}
                    {/* <Route exact path="/" component={MisMotorController} /> */}
                    <Route exact path="/ana" component={MisAnalyserFour} />
                    {/* <Route exact path="/mis" component={MisContent} /> */}
                    <Route exact path="/mis" component={Quicksight} />
                    <Route exact path="/mis/:dashboardId" component={Dashboard} />
                    <Route exact path="/map" component={SimpleMap} />
                </Switch>
            )
        }
        case "MIS": {
          return (
              <Switch>
                  <Route exact path="/mis" component={Quicksight} />
                  <Route exact path="/mis/:dashboardId" component={Dashboard} />
              </Switch>
          )
      }
    }
}
class Content extends PureComponent<ContentProp, ContentState>{
    constructor(props: ContentProp) {
        super(props)
        this.state = {
            userRole: ''
        }
    }
    static getDerivedStateFromProps(props: ContentProp, state: ContentState) {
        if (props.user.authenticated) {
            state.userRole = props.user.user.attributes['custom:role']
        }
        return state
    }
    render() {
        console.log("content ==>", this.state)
        return <>
            <Layout.Content className="web-content">
                <WebHeader />
                <LeftPanel />
                {AccessibleRoutes({ role: this.state.userRole })}
            </Layout.Content>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));
