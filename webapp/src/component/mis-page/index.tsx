import './index.scss';
import React, { PureComponent } from 'react';
import MisBattery from "./mis-battery-page"
import MisCustomer from './mis-customer-page'
import NavigationTabs from '../../subComponents/navigationTabs'
import { Layout } from "antd";
import MisMc from './mis-mc-page';
import { FourGrid, TwoGrid } from './mis-analyser-page'

interface MisContentProps { }

interface MisContentStates { }

class MisContent extends PureComponent<MisContentProps, MisContentStates> {
    render() {
        return (
            <Layout.Content className="connectm-MisContent">
                {/* <NavigationTabs /> */}
                <FourGrid />
            </Layout.Content>
        )
    }

}

export default MisContent;