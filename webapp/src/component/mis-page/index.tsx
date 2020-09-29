import './index.scss';
import React, { PureComponent } from 'react';
import MisBattery from "./mis-battery-page"
import MisCustomer from './mis-customer-page'
import NavigationTabs from './subComponents/navigationTabs'
import AnalyserTabs from './subComponents/analyserTabs'

import { Layout } from "antd";
import MisMc from './mis-mc-page';
import Analyser from './mis-analyser-page'

interface MisContentProps { }
type TComponent = "customer" | "battery" | "vehicle" | "analyser" | "mc" | "back"
interface MisContentStates { activeTab: TComponent }

class MisContent extends PureComponent<MisContentProps, MisContentStates> {
    constructor(props: MisContentProps) {
        super(props)
        this.state = {
            activeTab: "battery"
        }
    }

    renderComponent() {
        switch (this.state.activeTab) {
            case "battery":
                return <MisBattery />
            case "analyser":
                return <Analyser />
            // case "mc":
            //     return <MisBattery />
            // case "customer":
            //     return <MisCustomer />
        }
    }
    toggleComponent = (type: TComponent) => {
        this.setState({ activeTab: type })
    }
    render() {
        return (
            <Layout.Content className="connectm-MisContent">
                {this.state.activeTab === "analyser" ? <AnalyserTabs toggleComponent={this.toggleComponent}></AnalyserTabs> : <NavigationTabs toggleComponent={this.toggleComponent} />}
                {/* <Analyser /> */}
                {/* <MisBattery /> */}
                {this.renderComponent()}
            </Layout.Content>
        )
    }

}

export default MisContent;