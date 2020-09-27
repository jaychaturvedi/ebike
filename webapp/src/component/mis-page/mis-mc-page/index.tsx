import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import HalfPie from '../../../subComponents/halfPie';
import { LeftCircleFilled } from '@ant-design/icons';

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

                <div className="grid-container">
                    <div className="item1">1</div>
                    <div className="item2">2</div>
                    <div className="item3">3</div>
                    <div className="item4">4</div>
                    <div className="item5">5</div>
                </div>
            </>
        )
    }
}

export default MisMC