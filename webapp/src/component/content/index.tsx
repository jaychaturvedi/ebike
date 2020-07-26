import React, { PureComponent } from 'react';
import './index.scss';
import { Layout } from "antd";
import WebHeader from "../header"
import LeftPanel from "../left-panel"
import { Route, withRouter, RouteComponentProps, Switch } from "react-router";
import HomePage from "../rnd-home-page"
import User from "../user"
import AlertDetail from "../rnd-alert-detail"

interface ContentProp extends RouteComponentProps { }
interface ContentState { }
class Content extends PureComponent<ContentProp, ContentState>{
    render() {
        return <>
            <Layout.Content className="web-content">
                <WebHeader />
                <LeftPanel/>
                <AlertDetail/>
                {/* <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/:id" component={User} />
                </Switch> */}
            </Layout.Content>
        </>
    }
}

export default withRouter(Content);
