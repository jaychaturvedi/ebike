import './index.scss';
import React from 'react';
import { Card, Typography, Row } from 'antd';
interface Props { title: string; extra?: string, width: string }

export default class Cards extends React.PureComponent<Props, {}>{
    render() {
        let props = this.props;
        return (
            <>
                <div className="site-card-wrapper">
                    <Row gutter={[0, 48]} justify="space-between">
                        <Typography.Text style={{ whiteSpace: "nowrap" }}>{this.props.title} </Typography.Text>
                        <Typography.Text style={{ whiteSpace: "nowrap", float: "right" }} > {props.extra}</Typography.Text>
                        <Card style={{
                            width: props.width,
                            backgroundColor: 'green', height: '80px'
                        }} bordered={false} >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Row>
                </div>
            </>
        )
    }
}