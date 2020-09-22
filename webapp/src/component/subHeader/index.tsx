import './index.scss';
import React, { PureComponent } from 'react';
import { Menu, Dropdown, DatePicker, Button, Input, Select, Typography } from 'antd';
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { ReactComponent as Vehicle } from "../../assets/vehicle_icon.svg"
import { ReactComponent as CargoVehicle } from "../../assets/cargo_vehicle_icon.svg"
import { ReactComponent as Location } from "../../assets/location_icon.svg"
import { ReactComponent as Calender } from "../../assets/calendar_icon.svg"
import { ReactComponent as Search } from "../../assets/search_icon.svg"
import { ReduxAlertActions, ReduxAlertState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/alerts"
import { connect } from 'react-redux'
import moment from 'moment';
import { TFilter } from '../../connectm-client/redux/models';

interface SubHeaderProps extends ReduxAlertActions, ReduxAlertState { }

interface SubHeaderStates {
    allSelected: boolean
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
    searchText: string,
    applyFilter: TFilter
}

class SubHeader extends PureComponent<SubHeaderProps, SubHeaderStates> {
    constructor(props: SubHeaderProps) {
        super(props);
        this.state = {
            allSelected: true,
            selectedVehicle: "Vehicle",
            selectedCalender: "Time Frame",
            selectedLocation: "Location",
            vehicleActive: false,
            locationActive: false,
            calenderActive: false,
            timeFrameVisible: false,
            timeFrame: {
                endTime: "",
                starTime: ""
            },
            dateRangeApplied: false,
            searchText: "",
            applyFilter: {
                fieldName: "all",
                value: ""
            }
        }
    }

    handleVehicleClick = (e: any) => {
        console.log('click', e);
        this.setState({
            selectedVehicle: e.key,
            selectedCalender: "Time Frame",
            selectedLocation: "Location",
            allSelected: false,
            vehicleActive: true,
            locationActive: false,
            calenderActive: false,
            searchText: "",
            applyFilter: {
                fieldName: "model",
                value: e.key
            }
        })
    }

    handleLocationClick = (e: any) => {
        this.setState({
            selectedLocation: e.key,
            selectedVehicle: "Vehicle",
            selectedCalender: "Time Frame",
            allSelected: false,
            vehicleActive: false,
            locationActive: true,
            calenderActive: false,
            searchText: "",
            applyFilter: {
                fieldName: "location",
                value: String(e.key)
            }
        })
        console.log('click', this.state.applyFilter);
    }

    handleDateClick = (e: any) => {
        console.log('click', e);
        switch (e.key) {
            case "1": {
                this.setState({
                    selectedCalender: moment().format(this.dateFormatList[0]),
                    selectedVehicle: "Vehicle",
                    selectedLocation: "Location",
                    allSelected: false,
                    vehicleActive: false,
                    locationActive: false,
                    calenderActive: true,
                    timeFrameVisible: false,
                    searchText: "",
                    applyFilter: {
                        fieldName: "timeFrame",
                        value: "As of Now"
                    }
                });
                break;
            }
            case "2": {
                const startDate = moment().subtract(7, 'days').format(this.dateFormatList[0]);
                const endDate = moment().format(this.dateFormatList[0])
                this.setState({
                    selectedCalender: `${startDate} to ${endDate}`,
                    selectedVehicle: "Vehicle",
                    selectedLocation: "Location",
                    allSelected: false,
                    vehicleActive: false,
                    locationActive: false,
                    calenderActive: true,
                    timeFrameVisible: false,
                    searchText: "",
                    applyFilter: {
                        fieldName: "timeFrame",
                        value: "Last Week"
                    }
                });
                break;
            }
            case "3": {
                const startDate = moment().subtract(1, 'months').format(this.dateFormatList[0]);
                const endDate = moment().format(this.dateFormatList[0])
                this.setState({
                    selectedCalender: `${startDate} to ${endDate}`,
                    selectedVehicle: "Vehicle",
                    selectedLocation: "Location",
                    allSelected: false,
                    vehicleActive: false,
                    locationActive: false,
                    calenderActive: true,
                    timeFrameVisible: false,
                    searchText: "",
                    applyFilter: {
                        fieldName: "timeFrame",
                        value: "Month Till Date"
                    }
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
        console.log("applying date", this.state.timeFrame, "moment", moment(new Date(), this.dateFormatList[0]))
        const dateRange = `${this.state.timeFrame!.starTime || moment().format(this.dateFormatList[0])} to ${this.state.timeFrame!.endTime || moment().format(this.dateFormatList[0])}`
        this.setState({
            selectedCalender: dateRange,
            selectedVehicle: "Vehicle",
            selectedLocation: "Location",
            allSelected: false,
            vehicleActive: false,
            locationActive: false,
            calenderActive: true,
            timeFrameVisible: false,
            dateRangeApplied: false,
            searchText: "",
            applyFilter: {
                fieldName: "DateRange",
                value: dateRange
            }
        })
    }
    dateFormatList = ['DD/MM/YYYY'];

    onApplyFilter = () => {
        console.log(moment("2020-07-24 10:13:00").toDate())
        let filter: TFilter
        if (this.state.searchText.length > 0) {
            filter = {
                fieldName: "search",
                value: this.state.searchText
            }
            this.setState({
                allSelected: !this.state.allSelected
            })
        } else {
            filter = this.state.applyFilter
            console.log(filter, "my filter");

        }
        this.props.alertFilterChanged({
            type: "UPDATE_FILTER",
            payload: {
                alertType: this.props.alerts.activeAlertTab,
                pagination: {
                    pageNumber: 1,
                    pageSize: 10
                },
                sort: this.props.alerts.sort,
                filter: filter
            }
        })
    }

    onReset = () => {
        this.setState({
            allSelected: true,
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
            dateRangeApplied: false,
            searchText: ""
        })
        this.props.alertFilterChanged({
            type: "UPDATE_FILTER",
            payload: {
                alertType: this.props.alerts.activeAlertTab,
                pagination: {
                    pageNumber: 1,
                    pageSize: 10
                },
                sort: this.props.alerts.sort,
                filter: {
                    fieldName: "all",
                    value: ""
                }
            }
        })
    }

    onAll = () => {
        this.setState({
            allSelected: true,
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
            dateRangeApplied: false,
            applyFilter: {
                fieldName: "all",
                value: ""
            }
        });
    }

    onSearch = (e: any) => {
        console.log("search", e.target)
        this.setState(
            {
                ...this.state,
                searchText: e.target.value
            }
        )
    }

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
                    <Typography.Text strong >North</Typography.Text>
                </Menu.Item>
                <Menu.Item key="South">
                    <Typography.Text strong>South</Typography.Text>
                </Menu.Item>
                <Menu.Item key="Bangalore" className={"location-dropdown-sub-item"}>
                    Bangalore
                </Menu.Item>
                <Menu.Item key="Hyderabad" className={"location-dropdown-sub-item"}>
                    Hyderabad
                </Menu.Item>
                <Menu.Item key="East">
                    <Typography.Text strong >East</Typography.Text>
                </Menu.Item>
                <Menu.Item key="kolkata" className={"location-dropdown-sub-item"}>
                    kolkata
                </Menu.Item>
                <Menu.Item key="West">
                    <Typography.Text strong >West</Typography.Text>
                </Menu.Item>
            </Menu>
        );

        const timeFrame = (
            <Menu onClick={this.handleDateClick}>
                <Menu.Item key="1" >
                    As of Now
                </Menu.Item>
                <Menu.Item key="2" >
                    Last Week
                </Menu.Item>
                <Menu.Item key="3" >
                    Month Till Date
                </Menu.Item>
                <Menu.Item key="4" disabled={true} className={"connectM-DatePicker-container"}>
                    <Typography.Text strong style={{ whiteSpace: "nowrap" }}>Date Range</Typography.Text>
                    <div className={"datepicker-text-pair"}>
                        From <DatePicker onChange={this.onFromChange} defaultValue={moment()} format={this.dateFormatList} bordered={false} />
                    </div>
                    <div className={"datepicker-text-pair"}>
                        To <DatePicker onChange={this.onToChange} defaultValue={moment()} format={this.dateFormatList} bordered={false} />
                    </div>
                    <Button size={"small"} className={"apply-button-datepicker"} onClick={this.timeRangeApply}>
                        <Typography.Text style={{ color: "black" }} strong>Done</Typography.Text>
                    </Button>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={"sub-header"}>
                <div className={"sub-header-left"}>
                    <Button className={`connectM-button ${this.state.allSelected ? "connectM-button-active" : ""}`} size={"middle"} type="text" onClick={this.onAll}>
                        All
                </Button>
                    <Dropdown overlay={vehicle} trigger={['click']}>
                        <div className={`connectM-dropDown ${this.state.vehicleActive ? "connectM-dropdown-active" : ""}`}>
                            <div className={"pair"}>
                                <Vehicle style={{ marginLeft: "5px" }} width="20" height="20" className={`dropdown-svg-fill ${this.state.vehicleActive ? "dropdown-svg-fill-active" : ""}`} />
                                <Typography.Text className={`dropdown-typography ${this.state.vehicleActive ? "typography-active" : ""}`}>{this.state.selectedVehicle}</Typography.Text>
                            </div>
                            <DownOutlined className={"flip"} style={{ marginLeft: "40px" }} />
                        </div>
                    </Dropdown>
                    <Dropdown overlay={location} trigger={['click']}>
                        <div className={`connectM-dropDown ${this.state.locationActive ? "connectM-dropdown-active" : ""}`}>
                            <div className={"pair"} >
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
                            <div className={"pair"} >
                                <Calender width="20" height="20" className={`dropdown-svg-fill-timeframe ${this.state.calenderActive ? "dropdown-svg-fill-timeframe-active" : ""}`} />
                                <Typography.Text className={`dropdown-typography ${this.state.calenderActive ? "typography-active" : ""}`}>{this.state.selectedCalender}</Typography.Text>
                            </div>
                            <DownOutlined className={"flip"} style={{ marginLeft: "40px" }} />
                        </div>
                    </Dropdown>
                    <div style={{ width: "27%" }} className={`${this.state.searchText.length > 0 ? "search-background-color-active" : "search-background-color"}`}>
                        <Input
                            onChange={this.onSearch}
                            value={this.state.searchText}
                            placeholder="Vehicles, Batteries, Customers..."
                            prefix={<SearchOutlined />}
                            maxLength={50}
                            className={"search-background-color"}
                        />
                    </div>
                </div>
                <div className={"sub-header-right"}>
                    <Button size={"small"} className={"apply-button"} onClick={this.onApplyFilter}>
                        <Typography.Text style={{ color: "black" }} strong>APPLY</Typography.Text>
                    </Button>
                    <Button size={"small"} className={"reset-button"} onClick={this.onReset}>
                        <Typography.Text style={{ color: "#ffffff" }} strong>RESET</Typography.Text>
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);