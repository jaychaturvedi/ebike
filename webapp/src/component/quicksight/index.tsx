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
  openMap = () => {
    this.props.history.push("/map");
  }
  render() {
    return (
      <div className='container-quicksight' >
        <div className="dashboard-header">
          <div className="dashboard-text">
            {"DASHBOARDS"}
          </div>
        </div>
        <Divider style={{ background: "grey", margin: "10px 0" }} />
        <div className="dashboard-card-container">
          <div className="dashboard-container">
            <Card
             onClick={() => this.openMap()}
              className="dashboard-card"
              hoverable
              style={{ width: "auto" }}
              cover={
                <img
                  alt={"open map"}
                  src={"https://miro.medium.com/max/5334/1*qYUvh-EtES8dtgKiBRiLsA.png"} style={{ height: 150 }}
                />
              }
            >
              <Meta title={"MAP"} />
            </Card>
          </div>
          {this.state.dashboardList.map((dashboard: TDashboardList) => {
            return (<div className="dashboard-container">
              <Card
                onClick={() => this.onCardClick({ dashboardId: dashboard.dashboardId })}
                className="dashboard-card"
                hoverable
                style={{ width: "auto" }}
                cover={<img alt={dashboard.dashboardName}
                  src={dashboard.dashboardImageUrl} style={{ height: 150 }} />}
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
