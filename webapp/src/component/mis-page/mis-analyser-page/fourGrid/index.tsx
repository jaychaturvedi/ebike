import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import { Menu, Dropdown, message, Tooltip } from 'antd';
import { LeftCircleFilled, DownOutlined, UserOutlined } from '@ant-design/icons';
import Header from "../topHeader"
import LineGraph from '../../../../subComponents/graph/chargingTrend';

interface Props { }

interface State { }

function handleButtonClick(e: any) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
            1st menu item
      </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
            2nd menu item
      </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
            3rd menu item
      </Menu.Item>
    </Menu>
);
const GraphSelector = () => (<Dropdown overlay={menu} trigger={['click']} placement={"bottomRight"}>
    <div className={"grid-dropDown grid-dropdown-active"}>
        <div className={"pair"} >
            <Typography.Text className={`dropdown-typography`}>dropdown</Typography.Text>
        </div>
        <DownOutlined className={"flip"} style={{ marginLeft: "16px" }} />
    </div>
</Dropdown>)
class Grid extends PureComponent<Props, State> {
    render() {
        return (
            <>
                <div className="main-wrapper">
                    <Header />
                    <div className='container-fluid four-analyser' >
                        <div className='grid-one'>
                            <div className="grid-header" >
                                <GraphSelector />
                            </div>
                            <div className="graph-container">
                                <LineGraph />
                            </div>
                        </div>

                        <div className='grid-two'>
                            <div className="grid-header">
                                <GraphSelector />
                            </div>
                            <div className="graph-container">
                                <LineGraph />

                            </div>
                        </div>
                    </div>
                    <div className='container-fluid four-analyser' >

                        <div className='grid-three'>
                            <div className="grid-header">
                                <GraphSelector />
                            </div>
                            <div className="graph-container">
                                <LineGraph />
                            </div>
                        </div>

                        <div className='grid-four'>
                            <div className="grid-header">
                                <GraphSelector />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Grid