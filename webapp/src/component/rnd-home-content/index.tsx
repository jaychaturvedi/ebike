import './index.scss';
import React, { PureComponent } from 'react';
import RandDData from "../rnd-data"
import RandDTrends from "../rnd-trends"
import { ReduxAlertActions, ReduxAlertState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/alerts"
import { connect } from 'react-redux';

interface RandDHomeContentProps extends ReduxAlertActions, ReduxAlertState { }

interface RandDHomeContentStates { }

class RandDHomeContent extends PureComponent<RandDHomeContentProps, RandDHomeContentStates> {

    render() {
        return (
            <div className="connectm-RandDHomeContent">
                <div className={"connectM-left"}>
                    <RandDData />
                </div>
                <div className={"connectM-right"}>
                    <RandDTrends trendsAlertType={this.props.alerts.activeAlertTab}/>
                </div>
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(RandDHomeContent);

// export default RandDHomeContent;