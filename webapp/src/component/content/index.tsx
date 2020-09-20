import React, { PureComponent } from 'react';
import './index.scss';
import { Layout } from "antd";
import WebHeader from "../header"
import LeftPanel from "../left-panel"
import { Route, withRouter, RouteComponentProps, Switch } from "react-router";
import HomePage from "../rnd-home-page"
import MisContent from "../mis-page"
// import MisCustomer from "../mis-customer-page"
import MisBattery from "../mis-battery-page"
import MisMotorController from "../mis-mc-page"
import MisAnalyserFour from '../mis-analyser-page/twoGrid'
// import User from "../user"
import AlertDetail from "../rnd-alert-detail"
// import Battery from "../rnd-alert-detail/alert-detail-graph/cell-battery-graph"


interface ContentProp extends RouteComponentProps { }
interface ContentState { }
class Content extends PureComponent<ContentProp, ContentState>{
    render() {
        return <>
            <Layout.Content className="web-content">
                <WebHeader />
                <LeftPanel />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/:alertType/:id" component={AlertDetail} /> 
                    {/* <Route exact path="/" component={MisPage} /> */}
                    {/* <Route exact path="/" component={MisBattery} /> */}
                    {/* <Route exact path="/" component={MisMotorController} /> */}
                    <Route exact path="/ana" component={MisAnalyserFour} />
                    <Route exact path="/mis" component={MisContent} />
                </Switch>
            </Layout.Content>
        </>
    }
}

export default withRouter(Content);
