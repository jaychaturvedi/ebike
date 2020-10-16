import './index.scss';
import React from 'react';
import { Avatar, Card, Col, Row } from 'antd';
import { Meta } from 'antd/lib/list/Item';
interface Props { title: string; extra?: string, width: string }

export default class Cards extends React.PureComponent<Props, {}>{
    render() {
        return (
            <>
                <div className="site-card-wrapper">
                    <Row gutter={[12, 12]} justify="space-between">
                        <Col span={12}>
                            <Card style={{ width: '100%', height: '100px' }} loading={false}>
                                <Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card style={{ width: '100%', height: '100px' }} loading={false}>
                                <Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    // style={{ height: '45px' }}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        {/* <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col> */}
                    </Row>
                </div>
            </>
        )
    }
}



