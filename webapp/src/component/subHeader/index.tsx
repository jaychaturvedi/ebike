import './index.scss';
import React, { PureComponent } from 'react';
import { Menu, Dropdown, message, DatePicker, Button, Input } from 'antd';
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';

interface SubHeaderProps { }

interface SubHeaderStates { }

class SubHeader extends PureComponent<SubHeaderProps, SubHeaderStates> {
    render() {
        return (
            <div className={"sub-header"}>
                <Button size={"middle"} type="text">
                    ALL
                </Button>
            </div>
        )
    }
}

export default SubHeader;