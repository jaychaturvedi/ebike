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

interface SubHeaderStates {
    selectedVehicle: string
    selectedLocation: string
    vehicleActive: boolean
    locationActive: boolean
    selectedCalender: string
    calenderActive: boolean
    timeFrameVisible: boolean
    timeFrame: {
        starTime: string,
        endTime: string
    } | null
    dateRangeApplied: boolean
}

class SubHeader extends PureComponent<SubHeaderProps, SubHeaderStates> {
    constructor(props: SubHeaderProps) {
        super(props);
        this.state = {
            selectedVehicle: "Vehicle",
            vehicleActive: false,
            selectedLocation: "Location",
            locationActive: false,
            calenderActive: false,
            selectedCalender: "Time Frame",
            timeFrameVisible: false,
            timeFrame: {
                endTime: "",
                starTime: ""
            },
            dateRangeApplied: false
        }
    }

    handleVehicleClick = (e: any) => {
        message.info('Click on menu item.');
        console.log('click', e);
        this.setState({
            selectedVehicle: e.key,
            vehicleActive: true,
            locationActive: false,
            calenderActive: false,
        })
    }

    handleLocationClick = (e: any) => {
        message.info('Click on menu item.');
        console.log('click', e);
        this.setState({
            selectedLocation: e.key,
            vehicleActive: false,
            locationActive: true,
            calenderActive: false,
        })
    }

    handleDateClick = (e: any) => {
        message.info('Click on menu item.');
        console.log('click', e);
        switch (e.key) {
            case "1": {
                this.setState({
                    selectedCalender: moment(new Date(), this.dateFormatList[0]).toLocaleString(),
                    vehicleActive: false,
                    locationActive: false,
                    calenderActive: true,
                    timeFrameVisible: false
                });
                break;
            }
            case "2": {
                this.setState({
                    selectedCalender: moment(new Date(), this.dateFormatList[0]).toLocaleString(),
                    vehicleActive: false,
                    locationActive: false,
                    calenderActive: true,
                    timeFrameVisible: false
                });
                break;
            }
            case "3": {
                this.setState({
                    selectedCalender: moment(new Date(), this.dateFormatList[0]).toLocaleString(),
                    vehicleActive: false,
                    locationActive: false,
                    calenderActive: true,
                    timeFrameVisible: false
                });
                break;
            }
        }
    }

    timeFrameVisibleChange = (open: boolean) => {
        console.log(open)
        this.setState({
            timeFrameVisible: open
        })
    }

    onFromChange = (value: any, dateString: string) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString)
        this.setState(
            {
                timeFrame: {
                    starTime: dateString,
                    endTime: this.state.timeFrame!.endTime
                }
            }
        )
    }
    onToChange = (value: any, dateString: any) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString)
        this.setState(
            {
                timeFrame: {
                    endTime: dateString,
                    starTime: this.state.timeFrame!.starTime
                }
            }
        )
    }

    timeRangeApply = () => {
        console.log("applying date", this.state.timeFrame)
        this.setState({
            selectedCalender: `${this.state.timeFrame!.starTime} to ${this.state.timeFrame!.endTime}`,
            vehicleActive: false,
            locationActive: false,
            calenderActive: true,
            timeFrameVisible: false,
            dateRangeApplied: false,
        })
    }
    dateFormatList = ['DD/MM/YYYY'];
    render() {
        const vehicle = (
            <Menu onClick={this.handleVehicleClick}>
                <Menu.Item key="Classic" icon={<Vehicle width="20" height="20" />}>
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Classic</Typography.Text>
                </Menu.Item>
                <Menu.Item key="Ice" className={"dropdown-sub-item"}>
                    Ice
                </Menu.Item>
                <Menu.Item key="Kivo Standard" className={"dropdown-sub-item"}>
                    Kivo Standard
                </Menu.Item>
                <Menu.Item key="Kivo Easy" className={"dropdown-sub-item"}>
                    Kivo Easy
                </Menu.Item>
                <Menu.Item key="Cargo" icon={<CargoVehicle width="20" height="20" />}>
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Cargo</Typography.Text>
                </Menu.Item>
                <Menu.Item key="Ham" className={"dropdown-sub-item"}>
                    Ham
                </Menu.Item>
            </Menu>
        );
        const location = (
            <Menu onClick={this.handleLocationClick}>
                <Menu.Item key="North">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>North</Typography.Text>
                </Menu.Item>
                <Menu.Item key="South">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>South</Typography.Text>
                </Menu.Item>
                <Menu.Item key="Bangalore" className={"dropdown-sub-item"}>
                    Bangalore
                </Menu.Item>
                <Menu.Item key="Hyderabad" className={"dropdown-sub-item"}>
                    Hyderabad
                </Menu.Item>
                <Menu.Item key="East">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>East</Typography.Text>
                </Menu.Item>
                <Menu.Item key="kolkata" className={"dropdown-sub-item"}>
                    kolkata
                </Menu.Item>
                <Menu.Item key="West">
                    <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>West</Typography.Text>
                </Menu.Item>
            </Menu>
        );

        const timeFrame = (
            <Menu onClick={this.handleDateClick}>
                <Menu.Item key="1" style={{ marginLeft: "5%" }}>
                    As of Today
                </Menu.Item>
                <Menu.Item key="2" style={{ marginLeft: "5%" }}>
                    Last Week
                </Menu.Item>
                <Menu.Item key="3" style={{ marginLeft: "5%" }}>
                    Month Till Date
                </Menu.Item>
                <Menu.Item key="4" style={{ marginLeft: "5%" }} disabled={true}>
                    <Typography.Text strong style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Date Range</Typography.Text>
                    <DatePicker onChange={this.onFromChange} defaultValue={moment()} format={this.dateFormatList} bordered={false} />
                    <DatePicker onChange={this.onToChange} defaultValue={moment()} format={this.dateFormatList} bordered={false} />
                    <Button size={"small"} className={"apply-button"} onClick={this.timeRangeApply}>
                        APPLY
                    </Button>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"sub-header"}>
                <Button className={"connectM-button connectM-button-active"} size={"middle"} type="text">
                    ALL
                </Button>
                <Dropdown overlay={vehicle} trigger={['click']}>
                    <div className={`connectM-dropDown ${this.state.vehicleActive ? "connectM-dropdown-active" : ""}`}>
                        <div className={"pair "} >
                            <Vehicle width="20" height="20" className={`dropdown-svg-fill ${this.state.vehicleActive ? "dropdown-svg-fill-active" : ""}`} />
                            <Typography.Text className={`dropdown-typography ${this.state.vehicleActive ? "typography-active" : ""}`}>{this.state.selectedVehicle}</Typography.Text>
                        </div>
                        <DownOutlined className={"flip"} style={{ marginLeft: "40px" }} />
                    </div>
                </Dropdown>
                <Dropdown overlay={location} trigger={['click']}>
                    <div className={`connectM-dropDown ${this.state.locationActive ? "connectM-dropdown-active" : ""}`}>
                        <div className={"pair "} >
                            <Location width="20" height="20" className={`dropdown-svg-fill-location ${this.state.locationActive ? "dropdown-svg-fill-location-active" : ""}`} />
                            <Typography.Text className={`dropdown-typography ${this.state.locationActive ? "typography-active" : ""}`}>{this.state.selectedLocation}</Typography.Text>
                        </div>
                        <DownOutlined className={"flip"} style={{ marginLeft: "40px" }} />
                    </div>
                </Dropdown>
                <Dropdown overlay={timeFrame} trigger={['click']}
                    visible={this.state.timeFrameVisible}
                    onVisibleChange={this.timeFrameVisibleChange}
                >
                    <div className={`connectM-dropDown ${this.state.calenderActive ? "connectM-dropdown-active" : ""}`}>
                        <div className={"pair "} >
                            <Calender width="20" height="20" className={`dropdown-svg-fill-timeframe ${this.state.calenderActive ? "dropdown-svg-fill-timeframe-active" : ""}`} />
                            <Typography.Text className={`dropdown-typography ${this.state.calenderActive ? "typography-active" : ""}`}>{this.state.selectedCalender}</Typography.Text>
                        </div>
                        <DownOutlined className={"flip"} style={{ marginLeft: "40px" }} />
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