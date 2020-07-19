import './index.scss';
import React, { PureComponent } from 'react';
import { Button } from 'antd';
interface TabsProps { }

interface TabsStates { }

class Tabs extends PureComponent<TabsProps, TabsStates> {

    render() {
        return (
            <div className="connectm-Tabs">
                <Button size={"middle"} type="text" className={"tab-buttons"}>
                    Smart Alerts (100)
                </Button>
                <Button size={"middle"} type="text" className={"tab-buttons"}>
                    BMS Alerts (100)
                </Button>
                <Button size={"middle"} type="text" className={"tab-buttons"}>
                    Motor Controller Alerts (4)
                </Button>
            </div>
        )
    }

}

export default Tabs;