import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { ReactComponent as ReactLogo } from "../../assets/motovolt_logo_for_splash_screen.svg"
import MotovoltLogo from '../../assets/png/motovolt_text.png'
import Cross from '../../assets/png/cross-vector.png'
import Exclamation from '../../assets/png/exclamation.png'
import { signIn, initiateForgotPassword } from "../../connectm-client/authentication"
import { withRouter, RouteComponentProps } from "react-router"
import { connect } from 'react-redux'
import { ReduxUserAction, ReduxUserState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/user"
import './index.scss'
interface LoginProps extends RouteComponentProps, ReduxUserAction, ReduxUserState { }
interface LoginStates {
    formValid: string,
    valid: boolean,
    message: any,
    username: string
}

class Login extends PureComponent<LoginProps, LoginStates> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            formValid: '',
            valid: false,
            message: '',
            username: ''
        }
    }

    loginToCommandCenter = (value: any) => {

        signIn(value.username, value.password)
            .then(signedInObject => {
                console.log(signedInObject)
                if (signedInObject.success) {
                    this.props.usersAction({
                        type: "UPDATE_USER",
                        payload: {
                            authenticated: true,
                            user: signedInObject.user
                        }
                    })
                    // this.props.history.push("/")
                } else {
                    this.setState({
                        formValid: 'error', valid: !this.state.valid,
                        message: <span> <img src={Cross} height="20px" /> &nbsp;Unable to log in. Pleae check your password and try again</span>
                    })
                }
            })
    }

    forgotPassword = (event: any) => {
        event.preventDefault()
        if (this.state.username.length <= 0) {
            this.setState({
                formValid: 'error', valid: !this.state.valid,
                message: <span> <img src={Cross} height="20px" /> &nbsp;Please enter your email and try again.</span>
            })
        } else {
            initiateForgotPassword(this.state.username)
                .then((passwordInit) => {
                    if (passwordInit.success) {
                        this.setState({
                            formValid: 'success', valid: !this.state.valid,
                            message: <span> <img src={Exclamation} height="20px" /> &nbsp;We have sent you an email with the link to reset the password!</span>
                        })
                    } else {
                        this.setState({
                            formValid: 'error', valid: !this.state.valid,
                            message: <span> <img src={Cross} height="20px" /> &nbsp;Unable to send you an email with the link to reset the password!</span>
                        })
                    }
                    console.log(passwordInit)
                })
        }
    }

    updateUserName = (event: any) => {
        console.log(event.target.value)
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <div className="connectm-login">
                <div className="login-body">
                    <div className="login-image">
                        {/* <img src={LoginImage} alt="" /> */}
                        <div className="logo-title">
                            <div className="motovolt"><span><img src={MotovoltLogo} style={{ width: '80%' }} /></span></div>
                            <div className="command-center"><span>Command Center</span></div>
                        </div>
                    </div>
                    <div className="login-form">
                        <div className={`notification-toast ${this.state.formValid}`}>
                            {this.state.message}
                        </div>
                        <div className={"form-body"}>
                            <div className="logo">
                                <ReactLogo className="motovolt-logo-icon" />
                            </div>
                            <Form
                                name="normal_login"
                                className="ant-login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.loginToCommandCenter}>
                                <Form.Item
                                    name="username">
                                    <Input placeholder="Username" value={this.state.username} onChange={this.updateUserName} />
                                </Form.Item>
                                <Form.Item
                                    name="password">
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                </Button>
                                    <a className="login-form-forgot" href="" onClick={this.forgotPassword}>
                                        Forgot password?
                                </a>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                </div>
                <div className="login-footer">
                    <div>
                        Copyright © Motovolt 2020. All rights reserved.
                    </div>
                    <div>
                        Ver: 3.4.0
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));