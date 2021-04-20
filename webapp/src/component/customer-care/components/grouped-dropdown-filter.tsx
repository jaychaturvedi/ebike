import React, { PureComponent } from "react";
import { Dropdown, Menu, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import DropDownFilter from "./dropdown-filter";

interface DropDownProps {
  dropDownOptions1: string[];
  dropDownOptions2: string[];
  onClick1: (e: any) => void;
  onClick2: (e: any) => void;
  defaultFilter1: string;
  defaultFilter2: string;
  style?: React.CSSProperties;
}

interface DropDownStates {}

class GroupedDropDownFilter extends PureComponent<
  DropDownProps,
  DropDownStates
> {
  render() {
    return (
      <div
        className='grouped-drop-down-filters'
        style={{
          display: "flex",
          ...this.props.style,
        }}
      >
        <DropDownFilter
          defaultFilter={this.props.defaultFilter1}
          dropDownOptions={this.props.dropDownOptions1}
          onClick={this.props.onClick1}
        />
        <div style={{ width: "2px" }} />
        <DropDownFilter
          defaultFilter={this.props.defaultFilter2}
          dropDownOptions={this.props.dropDownOptions2}
          onClick={this.props.onClick2}
        />
      </div>
    );
  }
}
export default GroupedDropDownFilter;

// export default DropDown;
