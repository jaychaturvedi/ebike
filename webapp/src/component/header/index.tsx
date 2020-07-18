import './index.scss';
import { Layout, Typography, Avatar } from 'antd'
import React, { PureComponent } from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CachedIcon from '@material-ui/icons/Cached';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { WechatFilled } from '@ant-design/icons';
interface WebHeaderProp { }

interface WebHeaderState { }

class WebHeader extends PureComponent<WebHeaderProp, WebHeaderState> {

    render() {
        return (
            <Layout.Header className="web-header">
            </Layout.Header>
        )
    }

}

export default WebHeader;