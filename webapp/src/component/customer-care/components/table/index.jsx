import React, { useState } from "react";
import { Table } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { ReactComponent as ActiveSort } from "../../../../assets/svg/active-customer-table-sort.svg";
import ServiceTable from "./table-1"
import IssuesTable from "./table-2"
import RSATable from "./table-3"
// 20896 21 Jan 20121, 9: 31 am 2h 34 m MH1-12A-39 Battery Ashok Kumar In Progress
const data=[
  {
    key: "1",
    slno: 98,
    date: "21 Jan 20121 9: 31 am",
    openSince: " 2h 34 m",
    vehicleId: "MH1-12A-39",
    category: "John Brown",
    name: "John Brown",
    status: "open",
  },
  {
    key: "2",
    slno: 10,
    date: "21 Jan 20121 9: 31 am",
    openSince: " 2h 34 m",
    vehicleId: "MH1-12A-39",
    category: "John",
    name: "John Brown",
    status: "open",
  },
  {
    key: "3",
    slno: 1000,
    date: "21 Jan 20121 9: 31 am",
    openSince: " 2h 34 m",
    vehicleId: "MH1-12A-39",
    category: "John Brown",
    name: "John Brown",
    status: "open",
  },
  {
    key: "4",
    slno: 1369,
    date: "21 Jan 20121 9: 31 am",
    openSince: " 2h 34 m",
    vehicleId: "MH1-12A-39",
    category: "John Brown",
    name: "John Brown",
    status: "open",
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}
const customizeRenderEmpty=() => (
  <div
    style={{ textAlign: "center", fontSize: "18px" }}
    className={"my-ant-empty-normal"}
  >
    <p>No alerts available at the moment</p>
  </div>
);

export default function Tables({ module }) {

  const [ modelClicked, setModelClicked ]=useState(false);
  const columns=[
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Sl. No:
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "slno",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Date
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "date",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Open Since
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "openSince",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Vehicle ID
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "vehicleId",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Category
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "category",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Name
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "name",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Attachments
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "english",
    },
    {
      title: (
        <span
          className='header-sorter'
          onClick={() => {
            setModelClicked(!modelClicked)
          }}
        >
          Status
          {" "}
          {modelClicked? (
            <ActiveSort
              height='20px'
              width='20px'
              style={{
                marginLeft: "10px",
                paddingTop: "5px"
              }}
            />
          ):(
            <DownOutlined height='20px'
              width='20px' style={{
                marginLeft: "5px",
                padding: "5px", fontSize: "16px", color: "black"
              }} />
          )}
        </span>
      ),
      dataIndex: "name",
    },
  ];
  switch (module) {
    case "service":
      return <ServiceTable />;
    case "issues":
      return (
        <IssuesTable />
      );
    case "rsa":
      return (
        <RSATable />
      );
    default:
      return <div>No Module Selected</div>;
  }
}
