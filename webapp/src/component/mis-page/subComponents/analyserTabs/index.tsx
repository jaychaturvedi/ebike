import './index.scss';
import React, { PureComponent } from 'react';
import { Row, Col, Typography, Avatar, Card, Button } from 'antd';
import HalfPie from '../../../../subComponents/halfPie';
import { LeftCircleFilled } from '@ant-design/icons';
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
                    <div><LeftCircleFilled style={{ padding: '5px', fontSize: '14px' }} />ANALYSER</div>
                </div>
            </>
        )
    }
}

export default AnalyserTabs