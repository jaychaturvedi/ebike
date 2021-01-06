import React from 'react';
import './index.scss';
import { Popover, Button } from 'antd';
import {formatTime} from "../../../connectm-client/util/time-formater"

interface TMarkerProps{
  key:string,
  lat:number
  lng:string,
  frameId:string,
  isActive:boolean,
  timestamp:string,
  customerName:string,
  color:string
}

const content = (props: TMarkerProps) => (
  <div style={{fontSize:"13px"}} className={`map-marker-tooltip ${props.isActive ? "isActive" : "isInActive"}`}>
    <p>Vehicle Id : <br/>{props.frameId}</p>
    <p>Name : <br/>{props.customerName}</p>
    <p>{props.isActive ?"Last Synced":"Last Active"} : <br/>{formatTime(props.timestamp)}</p>
  </div>
);

const Marker = (props: TMarkerProps) => {
  const { color } = props;
  return (
    <div>
      <Popover content={() => content(props)} trigger="hover" className="map-tooltip">
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
        />
        <div className="pulse" />
      </Popover>
    </div>
  );
};

export default Marker;