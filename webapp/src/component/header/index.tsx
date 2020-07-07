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
                <div className={"header-left"}>
                    <div>Logo</div>
                    <Typography.Text strong={true}  >Command Center</Typography.Text>
                    <IconButton style={{ borderRadius: "3%", backgroundColor: "black", height: "32px", width: "32px", marginLeft: "10px" }} >
                        <HomeOutlinedIcon style={{ color: "white" }} />
                    </IconButton>
                </div>
                <div className={"header-right"}>
                    <CachedIcon  />
                    <SettingsIcon  />
                    <WechatFilled  />
                    <Badge color="secondary" variant="dot" invisible={false}>
                        <NotificationsIcon  />
                    </Badge>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  />
                </div>


            </Layout.Header>
        )
    }

}

export default WebHeader;