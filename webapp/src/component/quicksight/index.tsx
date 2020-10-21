import './index.scss';
import React, { PureComponent } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux'
import { ReduxDashboardAction, ReduxDashboardState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/dashboard"
import { TDashboardList } from "../../connectm-client/redux/models"
import { Card } from 'antd';
const { Meta } = Card;

interface DashboardProps extends ReduxDashboardAction, ReduxDashboardState {
}

interface DashboardState {
  dashboardList: TDashboardList[],
  dataLoaded: boolean
}

const dashboardTitle = ["Customer Trials - Status Overview", "Yantra MotoVolt Sensor Data"]
const cardDescription = "last synced 1hrs ago"

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
  render() {
    return (
      <div className='container-quicksight' >
        {this.state.dashboardList.map((dashboard: TDashboardList) => {
          return (<div className="dashboard-container">
            <Card
              className="dashboard-card"
              hoverable
              style={{ width: "auto" }}
              cover={<img alt={dashboard.dashboardName} src={dashboard.dashboardImageUrl} style={{height:200}} />}
            >
              <Meta title={dashboard.dashboardName} description={cardDescription} />
            </Card>
          </div>)
        })}
        {/* <Iframe url={this.state.quickSightUrl}
          width="100%"
          height="100%"
          id="myId"
          className="myClassname"
          position="relative" /> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
