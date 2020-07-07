import './index.scss';
import { Layout } from "antd";
import React, { PureComponent } from 'react';
import Content from '../component/content'
interface HomeProps { }

interface HomeStates { }

class Home extends PureComponent<HomeProps, HomeStates> {

    render() {
        return (
            <div className="connectm-home">
                <Layout>
                    <Content />
                </Layout>
            </div>
        )
    }

}

export default Home;