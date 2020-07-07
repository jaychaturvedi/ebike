import './index.scss';
import { Typography, Divider, Select, Rate } from "antd";
import React, { PureComponent } from 'react';
interface ServiceProps { }

interface ServiceStates {
    granuality: string[]
}

class Service extends PureComponent<ServiceProps, ServiceStates> {
    constructor(props: ServiceProps) {
        super(props);
        this.state = {
            granuality: ["Week", "Month", "Year"]
        }
    }
    render() {
        return (
            <div className="connectm-Service">
                <div className={"statistics-title"}>
                    <Typography.Text strong>SERVICE</Typography.Text>
                </div>
                <Divider type="horizontal" />
                <div className={"statistics-content"}>
                    <div className={"statistics-content-row"}>
                        <div>
                            <div>Avg Customer Rating</div>
                            <span>
                                <Rate className={"service-rating"} tooltips={["5/5"]} value={5} allowHalf={true} disabled={true} />
                                {5 ? <span className="ant-rate-text">5/5</span> : ''}
                            </span>
                        </div>

                        <Divider type="vertical" />
                        <div>
                            <span>Avg TAT</span>
                            <br />
                            <span>5 hr 35 min</span>
                        </div>
                    </div>
                </div>
                <Divider type="horizontal" />
                <div className={"statistics-title"}>
                    <Typography.Text strong>Vehicles For Service</Typography.Text>
                    <Typography.Text strong><Select defaultValue="Week" style={{ width: 120 }} bordered={false}>
                        {this.state.granuality.map((gran, index) => {

                            return <Select.Option key={index} value={gran}>{gran}</Select.Option>
                        })}
                    </Select></Typography.Text>
                </div>
                <Divider type="horizontal" />
                <div className={"statistics-content"}>
                    <div className={"statistics-content-row"}>
                        <div>
                            <span>Classic</span>
                            <br />
                            <span>200</span></div>
                        <Divider type="vertical" />
                        <div>
                            <span>Cargo</span>
                            <br />
                            <span>300</span>
                        </div>
                    </div>
                </div>
                <Divider type="horizontal" />
                <div className={"statistics-Subtitle"}>
                    <div>Frequent Problem</div>
                    <Divider type="vertical" />
                    <div>Repeat Issues</div>
                </div>
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
                <Divider type="horizontal" />
                <div className={"statistics-Subtitle"}>
                    <div>Battery Claims</div>
                    <Divider type="vertical" />
                    <div>Motor Claims</div>
                    <Divider type="vertical" />
                    <div>Service Expected</div>
                </div>
                <Divider type="horizontal" />
                <div className={"statistics-title"} style={{ justifyContent: "flex-end" }}>
                    <Select defaultValue="Week" style={{ width: 120 }} bordered={false}>
                        {this.state.granuality.map((gran, index) => {
                            return <Select.Option key={index} value={gran}>{gran}</Select.Option>
                        })}
                    </Select>
                </div>
                <div className={"statistics-content"} >
                    <div className={"statistics-content-row"}>
                        <div>100</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Service;