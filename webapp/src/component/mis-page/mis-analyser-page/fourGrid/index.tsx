import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';
import Header from "../topHeader"

interface Props { }

interface State { }

class Grid extends PureComponent<Props, State> {
    render() {
        return (
            <>
                <div className="main-wrapper">
                    <Header />
                    <div className='container-fluid four-analyser' >
                        <div className='grid-one'>

                        </div>

                        <div className='grid-two'>

                        </div>
                    </div>
                    <div className='container-fluid four-analyser' >

                        <div className='grid-three'>

                        </div>

                        <div className='grid-four'>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Grid