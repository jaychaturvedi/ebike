import './index.scss';
import React, { PureComponent } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux'
import { ReduxDashboardAction, ReduxDashboardState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/dashboard"
import { TDashboardList } from "../../connectm-client/redux/models"
import { withRouter, RouteComponentProps } from "react-router";
import { Card, Divider, Select, Tooltip } from 'antd';
import BackArrowButton from '../../assets/png/back-arrow-button.png'
import { ReactComponent as RefreshIcon } from "../../assets/Refresh.svg"
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg"
import { Link } from 'react-router-dom';
const { Option } = Select;
const { Meta } = Card;

interface DashboardProps extends RouteComponentProps, ReduxDashboardAction, ReduxDashboardState {
}

interface DashboardState {
  dashboardList: TDashboardList[],
  dataLoaded: boolean,
  refreshing: boolean
}

class Dashboard extends PureComponent<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props)
    this.state = {
      dashboardList: [],
      dataLoaded: false,
      refreshing: false
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
    return state
  }

  onCardClick = (record: any) => {
    const a =this.state.dashboardList.filter( e=>{
      return e.dashboardId === record.dashboardId
    })
    this.props.history.push("/" + "mis" + "/" + record.dashboardId+"?name="+a[0]?.dashboardName);
  }
  handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }
  openMap = () => {
    this.props.history.push("/map");
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
      dataLoaded: false,
      dashboardList: []
    })
    this.props.clearDashboardList({
      type: "CLEAR_DASHBOARD_LIST",
      payload: {}
    })
    setTimeout(() => {
      this.setState({
        refreshing: false
      })
    }, 1500)
  }

  render() {
    return (
      <div className='container-quicksight' >
        <div className="dashboard-header">
          <div className="dashboard-text">
            <Link to={"/mis"} className="link" >
              <img src={BackArrowButton} alt="back-arrow" className={"back-arrow-button"} />
            </Link>
            {"DASHBOARDS"}
          </div>
          <div className="refresh-button" onClick={this.onRefresh}>
            <RefreshIcon width="24" height="24" className={this.state.refreshing ? "refresh-start" : "refresh-end"} />
          </div>
        </div>
        {/* <Divider style={{ background: "grey", margin: "10px 0" }} /> */}
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
                  src={"https://zelp-motovolt-webapp-dashboard.s3.us-east-2.amazonaws.com/map-view.png"}
                  style={{ height: 150 }}
                />
              }
            >
              <Tooltip placement="bottom" color="#272b3c"
                title={<span>{"Map View"}</span>} trigger="hover">
                <Meta title={"Map View"} 
                  avatar={<RightArrow width="24" height="24"/>}/>
              </Tooltip>
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
                <Tooltip placement="bottom" color="#272b3c"
                  title={<span>{dashboard.dashboardName}</span>} 
                  trigger="hover">
                  <Meta title={<span>{dashboard.dashboardName}</span>} 
                  avatar={<RightArrow width="24" height="24"/>}/>
                </Tooltip>
              </Card>
            </div>)
          })}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
