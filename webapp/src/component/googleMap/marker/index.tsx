import React from 'react';
import './index.scss';
import { Popover, Button } from 'antd';
import {formatTime} from "../../../connectm-client/util/time-formater"

const content = (props: any) => (
  <div style={{fontSize:"13px"}} className={`map-marker-tooltip ${props.isActive ? "isActive" : "isInActive"}`}>
    <p>Vehicle Id : <br/>{props.frameId}</p>
    <p>Last Active : <br/>{formatTime(props.lastActive)}</p>
  </div>
);


const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div>
      <Popover content={() => content(props)} trigger="hover" className="map-tooltip">
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