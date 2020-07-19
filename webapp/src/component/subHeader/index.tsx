import './index.scss';
import React, { PureComponent } from 'react';
import { Menu, Dropdown, message, DatePicker, Button, Input, Select } from 'antd';
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const vehiclemenu = (
    <Menu>
        <Menu.ItemGroup title="Classic">
            <Menu.Item>Ice</Menu.Item>
            <Menu.Item>Kivo Standard</Menu.Item>
            <Menu.Item>Kivo easy</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Cargo">
            <Menu.Item>Hum</Menu.Item>
        </Menu.ItemGroup>
    </Menu>
);
const locationmenu = (
    <Menu>
        <Menu.ItemGroup title="North" />
        <Menu.ItemGroup title="South">
            <Menu.Item>Bangalore</Menu.Item>
            <Menu.Item>Hyderabad</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="East">
            <Menu.Item>Kolkata</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="West" />

    </Menu>
);
interface SubHeaderProps { }

interface SubHeaderStates { }
const { Option, OptGroup } = Select;

class SubHeader extends PureComponent<SubHeaderProps, SubHeaderStates> {
    render() {
        return <>
            <div className={"sub-header"}>
                <div>
                    <Button size={"middle"} type="text">
                        ALL
                    </Button>
                    <Dropdown overlay={vehiclemenu} trigger={['click']}>
                        <Button size={"middle"} type="text">
                            Vehicle<DownOutlined />
                        </Button>
                    </Dropdown>
                    <Dropdown overlay={locationmenu} trigger={['click']}>
                        <Button size={"middle"} type="text">
                            Location<DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </>
    }
    handleChange(value: any) {
        console.log(`selected ${value}`);
    }
}

export default SubHeader;