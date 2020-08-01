import './index.scss';
import React, { PureComponent } from 'react';
import { Button, Typography } from 'antd';
import { ReduxAlertActions, ReduxAlertState, mapDispatchToProps, mapStateToProps } from "../../../connectm-client/actions/alerts"
import { connect } from 'react-redux'
import { TAlertType } from '../../../connectm-client/redux/connectm-state';
interface TabsProps extends ReduxAlertActions, ReduxAlertState { }

interface TabsStates {
    activeTab: TAlertType
}

class Tabs extends PureComponent<TabsProps, TabsStates> {
    constructor(props: TabsProps) {
        super(props)
        this.state = {
            activeTab: this.props.alerts.activeAlertTab
        }
    }

    static getDerivedStateFromProps(props: TabsProps, state: TabsStates) {
        state.activeTab = props.alerts.activeAlertTab
        return state;
    }

    tabClicked = (tab: TAlertType) => {
        console.log("tab clicked", tab)
        this.props.alertTabChanged({
            type: "UPDATE_ACTIVE_ALERT",
            payload: {
                alertType: tab,
                pagination: {
                    pageNumber: 1,
                    pageSize: 10
                },
                sort: this.props.alerts.sort,
                filter: this.props.alerts.filter
            }
        })
    }

    render() {
        return (
            <div className="connectm-Tabs">
                <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "smart" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("smart")}>
                    <Typography.Text strong style={{ whiteSpace: "nowrap" }}>Smart Alerts <span style={{ paddingLeft: "5px" }}>(100)</span></Typography.Text>
                </Button>
                <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "bms" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("bms")}>
                    <Typography.Text style={{ whiteSpace: "nowrap" }}>BMS Alerts <span style={{ paddingLeft: "5px" }}>(100)</span></Typography.Text>
                </Button>
                <Button size={"middle"} type="text" className={`tab-buttons ${this.state.activeTab === "mc" ? 'tab-active' : ''}`} onClick={() => this.tabClicked("mc")}>
                    <Typography.Text style={{ whiteSpace: "nowrap" }}>Motor Controller Alerts <span style={{ paddingLeft: "5px" }}>(4)</span></Typography.Text>
                </Button>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);