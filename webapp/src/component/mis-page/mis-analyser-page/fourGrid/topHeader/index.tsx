import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';

interface Props { }

interface State {}

class Header extends PureComponent<Props, State> {
    render() {
        return (
            <>

                <div className='container-fluid analyser' >
                    <div className='grid-one'>

                    </div>

                    <div className='grid-two'>

                    </div>
                </div>
                <div className='container-fluid analyser' >

                    <div className='grid-three'>

                    </div>

                    <div className='grid-four'>

                    </div>
                </div>

            </>
        )
    }
}

export default Header