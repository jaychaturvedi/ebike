import './index.scss';
import { Divider, Typography, Button, message, Menu, Dropdown, Select } from "antd";
import React, { PureComponent } from 'react';
import SeparatedColumn from "../../connectm-blocks/separated-column"
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import Charts from "./charts/chart-renderer"


interface VehicleUtilizationProps { }

interface VehicleUtilizationStates {
    mileageClicked: boolean;
    alertsClicked: boolean;
    speedClicked: boolean;
    hotspotsClicked: boolean;
    countries: string[];
}

class VehicleUtilization extends PureComponent<VehicleUtilizationProps, VehicleUtilizationStates> {

    constructor(props: VehicleUtilizationProps) {
        super(props);
        this.state = {
            mileageClicked: false,
            alertsClicked: false,
            speedClicked: false,
            hotspotsClicked: true,
            countries: ["America", "India", "Singapore"]
        }
    }
    mileageClicked = () => {
        message.info("You clicked Vehicle");
        this.setState({
            ...this.state,
            mileageClicked: true,
            alertsClicked: false,
            speedClicked: false,
            hotspotsClicked: false
        });
    }
    alertsClicked = () => {
        message.info("You clicked Battery");
        this.setState({
            ...this.state,
            mileageClicked: false,
            alertsClicked: true,
            speedClicked: false,
            hotspotsClicked: false
        });
    }
    speedClicked = () => {
        message.info("You clicked Vehicle");
        this.setState({
            ...this.state,
            mileageClicked: false,
            alertsClicked: false,
            speedClicked: true,
            hotspotsClicked: false
        });
    }
    hotspotsClicked = () => {
        message.info("You clicked Battery");
        this.setState({
            ...this.state,
            mileageClicked: false,
            alertsClicked: false,
            speedClicked: false,
            hotspotsClicked: true
        });
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
            <div className="connectm-VehicleUtilization">
                <div className={"statistics-title"}>
                    <Typography.Text strong>VEHICLE UTILIZATION</Typography.Text>
                    <Typography.Text strong><Select defaultValue="Week" style={{ width: 120 }} bordered={false}>
                        {this.state.countries.map((country, index) => {
                            return <Select.Option key={index} value={country}>{country}</Select.Option>
                        })}
                    </Select></Typography.Text>
                </div>
                <Divider type="horizontal" />
                <SeparatedColumn
                    cssClass={"statistics-Subtitle"}
                    columnData={[
                        <Button type="text" className={`statistics-sub-subtitles ${this.state.mileageClicked ? "option-clicked" : ""}`} onClick={this.mileageClicked}>Mileage</Button>,
                        <Button type="text" className={`statistics-sub-subtitles ${this.state.alertsClicked ? "option-clicked" : ""}`} onClick={this.alertsClicked}>Alerts</Button>,
                        <Button type="text" className={`statistics-sub-subtitles ${this.state.speedClicked ? "option-clicked" : ""}`} onClick={this.speedClicked}>Speed</Button>,
                        <Button type="text" className={`statistics-sub-subtitles ${this.state.hotspotsClicked ? "option-clicked" : ""}`} onClick={this.hotspotsClicked}>Hotspots</Button>
                    ]}
                    numberOfColumns={4}
                />
                <Divider type="horizontal" />
                <SeparatedColumn
                    cssClass={"statistics-Subtitle"}
                    columnData={[
                        <div className={"statistics-sub-subtitles"}>Country:
                             <Select defaultValue="India" style={{ width: 120 }} bordered={false}>
                                {this.state.countries.map((country, index) => {
                                    return <Select.Option key={index} value={country}>{country}</Select.Option>
                                })}
                            </Select>
                        </div>
                        ,
                        <div className={"statistics-sub-subtitles"}>State:
                             <Select defaultValue="India" style={{ width: 120 }} bordered={false}>
                                {this.state.countries.map((country, index) => {
                                    return <Select.Option key={index} value={country}>{country}</Select.Option>
                                })}
                            </Select>
                        </div>,
                        <div className={"statistics-sub-subtitles"}>City:
                             <Select defaultValue="India" style={{ width: 120 }} bordered={false}>
                                {this.state.countries.map((country, index) => {
                                    return <Select.Option key={index} value={country}>{country}</Select.Option>
                                })}
                            </Select>
                        </div>,

                        <Button type="text" style={{ width: "150px" }}>
                            Clear all
                        </Button>,
                    ]}
                    numberOfColumns={4}
                />
                <Divider type="horizontal" />
                <div className={"statistics-content"}>
                    {/* <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        columnData={[<div>Row1Col1</div>, <div> Row1Col2 </div>, <div> Row1Col3 </div>]}
                        numberOfColumns={3}
                    />
                    <Divider type="horizontal" />
                    <SeparatedColumn
                        cssClass={"statistics-content-row"}
                        columnData={[<div>Row2Col1</div>, <div> Row2Col2 </div>, <div> Row2Col3 </div>]}
                        numberOfColumns={3}
                    /> */}
                    <Charts type={"BUBBLE"} />
                </div>
            </div>
        )
    }

}

export default VehicleUtilization;