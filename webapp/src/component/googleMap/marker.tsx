import React from 'react';
import './marker.scss';
import { Popover, Button } from 'antd';

const content = (props: any) => (
  <div style={{fontSize:"13px"}} className="map-marker-tooltip">
    <p>Vehicle Id : <br/>{props.frameId}</p>
    <p>Last Active : <br/>{props.lastActive}</p>
  </div>
);


const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div>
      <Popover content={() => content(props)} trigger="click" className="map-tooltip">
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className="pulse" />
      </Popover>
    </div>
  );
};

export default Marker;