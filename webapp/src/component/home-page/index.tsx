import React, { PureComponent } from 'react';
import './index.scss';
import { Layout } from "antd";
import WebHeader from "../header"
import SubHeader from "../subHeader"

interface ContentProp { }
interface ContentState { }
class Content extends PureComponent<ContentProp, ContentState>{

    render() {
        return <>
            <Layout.Content className="web-content">
                <div className="content">
                    <SubHeader />
                </div>
            </Layout.Content>
        </>
    }
}

export default Content;
