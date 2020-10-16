import './index.scss';
import { Layout, Avatar } from 'antd'
import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import Motovolt from '../../assets/MotovoltLogo.png'
import { connect } from 'react-redux'
import { signout } from "../../connectm-client/authentication"
import { ReduxUserAction, ReduxUserState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/user"
// import { ReactComponent as ChatMessage } from "../../assets/chat_message_icon.svg"
// import { ReactComponent as Notification } from "../../assets/notification_icon.svg"
// import { ReactComponent as Refresh } from "../../assets/refresh_icon.svg"
// import { ReactComponent as Settings } from "../../assets/settings_icon.svg"

interface WebHeaderProp extends RouteComponentProps, ReduxUserAction, ReduxUserState { }

interface WebHeaderState {
    showPopup: boolean
    userEmail: string
}

class WebHeader extends PureComponent<WebHeaderProp, WebHeaderState> {
    constructor(props: WebHeaderProp) {
        super(props)
        this.state = {
            showPopup: false,
            userEmail: 'U'
        }
    }

    static getDerivedStateFromProps(props: WebHeaderProp, state: WebHeaderState) {
        if (props.user.user) {
            state.userEmail = props.user.user.attributes.email
        }
        return state
    }

    logoutFromCommandCenter = () => {
        signout()
            .then(() => {
                this.props.usersAction({
                    type: "UPDATE_USER",
                    payload: {
                        authenticated: false,
                        user: null
                    }
                })
                this.props.history.push("/login")
            })
            .catch(() => {
                console.log("log out error")
            })
    }
    render() {
        return (
            <Layout.Header className="web-header">
                <div className={"header-logo"}> <img src={Motovolt} alt="motovolt-logo" /></div>
                {/* <Refresh width="24" height="24" className={"header-icon"} />
                <Settings width="24" height="24" className={"header-icon"} />
                <ChatMessage width="24" height="24" className={"header-icon"} />
                <Notification width="24" height="24" className={"header-icon"} /> */}
                <div onClick={() => {
                    this.setState({ showPopup: !this.state.showPopup })

                }} className="header-avatar-menu">
                    <Avatar size="small" gap={4} className={"header-avatar"} >
                        {this.state.userEmail.slice(0, 1).toUpperCase()}
                    </Avatar>
                    {this.state.showPopup && <div className="sign-out" onClick={this.logoutFromCommandCenter}><span>{"Sign Out"}</span></div>}
                </div>
                {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="small" className={"header-icon"} /> */}
            </Layout.Header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WebHeader));