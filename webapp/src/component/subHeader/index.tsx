import './index.scss';
import React, { PureComponent } from 'react';
import { Menu, Dropdown, message, DatePicker, Button, Input } from 'antd';
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';

interface SubHeaderProps { }

interface SubHeaderStates { }

class SubHeader extends PureComponent<SubHeaderProps, SubHeaderStates> {
    handleButtonClick(e: any) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    handleMenuClick(e: any) {
        message.info('Click on menu item.');
        console.log('click', e);
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    1st menu item
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    2nd menu item
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                    3rd item
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"sub-header"}>
                <Button size={"middle"} style={{ backgroundColor: "black", color: "white" }}>
                    ALL
                </Button>
                <Button size={"middle"} style={{ width: "120px" }}>
                    Classic
                </Button>
                <Button size={"middle"} style={{ width: "120px" }}>
                    Cargo
                </Button>
                <Dropdown overlay={menu}>
                    <Button style={{ width: "150px" }}>
                        B2B Customer <DownOutlined />
                    </Button>
                </Dropdown>
                <Dropdown overlay={menu}>
                    <Button style={{ width: "150px" }}>
                        Location <DownOutlined />
                    </Button>
                </Dropdown>
                <DatePicker placeholder="Time Frame" style={{ width: "150px" }} />
                <div style={{ width: "200px" }}>
                    <Input placeholder="default size" maxLength={50} prefix={<SearchOutlined />} />
                </div>
                <Button size={"middle"} style={{ backgroundColor: "black", color: "white" }}>
                    APPLY
                </Button>
                <Button size={"middle"} style={{ backgroundColor: "#e0e0e0" }}>
                    RESET
                 </Button>
            </div>
        )
    }

}

export default SubHeader;