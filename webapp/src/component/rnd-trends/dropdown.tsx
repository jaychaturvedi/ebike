import './index.scss';
import React, { PureComponent } from 'react';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface TrendsDropdownProps {
  handlePeriodChange: any,//function
  trendsPeriod:string
}

interface TrendsDropdownStates { }

class TrendsDropdown extends PureComponent<TrendsDropdownProps, TrendsDropdownStates> {
  trendPeriod = (
    <Menu onClick={this.props.handlePeriodChange}>
      <Menu.Item key="Last 7 Days">
        Last 7 Days
        </Menu.Item>
      <Menu.Item key="Last 30 Days">
        Last 30 Days
        </Menu.Item>
    </Menu>
  );
  render() {
    return (
      <div className="trends-header">
        <Typography.Text strong className="trends-header-text">TRENDS</Typography.Text>
        <Dropdown
          overlay={this.trendPeriod}
          trigger={['click']}
        >
          <Typography.Text
            className={"pair trend-dropdown-active"}
            style={{ paddingLeft: "2px", whiteSpace: "nowrap", }}
          >
            {this.props.trendsPeriod}
            <DownOutlined
              className={"flip"}
              style={{ marginLeft: "30px", paddingRight: "2px" }}
            />
          </Typography.Text>
        </Dropdown>
      </div>
    )
  }
}

export default TrendsDropdown;