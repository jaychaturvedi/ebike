import './index.scss';
import React, { PureComponent } from 'react';
import { GraphSelector } from '../fourGrid';
import LineGraph from '../../../../subComponents/graph/dischargingTrend';

interface Props { }

interface State { }

class Grid extends PureComponent<Props, State> {
      render() {
            return (
                  <div className='container-fluid two-analyser' >
                        <div className='grid-one'>
                              <div className="grid-header" >
                                    <GraphSelector />
                              </div>
                              <div className="graph-container">
                                    <LineGraph />
                              </div>
                        </div>

                        <div className='grid-two'>
                              <div className="grid-header" >
                                    <GraphSelector />
                              </div>
                              <div className="graph-container">
                                    <LineGraph />
                              </div>
                        </div>
                  </div>
            )
      }
}

export default Grid