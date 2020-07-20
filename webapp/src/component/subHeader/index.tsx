import './index.scss';
import React, { PureComponent } from 'react';
import { Menu, Dropdown, message, DatePicker, Button, Input, Select, Typography } from 'antd';
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { ReactComponent as Vehicle } from "../../assets/vehicle_icon.svg"
import { ReactComponent as CargoVehicle } from "../../assets/cargo_vehicle_icon.svg"
import { ReactComponent as Location } from "../../assets/location_icon.svg"
import { ReactComponent as Calender } from "../../assets/calendar_icon.svg"
import { ReactComponent as Search } from "../../assets/search_icon.svg"
import moment from 'moment';
interface SubHeaderProps { }

interface SubHeaderStates { }
const { Option, OptGroup } = Select;

class SubHeader extends PureComponent<SubHeaderProps, SubHeaderStates> {
    //     function handleButtonClick(e) {
    //     message.info('Click on left button.');
    //     console.log('click left button', e);
    // }

    handleMenuClick = (e: any) => {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    render() {
        const vehicle = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" icon={<Vehicle width="20" height="20" />}>
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Classic</Typography.Text>
                </Menu.Item>
                <Menu.Item key="2" className={"dropdown-sub-item"}>
                    Ice
                </Menu.Item>
                <Menu.Item key="3" className={"dropdown-sub-item"}>
                    Kivo Standard
                </Menu.Item>
                <Menu.Item key="4" className={"dropdown-sub-item"}>
                    Kivo Easy
                </Menu.Item>
                <Menu.Item key="5" icon={<CargoVehicle width="20" height="20" />}>
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Cargo</Typography.Text>
                </Menu.Item>
                <Menu.Item key="4" className={"dropdown-sub-item"}>
                    Ham
                </Menu.Item>
            </Menu>
        );
        const location = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>North</Typography.Text>
                </Menu.Item>
                <Menu.Item key="2">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>South</Typography.Text>
                </Menu.Item>
                <Menu.Item key="2" className={"dropdown-sub-item"}>
                    Bangalore
                </Menu.Item>
                <Menu.Item key="2" className={"dropdown-sub-item"}>
                    Hyderabad
                </Menu.Item>
                <Menu.Item key="3">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>East</Typography.Text>
                </Menu.Item>
                <Menu.Item key="2" className={"dropdown-sub-item"}>
                    kolkata
                </Menu.Item>
                <Menu.Item key="4">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>West</Typography.Text>
                </Menu.Item>
            </Menu>
        );
        const dateFormatList = ['DD/MM/YYYY'];
        const timeFrame = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" style={{ marginLeft: "5%" }}>
                    As of Today
                </Menu.Item>
                <Menu.Item key="2" style={{ marginLeft: "5%" }}>
                    Last Week
                </Menu.Item>
                <Menu.Item key="3" style={{ marginLeft: "5%" }}>
                    Month Till Date
                </Menu.Item>
                <Menu.Item key="4" style={{ marginLeft: "5%" }}>
                    Date Range
                    <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} bordered={false} />
                    <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} bordered={false} />
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"sub-header"}>
                <Button className={"connectM-button connectM-button-active"} size={"middle"} type="text">
                    ALL
                </Button>
                <Dropdown overlay={vehicle} trigger={['click']}>
                    <div className={"connectM-dropDown"}>
                        <div className={"pair"} >
                            <Vehicle width="20" height="20" />
                            <Typography.Text style={{ color: "#ffffff", marginLeft: "10%" }}>Vehicle</Typography.Text>
                        </div>
                        <DownOutlined style={{ marginLeft: "20%" }} />
                    </div>
                </Dropdown>
                <Dropdown overlay={location} trigger={['click']}>
                    <div className={"connectM-dropDown"}>
                        <div className={"pair"} >
                            <Location width="20" height="20" />
                            <Typography.Text style={{ color: "#ffffff", marginLeft: "10%" }}>Location</Typography.Text>
                        </div>
                        <DownOutlined style={{ marginLeft: "20%" }} /></div>
                </Dropdown>
                <Dropdown overlay={timeFrame} trigger={['click']}>
                    <div className={"connectM-dropDown"}>
                        <div className={"pair"} >
                            <Calender width="25" height="20" />
                            <Typography.Text style={{ color: "#ffffff", marginLeft: "10%", whiteSpace: "nowrap" }}>Time Frame</Typography.Text>
                        </div>
                        <DownOutlined style={{ marginLeft: "20%" }} />
                    </div>
                </Dropdown>
                <div style={{ width: "200px" }} className={"search-background-color"}>
                    <Input
                        placeholder="Search for Vehicles,Batteries,customers..."
                        prefix={<SearchOutlined />}
                        maxLength={50}
                        className={"search-background-color"}
                    />
                </div>
                <Button size={"small"} className={"apply-button"}>
                    APPLY
                </Button>
                <Button size={"small"} className={"reset-button"} >
                    RESET
                 </Button>
            </div>
        )
    }
}

export default SubHeader;