import './index.scss';
import React, { PureComponent } from 'react';
import { Dropdown, Menu, message, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface Props {
    toggleGrid?: Function
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
                    <div className='header start-time'>
                        <div className="text-pair left">
                            Last Synced On
                        </div>
                        <div className="text-pair right">
                            1 Aug 20209:00AM
                        </div>
                    </div>
                    <div className='header customer'>
                        <Typography.Text className={`customerId-typography`} strong >CUS-34567</Typography.Text>
                    </div>

                    <div className='header battery'>
                        <BatterySelector />
                    </div>
                </div>

            </>
        )
    }
}

export default Header