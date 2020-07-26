import './index.scss';
import React, { PureComponent } from 'react';
import { Button, Typography } from 'antd';
interface TabsProps { }

interface TabsStates { }

class Tabs extends PureComponent<TabsProps, TabsStates> {

    render() {
        return (
            <div className="connectm-Tabs">
                <Button size={"middle"} type="text" className={"tab-buttons tab-active"}>
                    <Typography.Text strong style={{whiteSpace:"nowrap"}}>Smart Alerts <span style={{paddingLeft : "5px"}}>(100)</span></Typography.Text>
                </Button>
                <Button size={"middle"} type="text" className={"tab-buttons"}>
                    <Typography.Text style={{ whiteSpace: "nowrap" }}>BMS Alerts <span style={{ paddingLeft: "5px" }}>(100)</span></Typography.Text>
                </Button>
                <Button size={"middle"} type="text" className={"tab-buttons"}>
                    <Typography.Text style={{ whiteSpace: "nowrap" }}>Motor Controller Alerts <span style={{ paddingLeft: "5px" }}>(4)</span></Typography.Text>
                </Button>
            </div>
        )
    }

}

export default Tabs;