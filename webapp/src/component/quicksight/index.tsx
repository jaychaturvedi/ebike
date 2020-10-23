import './index.scss';
import React, { PureComponent } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux'
import { ReduxDashboardAction, ReduxDashboardState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/dashboard"
import { TDashboardList } from "../../connectm-client/redux/models"
import { withRouter, RouteComponentProps } from "react-router";
import { Card, Divider, Select } from 'antd';
const { Option } = Select;
const { Meta } = Card;

interface DashboardProps extends RouteComponentProps, ReduxDashboardAction, ReduxDashboardState {
}

interface DashboardState {
  dashboardList: TDashboardList[],
  dataLoaded: boolean
}

class Dashboard extends PureComponent<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props)
    this.state = {
      dashboardList: [],
      dataLoaded: false
    }
  }

  static getDerivedStateFromProps(props: DashboardProps, state: DashboardState) {
    if (!state.dataLoaded) {
      props.getDashboardList({
        type: "GET_DASHBOARD_LIST",
        payload: {}
      })
      state.dashboardList = props.dashboardList
      if (state?.dashboardList?.length) {
        state.dataLoaded = true
      }
    }
    console.log("inside dashboard state", state);
    return state
  }

  onCardClick = (record: any) => {
    console.log(record)
    this.props.history.push("/" + "mis" + "/" + record.dashboardId);
  }
  handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }
  render() {
    return (
      <div className='container-quicksight' >
        <div className="dashboard-header">
          <div  className="dashboard-text">
            {"DASHBOARDS"}
          </div>
          {/* <div className="dashboard-dropdown">
            <Select defaultValue="lucy" style={{ width: "auto" }} onChange={this.handleChange}>
              <Option value="jack">Last published (newest first)</Option>
              <Option value="lucy">Last published (oldest first)</Option>
              <Option value="disabled">Dashboard name (A-Z)</Option>
              <Option value="Yiminghe">Dashboard name (Z-A)</Option>
            </Select>
          </div> */}
        </div>
        <Divider style={{background:"grey", margin:"10px 0"}} />
        <div className="dashboard-card-container">
          {this.state.dashboardList.map((dashboard: TDashboardList) => {
            return (<div className="dashboard-container">
              <Card
                onClick={() => this.onCardClick({ dashboardId: dashboard.dashboardId })}
                className="dashboard-card"
                hoverable
                style={{ width: "auto" }}
                cover={<img alt={dashboard.dashboardName} src={dashboard.dashboardImageUrl} style={{ height: 150 }} />}
              >
                <Meta title={dashboard.dashboardName} />
              </Card>
            </div>)
          })}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
