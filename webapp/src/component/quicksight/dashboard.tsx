import './index.scss';
import React, { PureComponent } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux'
import { ReduxQuickSightAction, ReduxQuickSightState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/quickSight"
import { Link, RouteComponentProps } from 'react-router-dom';
import { Divider } from 'antd';
import BackArrowButton from '../../assets/png/back-arrow-button.png'

interface QuickSightProps extends RouteComponentProps, ReduxQuickSightAction, ReduxQuickSightState {
}

interface QuickSightState {
  quickSightUrl: string,
  dataLoaded: boolean
}


class QuickSight extends PureComponent<QuickSightProps, QuickSightState> {
  constructor(props: QuickSightProps) {
    super(props)
    this.state = {
      quickSightUrl: "",
      dataLoaded: false
    }
  }

  static getDerivedStateFromProps(props: QuickSightProps, state: QuickSightState) {
    console.log("before dashboard state", state);
    if (!state.dataLoaded) {
      const pathNames = props.location.pathname.split('/')
      console.log(pathNames);
      props.QuickSightAction({
        type: "GET_QUICKSIGHT_EMBED_URL",
        payload: {
          dashboardId: pathNames[2]
        }
      })
      state.quickSightUrl = props.quickSightUrl
      state.dataLoaded = true
    }
    state.quickSightUrl = props.quickSightUrl
    console.log("inside dashboar state after", state);
    return state
  }

  componentWillUnmount() {
    this.props.ClearQuickSightAction({
      type: "CLEAR_QUICKSIGHT_EMBED_URL"
    })
  }

  onRefresh = () => {
    this.setState({
      dataLoaded: false,
    })
    this.forceUpdate()
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
            {"REFRESH"}
          </div>
        </div>
        <Divider style={{ background: "grey", margin: "10px 0" }} />
        <Iframe url={this.state.quickSightUrl}
          width="100%"
          height="90%"
          id="myId"
          className="myClassname"
          position="relative" />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickSight);
