import { Layout } from "antd";
import React, { PureComponent } from 'react';
import Content from '../../component/content'
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LoginImage from "../../assets/login_image.png"
import { ReactComponent as ReactLogo } from "../../assets/motovolt_logo_for_splash_screen.svg"
import Cross from '../../assets/png/cross-vector.png'
import Exclamation from '../../assets/png/exclamation.png'
import MotovoltLogo from '../../assets/png/motovolt_text.png'
import { signIn, initiateForgotPassword, forgotPasswordSubmit } from "../../connectm-client/authentication"
import { withRouter, RouteComponentProps } from "react-router"
import { ReduxUserAction, ReduxUserState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/user"
import * as QueryString from "query-string"
import { connect } from 'react-redux'
import './index.scss'
interface ForgotPasswordProps extends RouteComponentProps, ReduxUserAction, ReduxUserState { }
interface ForgotPasswordStates {
    formValid: string,
    valid: boolean,
    message: any,
    firstPassword: string,
    secondPassword: string
}
class ForgotPassword extends PureComponent<ForgotPasswordProps, ForgotPasswordStates> {
    constructor(props: ForgotPasswordProps) {
        super(props)
        this.state = {
            formValid: '',
            valid: false,
            message: '',
            firstPassword: '',
            secondPassword: ''
        }
    }
    onFinish = (values: any) => {
        const params = QueryString.parse(this.props.location.search);
        if (this.state.secondPassword !== this.state.firstPassword) {
            this.setState({
                formValid: 'error',
                valid: !this.state.valid,
                message: <span> <img src={Cross} height="20px" /> &nbsp;Passwords do not match.</span>
            })
        } else {
            forgotPasswordSubmit(String(params.user_name), String(params.confirmation_code), this.state.secondPassword)
                .then((forgotPasswordObj) => {
                    if (forgotPasswordObj.success) {
                        this.props.usersAction({
                            type: "UPDATE_USER",
                            payload: {
                                authenticated: false,
                                user: null
                            }
                        })
                        this.setState({
                            formValid: 'success',
                            valid: !this.state.valid,
                            message: <span> <img src={Cross} height="20px" /> &nbsp;You can Login with your new password.</span>
                        })
                        this.props.history.push("/login")
                    }
                    else {
                        this.setState({
                            formValid: 'error',
                            valid: !this.state.valid,
                            message: <span> <img src={Cross} height="20px" /> &nbsp;Could not Reset Password.</span>
                        })
                    }
                })
        }
    };
    updateFirstPassword = (event: any) => {
        console.log(event.target.value)
        this.setState({
            firstPassword: event.target.value
        })
    }

    updateSecondPassword = (event: any) => {
        console.log(event.target.value)
        this.setState({
            secondPassword: event.target.value
        })
    }

    render() {
        return (
            <div className="connectm-login">
                <div className="container">
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
                                <ReactLogo width="80" height="60" />
                            </div>
                            {this.state.formValid === '' ? <div className="forgot-password-label">Enter a new password. The password should be atleast 8 characters long</div> : <div className="forgot-password-label" />}
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.onFinish}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input
                                        type="password"
                                        placeholder="New Password"
                                        value={this.state.firstPassword}
                                        onChange={this.updateFirstPassword} />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={this.state.secondPassword}
                                        onChange={this.updateSecondPassword}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        Continue
                                </Button>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                </div>
                <div className="footer">
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));