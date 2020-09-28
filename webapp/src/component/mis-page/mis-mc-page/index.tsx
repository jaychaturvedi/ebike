import './index.scss';
import React, { PureComponent } from 'react';
import CustomizedTables from '../../../subComponents/table/batteryStatusTable';
import ChargingTrend from '../../../subComponents/graph/chargingTrend';
import Battery from '../../../assets/battery_health__g_icon.png'
import IconMap from '../../../assets/batch2/map.png'
import Header from './topHeader'
import Dialer from './dialer'
import { Typography } from 'antd';

interface Props { }

interface States {
}
//Smart Alerts
//BMS Alerts
//Motor Controller Alerts
class MisMC extends PureComponent<Props, States> {
    constructor(props: Props) {
        super(props)
        this.state = {
        }
    }
    tabClicked = (params: any) => {
        console.log(params);

    }
    render() {
        const style = { background: '#3C4473', padding: '8px' };
        return (
            <>
                {/* <Header /> */}
                <div className="grid-container">
                    <div className="item1 top-cell left">
                        <div className="header">
                            <div className='last-sync-header'>
                                <div className="text-pair left">
                                    Last Synced On
                                </div>
                                <div className="text-pair right">
                                    1 Aug 20209:00AM
                        </div>
                            </div> </div>
                        <div className="content">
                            <div className="dialer">
                                <div style={{
                                    width: "30%", margin: '0 auto', position: 'relative',
                                    top: '24px'
                                }}>
                                    <Dialer />
                                </div>
                            </div>
                            <div className="dialer"></div>
                            <div className="card-container">
                                <span>Soc</span>
                                <div className="card-body">
                                    <div className="label">
                                        <div>
                                            <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Charge</Typography.Text>
                                        </div>
                                        <div>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>84%</Typography.Text>
                                        </div>
                                    </div>
                                    <div className="label">
                                        <div>
                                            <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Pressure</Typography.Text>
                                        </div>
                                        <div>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>2.3V</Typography.Text>
                                        </div>
                                    </div>


                                    <div className="label" >
                                        <div>
                                            <Typography.Text style={{ whiteSpace: "nowrap", color: 'grey' }}>Acquisition</Typography.Text>
                                        </div>
                                        <div>
                                            <Typography.Text style={{ whiteSpace: "nowrap", color: 'red' }} strong>2.2V</Typography.Text>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item2 top-cell right">
                        <div className="header">
                            <Typography.Text style={{ whiteSpace: "nowrap" }} className="header-title" strong>BATTERY STATUS</Typography.Text>
                        </div>
                        <div className="content">
                            <div className="battery-table">
                                <CustomizedTables />
                            </div>
                            <div className="health">
                                <div className="health-tab">
                                    <div className="health-card" >
                                        <Typography.Text style={{ whiteSpace: "normal" }}>Ambient Temperature</Typography.Text>
                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>24' C</Typography.Text>
                                    </div>
                                    <div className="health-card" >
                                        <Typography.Text style={{ whiteSpace: "normal" }}>Ambient Temperature</Typography.Text>
                                        <Typography.Text style={{ whiteSpace: "nowrap" }}>24' C</Typography.Text>
                                    </div>
                                </div>
                                <div className="battery-image-container">
                                    <div className="battery-health-circle">
                                        <img src={Battery} style={{ width: '50px', height: '50px', alignSelf: 'center' }} />
                                        <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }} >
                                            <Typography.Text style={{ whiteSpace: "normal", }} strong>Health</Typography.Text>
                                            <Typography.Text style={{ whiteSpace: "nowrap" }} strong>82%</Typography.Text>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item3 bottom-cell left">
                        <div className="header">
                            <Typography.Text style={{ whiteSpace: "nowrap" }} className="header-title" strong>CELL VOLTAGE</Typography.Text>
                        </div>
                        <div className="content"></div>
                        {/* <div className="graph-container">
                            <ChargingTrend />
                        </div> */}
                    </div>
                    <div className="item4 bottom-cell center">
                        <div className="header">
                            <Typography.Text style={{ whiteSpace: "nowrap" }} className="header-title" strong>LAST CHARGING TREND</Typography.Text>

                        </div>

                        <div className="graph-container">
                            <ChargingTrend />
                        </div>
                    </div>
                    <div className="item5 bottom-cell right">
                        <div className="header">
                            <Typography.Text style={{ whiteSpace: "nowrap" }} className="header-title" strong>LAST DISCHARGING TREND</Typography.Text>

                        </div>                        <div className="graph-container">
                            <ChargingTrend />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MisMC