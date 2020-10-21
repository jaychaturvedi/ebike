import './index.scss';
import React, { PureComponent } from 'react';
import Iframe from 'react-iframe'
import { connect } from 'react-redux'
import { ReduxQuickSightAction, ReduxQuickSightState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/quickSight"

interface QuickSightProps extends ReduxQuickSightAction, ReduxQuickSightState {
}

interface QuickSightState {
  quickSightUrl: string,
  dataLoaded:boolean
}


class QuickSight extends PureComponent<QuickSightProps, QuickSightState> {
  constructor(props: QuickSightProps) {
    super(props)
    this.state = {
      quickSightUrl: "",
      dataLoaded:false
    }
  }

  static getDerivedStateFromProps(props: QuickSightProps, state: QuickSightState) {
    if(!state.dataLoaded){

      props.QuickSightAction({
        type: "GET_QUICKSIGHT_EMBED_URL",
        payload: {
          dashboardId: "e3cf1a0d-04f4-442b-8276-a359cada2b32"
        }
      })
      state.quickSightUrl = props.quickSightUrl
      if(state?.quickSightUrl?.length){
        state.dataLoaded=true
      }
    }
    console.log("inside quicksight state", state);
    
    return state
  }

  render() {
    return (
      <div className='container-quicksight' >
        <Iframe url={this.state.quickSightUrl}
          width="100%"
          height="100%"
          id="myId"
          className="myClassname"
          position="relative" />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickSight);
