import './index.scss';
import { Layout, Avatar } from 'antd'
import React, { PureComponent } from 'react';
import { ReactComponent as ChatMessage } from "../../assets/chat_message_icon.svg"
import { ReactComponent as Notification } from "../../assets/notification_icon.svg"
import { ReactComponent as Refresh } from "../../assets/refresh_icon.svg"
import { ReactComponent as Settings } from "../../assets/settings_icon.svg"
import Motovolt from '../../assets/MotovoltLogo.png'
interface WebHeaderProp { }

interface WebHeaderState {
    showPopup: boolean

}

class WebHeader extends PureComponent<WebHeaderProp, WebHeaderState> {
    constructor(props: WebHeaderProp) {
        super(props)
        this.state = {
            showPopup: false
        }
    }
    render() {
        return (
            <Layout.Header className="web-header">
                <div className={"header-logo"}> <img src={Motovolt} /></div>
                {/* <Refresh width="24" height="24" className={"header-icon"} />
                <Settings width="24" height="24" className={"header-icon"} />
                <ChatMessage width="24" height="24" className={"header-icon"} />
                <Notification width="24" height="24" className={"header-icon"} /> */}
                <div onClick={() => {
                    this.setState({ showPopup: !this.state.showPopup })

                }} className="header-avatar-menu">
                    <Avatar size="small" gap={4} className={"header-avatar"} >
                        {"KR"}
                    </Avatar>
                    {this.state.showPopup && <div className="sign-out"><span>{"Sign Out"}</span></div>}
                </div>
                {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="small" className={"header-icon"} /> */}
            </Layout.Header>
        )
    }
}

export default WebHeader;