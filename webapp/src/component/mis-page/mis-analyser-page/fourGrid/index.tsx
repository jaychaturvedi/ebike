import './index.scss';
import React, { PureComponent } from 'react';
import { Typography } from 'antd';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import Header from "../topHeader"
import LineGraph from '../../../../subComponents/graph/chargingTrend';

interface Props { }

interface State {
    dscharge: boolean,
    charge: boolean
}

function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
    // switch (e.key) {
    //     case "1":
    //         return <DischargeGraph />
    //     case "2":
    //         return <LineGraph />
    // }
}
const graphTypes = ["SoC Battery Pressure", "SoC Acquisition", "SoC Current",
    "SoC", "Min/Max Battery Cell Voltage", "Min/Max Battery Cell Temp",
    "BMS Life", "Ambient Temperature",
    "Charge/Discharge Cycles", "Cell Voltage", "Speed"]
const menu = (
    <Menu onClick={handleMenuClick}>
        {  graphTypes.map((name, key) => {
            return (<Menu.Item key={key} >
                {name}
            </Menu.Item>)
        })}
    </Menu>
);
export const GraphSelector = () => (
    <Dropdown overlay={menu} trigger={['click']} placement={"bottomRight"}>
        <div className={"grid-dropDown grid-dropdown-active"}>
            <div className={"pair"} >
                <Typography.Text className={`dropdown-typography`}>Choose Parameter</Typography.Text>
            </div>
            <DownOutlined className={"flip"} style={{ marginLeft: "16px" }} />
        </div>
    </Dropdown>)

class Grid extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            charge: false,
            dscharge: false
        }
    }
    render() {
        return (
            <>
                {/* <Header /> */}
                <div className='container-fluid four-analyser' >
                    <div className='grid-one'>
                        <div className="grid-header" >
                            <GraphSelector />
                        </div>
                        <div className="graph-container">
                            <LineGraph />
                        </div>
                    </div>

                    <div className='grid-two'>
                        <div className="grid-header">
                            <GraphSelector />
                        </div>
                        <div className="graph-container">
                            <LineGraph />

                        </div>
                    </div>
                </div>
                <div className='container-fluid four-analyser' >

                    <div className='grid-three'>
                        <div className="grid-header">
                            <GraphSelector />
                        </div>
                        <div className="graph-container">
                            <LineGraph />
                        </div>
                    </div>

                    <div className='grid-four'>
                        <div className="grid-header">
                            <GraphSelector />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Grid