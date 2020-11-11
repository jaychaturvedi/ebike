import './index.scss';
import React, { PureComponent } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux'
import { ReduxQuickSightAction, ReduxQuickSightState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/quickSight"
import { Link, RouteComponentProps } from 'react-router-dom';
import { Divider } from 'antd';
import BackArrowButton from '../../assets/png/back-arrow-button.png'
import { ReactComponent as RefreshIcon } from "../../assets/Refresh.svg"
interface QuickSightProps extends RouteComponentProps, ReduxQuickSightAction, ReduxQuickSightState {
}

interface QuickSightState {
  quickSightUrl: string,
  dataLoaded: boolean,
  refreshing:boolean
}


class QuickSight extends PureComponent<QuickSightProps, QuickSightState> {
  constructor(props: QuickSightProps) {
    super(props)
    this.state = {
      quickSightUrl: "",
      dataLoaded: false,
      refreshing:false
    }
  }

  static getDerivedStateFromProps(props: QuickSightProps, state: QuickSightState) {
    console.log(props.location.search.split('=')[1],"props location");
    
    if (!state.dataLoaded) {
      const pathNames = props.location.pathname.split('/')
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
    return state
  }

  componentWillUnmount() {
    this.props.ClearQuickSightAction({
      type: "CLEAR_QUICKSIGHT_EMBED_URL"
    })
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
      dataLoaded: false,
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
          <div className="dashboard-text" style={{textTransform:"capitalize"}}>
            <Link to={"/mis"} className="link" >
              <img src={BackArrowButton} alt="back-arrow" className={"back-arrow-button"} />
            </Link>
            {this.props.location.search.split('=')[1]}
          </div>
          <div className="refresh-button" onClick={this.onRefresh}>
            <RefreshIcon width="24" height="24" className={this.state.refreshing ? "refresh-start" : "refresh-end"}/>
          </div>
        </div>
        {/* <Divider style={{ background: "grey", margin: "10px 0" }} /> */}
        <Iframe url={this.state.quickSightUrl}
          width="100%"
          height="90%"
          id="myId"
          className="myIframe"
          position="relative" />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickSight);
