import './index.scss';
import { Divider, Typography, message, Button } from "antd";
import React, { PureComponent } from 'react';
import SeparatedColumn from "../../connectm-blocks/separated-column"
interface InventryAndSalesProps { }

interface InventryAndSalesStates {
    batteryClicked: boolean;
    vehicleClicked: boolean;
}

class InventryAndSales extends PureComponent<InventryAndSalesProps, InventryAndSalesStates> {
    constructor(props: InventryAndSalesProps) {
        super(props)
        this.state = {
            batteryClicked: false,
            vehicleClicked: true
        }
    }

    vehicleClicked = () => {
        message.info("You clicked Vehicle");
        this.setState({
            ...this.state,
            batteryClicked: false,
            vehicleClicked: true
        });
    }
    batteryClicked = () => {
        message.info("You clicked Battery");
        this.setState({
            ...this.state,
            batteryClicked: true,
            vehicleClicked: false
        });
    }
    render() {

        return (
            <div className="connectm-InventryAndSales">
                <div className={"statistics-title"}>
                    <Typography.Text strong>INVENTRY & SALES</Typography.Text>
                </div>
                <Divider type="horizontal" />

                < SeparatedColumn
                    cssClass={"statistics-Subtitle"}
                    columnData={[
                        <Button type="text" className={`statistics-sub-subtitles ${this.state.vehicleClicked ? "option-clicked" : ""}`} onClick={this.vehicleClicked}>Vehicles</Button>,
                        <Button type="text" className={`statistics-sub-subtitles ${this.state.batteryClicked ? "option-clicked" : ""}`} onClick={this.batteryClicked}>Battery</Button>
                    ]}
                    numberOfColumns={2}
                />
                {/* <Button type="text" className={`statistics-sub-subtitles ${this.state.vehicleClicked ? "option-clicked" : ""}`} onClick={this.vehicleClicked}>Vehicles</Button>
                    <Divider type="vertical" />
                    <Button type="text" className={`statistics-sub-subtitles ${this.state.batteryClicked ? "option-clicked" : ""}`} onClick={this.batteryClicked}>Battery</Button> */}

                <Divider type="horizontal" />
                <div className={"statistics-content"}>
                    <div className={"statistics-content-row"}>
                        <div>Row1Col1</div>
                        <Divider type="vertical" />
                        <div> Row1Col2 </div>
                    </div>
                    <Divider type="horizontal" />
                    <div className={"statistics-content-row"}>
                        <div>Row2Col1</div>
                        <Divider type="vertical" />
                        <div> Row2Col2 </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default InventryAndSales;