import './index.scss';
import React, { PureComponent } from 'react';
import { Layout } from "antd";
interface MisContentProps { }

interface MisContentStates { }

class MisContent extends PureComponent<MisContentProps, MisContentStates> {
    render() {
        return (
            <Layout.Content className="home-content">
                {/* <SubHeader />
                <RandDHomeContent /> */}
            </Layout.Content>
        )
    }

}

export default MisContent;