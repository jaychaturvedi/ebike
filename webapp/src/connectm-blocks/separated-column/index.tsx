import './index.scss';
import { Layout, Divider } from "antd";
import React, { PureComponent } from 'react';
import { LeftCircleTwoTone } from '@ant-design/icons';

interface SeparatedColumnProps {
    numberOfColumns: number;
    columnData: any[];
    cssClass: string
}

interface SeparatedColumnStates { }

class SeparatedColumn extends PureComponent<SeparatedColumnProps, SeparatedColumnStates> {

    render() {
        let cols = [];
        const colCount = this.props.numberOfColumns
        for (let i = 0; i < colCount; i++) {
            if (i != 0) cols.push(<Divider type="vertical"></Divider>)
            cols.push(this.props.columnData[i]);
        }
        return (
            <div className={this.props.cssClass}>{cols}</div>
        )
    }
}

export default SeparatedColumn;