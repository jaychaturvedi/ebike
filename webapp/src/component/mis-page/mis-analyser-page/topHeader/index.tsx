import './index.scss';
import React, { PureComponent } from 'react';
import { Dropdown, Menu, message, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Icon2gridInactive from '../../../../assets/batch2/2x1grid_icon_inactive.png'
import Icon2gridActive from '../../../../assets/batch2/2x1grid_icon.png'
import Icon4gridInactive from '../../../../assets/batch2/2x2grid_icon.png'
import Icon4gridActive from '../../../../assets/batch2/2x2grid_icon_active.png'


interface Props {
    toggleGrid: Function,
    displayedGrid: string
}

interface State { }

function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}
const batteries = ["BAT 1234567", "BAT 456321"]
const vehicles = ["VEH 123456", "VEH 65431"]
const menu = (data: any) => {
    return (
        <Menu onClick={handleMenuClick}>
            {  data.map((name: string, key: number) => {
                return (<Menu.Item key={key} >
                    {name}
                </Menu.Item>)
            })}
        </Menu>
    )
}

const BatterySelector = () => (<Dropdown overlay={() => { return menu(batteries) }} trigger={['click']} placement={"bottomRight"}>
    <div className={"battery-dropDown grid-dropdown-active"}>
        <div className={"pair"} >
            <Typography.Text className={`dropdown-typography`}>Battery Id</Typography.Text>
        </div>
        <DownOutlined className={"flip"} style={{ marginLeft: "16px" }} />
    </div>
</Dropdown>)

const VehicleSelector = () => (<Dropdown overlay={() => { return menu(vehicles) }} trigger={['click']} placement={"bottomRight"}>
    <div className={"vehicle-dropDown grid-dropdown-active"}>
        <div className={"pair"} >
            <Typography.Text className={`dropdown-typography`}>Vehicle Id</Typography.Text>
        </div>
        <DownOutlined className={"flip"} style={{ marginLeft: "16px" }} />
    </div>
</Dropdown>)


class Header extends PureComponent<Props, State> {

    render() {
        return (
            <>

                <div className='analyser-header' >
                    <div className='header customer'>
                        <Typography.Text className={`customerId-typography`} strong >CUS-34567</Typography.Text>
                    </div>
                    <div className='header vehicle'>
                        <VehicleSelector />
                    </div>
                    <div className='header battery'>
                        <BatterySelector />
                    </div>
                    <div className='header start-time'>
                        <div className="text-pair left">
                            Start Date/Time
                        </div>

                        <div className="text-pair right">
                            1 Aug 20209:00AM
                        </div>
                    </div>
                    <div className="header end-time">

                        <div className="text-pair left">
                            End Date/Time
                        </div>

                        <div className="text-pair right">
                            5 Sep 20209:00AM
                        </div>

                    </div>
                    <div className='header grid-selector'>
                        <div className="grid-pair-left">
                            Grid
                        </div>

                        <div className="grid-pair right-two" onClick={() => { this.props.toggleGrid("Two") }}>
                            {this.props.displayedGrid === "Two" ? <img src={Icon2gridActive} /> : <img src={Icon2gridInactive} />}
                        </div>
                        <div className="grid-pair right-four" onClick={() => { this.props.toggleGrid("Four") }}>
                            {this.props.displayedGrid === "Four" ? <img src={Icon4gridActive} /> : <img src={Icon4gridInactive} />}
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Header