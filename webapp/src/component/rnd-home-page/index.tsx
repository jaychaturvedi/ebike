import React, { PureComponent } from 'react';
import './index.scss';
import { Layout } from "antd";
import SubHeader from "../subHeader"
import RandDHomeContent from "../rnd-home-content"
interface ContentProp { }
interface ContentState { }
class Content extends PureComponent<ContentProp, ContentState>{

    render() {
        return <>
            <Layout.Content className="home-content">
                    <SubHeader />
                <RandDHomeContent/>
            </Layout.Content>
        </>
    }
}

export default Content;
