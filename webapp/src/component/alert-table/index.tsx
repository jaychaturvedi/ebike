import './index.scss';
import { Table, Select } from 'antd';
import React, { PureComponent, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Header } from './header'
import { ReactComponent as ActiveSort } from "../../assets/active_sort_icon.svg"
const { Option } = Select;
const classname = 'fa-arrow-down'
const paginationDate = ['10', '20', '30'];
type TData = {
    key: number,
    alertName: string,
    model: string,
    vehicleId: string,
    time: string,
    openSince: string,
    severity: any,
    location: string
}

let datas: Array<TData> = []
for (var i = 1; i < 30; i++) {
    datas.push({
        key: i,
        alertName: "Capacity Deteroriation",
        model: "Calssic",
        vehicleId: "BDS" + i,
        time: i + " May 2020 10:05AM",
        openSince: "24hrs" + i + "0min",
        severity: <svg height="25" width="25">
            <circle cx="10" cy="15" r="10" fill='#F88828' />
        </svg>,
        location: "Bangalore " + i
    })
}

interface AlertProps {
    column?: any, data?: any,

}

interface AlertStates {
    column?: any, data?: Array<TData>, pagination?: string; isClicked: boolean; classname: string;
}

class AlertTable extends React.Component<AlertProps, AlertStates> {

    constructor(props: AlertProps) {
        super(props);
        this.state = {
            pagination: '10',
            isClicked: false,
            classname: 'fa-arrow-down'
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleClick() {
        this.setState({
            isClicked: !this.state.isClicked,
        });
        this.setState({
            classname: this.state.isClicked ? 'fa-arrow-down open' : 'fa-arrow-down'
        });
    }
    columns: any = [
        {
            dataIndex: 'alertName', title: () => <Header className={this.state.classname} name='Alert Name' clickFunction={this.handleClick} isClicked={this.state.isClicked} />
        },
        {
            dataIndex: 'model', title: () => <Header className={this.state.classname} name='Model' />
        },
        {
            dataIndex: 'vehicleId',
            title: () => <Header className={this.state.classname} name='Vehicle Id' />
        },
        {
            dataIndex: 'time', title: () => <div>
                <Header className={this.state.classname} name='Time' />
                {/* <ActiveSort width="20" height="20" cursor='pointer' /> */}
            </div>
        },
        {
            dataIndex: 'openSince', title: () =>
                <Header className={this.state.classname} name='Open Since' />
        },
        {
            dataIndex: 'severity', title: () =>
                <Header className={this.state.classname} name='Severity' />
        },
        {
            dataIndex: 'location', title: () =>
                <Header className={this.state.classname} name='Location' />
        },
    ];

    handleChange() {
        console.log(this.state.pagination)
        this.setState({
            pagination: "20"
        });
    }

    render() {
        return <>
            <Table size={"small"}
                tableLayout="auto"
                bordered={false}
                className="ant-table-thead"
                showSorterTooltip={false}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                columns={this.columns} dataSource={datas} pagination={{ pageSize: 10 }} loading={false}
            />
            <Select
                style={{ marginLeft: "10px", paddingRight: "2px", width: 80 }}
                defaultValue={this.state.pagination}
                onChange={this.handleChange}
                className='paginate-dropdown'
            >
                {paginationDate.map(page => (
                    <Option key={page} value={page} title={page}>{page}</Option>
                ))}
            </Select>
            {/* todo align select menu */}
        </>;
    }

    onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }
    handleRowClick(vehicleId: string, alertName: string) {
    }
}

export default AlertTable;

//todo pagination and filter request

//   handleTableChange = (pagination, filters, sorter) => {
//     this.fetch({
//       sortField: sorter.field,
//       sortOrder: sorter.order,
//       pagination,
//       ...filters,
//     });
//   };