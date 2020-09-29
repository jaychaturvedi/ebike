import { Layout } from "antd";
import React, { PureComponent } from 'react';
import Content from '../../component/content'
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LoginImage from "../../assets/login_image.png"
import { ReactComponent as ReactLogo } from "../../assets/motovolt_logo_for_splash_screen.svg"
import MotovoltLogo from '../../assets/png/motovolt_text.png'
import Cross from '../../assets/png/cross-vector.png'
import Exclamation from '../../assets/png/exclamation.png'
import './index.scss'
interface LoginProps { }

interface LoginStates {
    formValid: string,
    valid: boolean,
    message: any
}

class Login extends PureComponent<LoginProps, LoginStates> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            formValid: '',
            valid: false,
            message: ''
        }
    }
    onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    onToggle = (values: any) => {
        if (!this.state.valid) {
            this.setState({
                formValid: 'error', valid: !this.state.valid,
                message: <span> <img src={Cross} height="20px" /> &nbsp;Unable to log in. Pleae check your password and try again</span>
            })
        }
        else
            this.setState({
                formValid: 'success', valid: !this.state.valid,
                message: <span> <img src={Exclamation} height="20px" /> &nbsp;We have sent you an email with the link to reset the password!</span>
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
                            <Form
                                name="normal_login"
                                className="ant-login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.onFinish}>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input placeholder="Username" />
                                </Form.Item>
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
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.onToggle}>
                                        Log in
                                </Button>
                                    <a className="login-form-forgot" href="">
                                        Forgot password?
                                </a>
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

export default Login;