import './index.scss';
import React, { PureComponent } from 'react';
import MisBattery from "../mis-battery-page"
import Mis from '../mis-mc-page'
import NavigationTabs from '../../subComponents/navigationTabs'
import { Layout } from "antd";
interface MisContentProps { }

interface MisContentStates { }

class MisContent extends PureComponent<MisContentProps, MisContentStates> {
    render() {
        return (
            <Layout.Content className="home-content">
                <NavigationTabs />
                <MisBattery />
            </Layout.Content>
        )
    }

}

export default MisContent;