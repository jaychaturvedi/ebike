import { Table } from "antd";
import React from "react";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '3',
        name: 'Joker',
        age: 100,
        address: 'Gotham Arkham',
    },
    {
        key: '4',
        name: 'Batman',
        age: 42,
        address: 'Cave',
    },
    {
        key: '5',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

class Tables extends React.Component {
    render() {
        return (

            <Table dataSource={dataSource} columns={columns} scroll={{ y: '100px' }} />
        )
    }
}

export default Tables