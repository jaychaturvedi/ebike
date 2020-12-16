import './index.scss';
import React, { PureComponent } from 'react';
import { Button, Typography } from 'antd';
import { ReduxAlertActions, ReduxAlertState, mapDispatchToProps, mapStateToProps } from "../../../connectm-client/actions/alerts"
import { connect } from 'react-redux'
import { TAlertType } from '../../../connectm-client/redux/models';
interface TabsProps extends ReduxAlertActions, ReduxAlertState {

}

interface TabsStates {
  activeTab: TAlertType
  smartCount: number,
  bmsCount: number,
  mcCount: number
}

class Tabs extends PureComponent<TabsProps, TabsStates> {
  constructor(props: TabsProps) {
    super(props)
    this.state = {
      activeTab: this.props.alerts.activeAlertTab,
      smartCount: 0,
      bmsCount: 0,
      mcCount: 0
    }
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsStates) {
    state.activeTab = props.alerts.activeAlertTab
    state.smartCount = props.alerts.smartCount
    state.bmsCount = props.alerts.bmsCount
    state.mcCount = props.alerts.mcCount
    return state;
  }

  tabClicked = (tab: TAlertType) => {
    this.props.alertTabChanged({
      type: "UPDATE_ACTIVE_ALERT",
      payload: {
        alertType: tab,
        pagination: {
          pageNumber: 1,
          pageSize: 10
        },
        sort: this.props.alerts.sort,
        filter: this.props.alerts.filter,
        locationFilter: this.props.alerts.locationFilter,
        timeFrameFilter: this.props.alerts.timeFrameFilter,
        vehicleFilter: this.props.alerts.vehicleFilter,
        searchFilter: this.props.alerts.searchFilter,
      }
    })
  }

  render() {
    return (
      <div className="connectm-Tabs">
        <Button
          size={"middle"}
          type="text"
          className={`tab-buttons smart ${this.state.activeTab === "smart"
            ? 'tab-active'
            : ''}`}
          onClick={() => this.tabClicked("smart")}
        >
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
              color: "white"
            }}>
            Smart Alerts <span style={{ paddingLeft: "5px" }}>({this.state.smartCount})</span>
          </Typography.Text>
        </Button>
        <Button
          size={"middle"}
          type="text"
          className={`tab-buttons bms ${this.state.activeTab === "bms"
            ? 'tab-active'
            : ''}`}
          onClick={() => this.tabClicked("bms")}>
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
              color: "white"
            }}>
            BMS Alerts <span style={{ paddingLeft: "5px" }}>({this.state.bmsCount})</span>
          </Typography.Text>
        </Button>
        <Button
          size={"middle"}
          type="text"
          className={`tab-buttons mc ${this.state.activeTab === "mc"
            ? 'tab-active' : ''}`}
          onClick={() => this.tabClicked("mc")}>
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
              color: "white"
            }}>
            Motor Controller Alerts <span style={{ paddingLeft: "5px" }}>({this.state.mcCount})</span>
          </Typography.Text>
        </Button>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);