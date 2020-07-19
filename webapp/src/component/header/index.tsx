import './index.scss';
import { Layout, Typography, Avatar } from 'antd'
import React, { PureComponent } from 'react';
import { ReactComponent as ChatMessage } from "../../assets/chat_message_icon.svg"
import { ReactComponent as Notification } from "../../assets/notification_icon.svg"
import { ReactComponent as Refresh } from "../../assets/refresh_icon.svg"
import { ReactComponent as Settings } from "../../assets/settings_icon.svg"

interface WebHeaderProp { }

interface WebHeaderState { }

class WebHeader extends PureComponent<WebHeaderProp, WebHeaderState> {

    render() {
        return (
            <Layout.Header className="web-header">
                <Refresh width="24" height="24" className={"header-icon"}/>
                <Settings width="24" height="24" className={"header-icon"}/>
                <ChatMessage width="24" height="24" className={"header-icon"}/>
                <Notification width="24" height="24" className={"header-icon"}/>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="small" className={"header-icon"}/>
            </Layout.Header>
        )
    }

}

export default WebHeader;