import './index.scss';
import React, { PureComponent } from 'react';
import BackArrowButton from '../../../../assets/png/back-arrow-button.png'

interface AnalyserTabsProps {
    toggleComponent: Function
}

interface AnalyserTabsStates {
    activeTab: string
}

class AnalyserTabs extends PureComponent<AnalyserTabsProps, AnalyserTabsStates> {
    constructor(props: AnalyserTabsProps) {
        super(props)
        this.state = {
            activeTab: 'battery'
        }
    }
    tabClicked = (params: string) => {
        console.log(params);
        this.setState({ activeTab: params })
        this.props.toggleComponent(params)
    }
    render() {
        return (
            <>
                <div className="connectmAnalyser-Tabs">
                    <div>
                        <img src={BackArrowButton} alt="back" className="back-button" onClick={() => this.tabClicked("battery")} />
                        ANALYSER
                        </div>
                </div>
            </>
        )
    }
}

export default AnalyserTabs