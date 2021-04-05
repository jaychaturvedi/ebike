import React, { PureComponent } from 'react';
import { DatePicker, Dropdown, Menu, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./index.scss"
import moment from 'moment';
interface DropDownProps {
  dropDownOptions: string[];
  onClick: (e: any) => void;
  defaultFilter: string;
  submenu?: {
    title: string;
    options: string[]
  }[];
}

interface DropDownStates { }

class DropDownFilter extends PureComponent<DropDownProps, DropDownStates> {

  render() {
    const options = (
      <Menu
        onClick={this.props.onClick}
        style={{
          background: "white",
          color: "black",
        }}
      >
        {this.props.dropDownOptions?.map((item: any, index) => {
          return (
            <Menu.Item key={item}>
              <Typography.Text
                strong
                style={{ color: "#000000", marginLeft: "10%" }}
              >
                {item}
              </Typography.Text>
            </Menu.Item>
          );
        })}
        {this.props.submenu?.map((item: any, index) => {
          return (
            <Menu.SubMenu title='sub menu' style={{ marginLeft: "10%" }}>
              {item.options?.map((item: any) => {
                return (
                  <Menu.Item key={item}>
                    <Typography.Text
                      strong
                      style={{ color: "#000000", marginLeft: "10%" }}
                    >
                      {item}
                    </Typography.Text>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        })}
        {/* <Menu.Item
          key="4"
          disabled={true}
        >
          <Typography.Text style={{ whiteSpace: "nowrap" }}>
            Date Range
                    </Typography.Text>
          <div className={"datepicker-text-pair"}>
            From
                      <DatePicker
              defaultValue={moment()}
              format={["DD/MM/YYYYY"]}
              bordered={false} />
          </div>
          <div className={"datepicker-text-pair"}>
            To
                      <DatePicker
              defaultValue={moment()}
              format={["MM/DD/YYYY"]}
              bordered={false} />
          </div>
        </Menu.Item> */}
      </Menu>
    );
    return (
      <div className="drop-down-filters">
        <Dropdown overlay={options} trigger={['click']}>
          <div
            className={"filter-box"}
            onClick={e => e.preventDefault()}>
            {this.props.defaultFilter} <DownOutlined />
          </div>
        </Dropdown>
      </div>
    )
  }

}
export default DropDownFilter;

// export default DropDown;