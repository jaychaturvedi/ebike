import React from 'react';
import './marker.scss';
import { Popover, Button } from 'antd';

const content = (props: any) => (
  <div style={{fontSize:"13px"}}>
    <p>FrameId = {props.frameId}</p>
    <p>CustomerId = {props.name}</p>
  </div>
);

const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div>
      <Popover content={() => content(props)} trigger="click">
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