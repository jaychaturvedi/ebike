import React, { useState } from "react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./index.scss"

function Pagination() {
  const [pageSize, setPageSize] = useState(1);
  const [current, setcurrent] = useState(1);
  const [total, settotal] = useState(1);
  const totalRows = pageSize * current;
  const rowFrom = total ? pageSize * (current - 1) + 1 : 0;
  const rowTill = totalRows > total ? total : totalRows;

  const handleNav = (name: any, e: any) => {
    e.preventDefault();
    let newPageNumber: number = 1;
    let from = current * pageSize;
    let last = Math.floor(total / pageSize);
    if (name === "next" && from < total) {
      newPageNumber = current+1;
      // this.setState({
      //   current: newPageNumber,
      //   dataLoaded: false
      // })
    }
    if (name === "prev" && current !== 1) {
      newPageNumber = current-1;
      // this.setState({
      //   current: --current,
      //   dataLoaded: false
      // })
    }
    if (name === "first") {
      newPageNumber = 1;
      // this.setState({
      //   current: 1,
      //   dataLoaded: false
      // })
    }
    if (name === "last") {
      newPageNumber = total % pageSize > 0 ? last + 1 : last;
      // this.setState({ current: newPageNumber, dataLoaded: false })
    }
  };
  return (
    <div className={"pagination-footer"}>
      <span className={"nav-button"}>
        <pre className='pages-available'>
          {rowFrom} -&nbsp;{rowTill} &nbsp;of {total}
        </pre>
      </span>
      <div className={"spacer"}></div>
      <span
        onClick={(e) => {
          handleNav("first", e);
        }}
        className={"nav-button"}
      >
        <DoubleLeftOutlined
          className={`icon ${current !== 1 ? "active" : "inactive"}`}
        />
        {/* <FirstPage style={{}} className={`icon ${current !== 1 ? "active" : "inactive"}`} /> */}
      </span>
      <span
        onClick={(e) => {
          handleNav("prev", e);
        }}
        className={"nav-button"}
      >
        <LeftOutlined
          className={`icon ${current !== 1 ? "active" : "inactive"}`}
        />
      </span>
      <span
        onClick={(e) => {
          handleNav("next", e);
        }}
        className={"nav-button"}
      >
        <RightOutlined
          className={`icon ${
            current * pageSize >= total ? "inactive" : "active"
          }`}
        />
      </span>
      <span
        onClick={(e) => {
          handleNav("last", e);
        }}
        className={"nav-button"}
      >
        <DoubleRightOutlined
          className={`icon ${
            current * pageSize >= total ? "inactive" : "active"
          }`}
        />
      </span>
    </div>
  );
}

export default Pagination;
