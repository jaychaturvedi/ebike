import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';

interface Props { }

interface State { }

class Grid extends PureComponent<Props, State> {
      render() {
            return (
                  <>

                        <div className='container-fluid two-analyser' >
                              <div className='grid-one'>

                              </div>

                              <div className='grid-two'>

                              </div>
                        </div>

                  </>
            )
      }
}

export default Grid