import './index.scss';
import { Table, Select, Button } from 'antd';
import React, { PureComponent, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Header } from './header'
import { ReactComponent as ActiveSort } from "../../assets/active_sort_icon.svg"
const { Option } = Select;
const classname = 'fa-arrow-down'
const paginationDate = ['10', '20', '30'];
type TData = {
    id?: any,
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
    column?: any, data?: Array<TData>, pagination?: string; isAsc: boolean; classname: string; sortedInfo: any; sortDirections: string
}

class AlertTable extends React.Component<AlertProps, AlertStates> {

    constructor(props: AlertProps) {
        super(props);
        this.state = {
            pagination: '10',
            isAsc: false,
            classname: 'fa-arrow-down',
            sortedInfo: null,
            sortDirections: 'ascend',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleClick() {
        const { isAsc } = this.state
        if (isAsc) {
            this.setState({
                isAsc: !this.state.isAsc,
                classname: 'fa-arrow-down active open',
                sortDirections: 'descend',
                sortedInfo: {
                    order: this.state.sortDirections,
                    columnKey: 'time',
                },
            });
        }
        else {
            this.setState({
                isAsc: !this.state.isAsc,
                classname: 'fa-arrow-down active',
                sortDirections: '',
                sortedInfo: {
                    order: this.state.sortDirections,
                    columnKey: 'time',
                },
            });
        }
        console.log(this.state.isAsc);

    }


    handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    }


    render() {
        let { sortedInfo, isAsc } = this.state;
        sortedInfo = sortedInfo || {};
        const columns: any = [
            {
                dataIndex: 'alertName', defaultSortOrder: 'descend',
                title: () =>

                    <div className="ant-table-cell" onClick={this.handleClick} > Alert Name
                <button onClick={() => this.setState({ isAsc: true })}
                            onAnimationEnd={() => this.setState({ isAsc: false })}
                            className={isAsc ? 'rotate' : ''}>
                            <DownOutlined />
                        </button>
                    </div>
            },
            {
                dataIndex: 'model', key: 'model',
                title: () => <Header className={this.state.classname} name='Model' />
            },
            {
                dataIndex: 'vehicleId', key: 'vehicleId',
                sorter: (a: any, b: any) => a.vehicleId.length - b.vehicleId.length,
                sortDirections: ['descend', 'ascend'], headerSort: false,
                title: () => <Header className={this.state.classname} name='Vehicle Id'
                    clickFunction={this.handleClick} isClicked={this.state.isAsc} />
            },
            {
                dataIndex: 'time', key: 'time',
                sorter: (a: any, b: any) => a.time.length - b.time.length,
                sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
                title: () => <div>
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

        return <>
            <Table size={"small"}
                tableLayout="auto"
                bordered={false}
                className="ant-table-thead"
                onChange={this.handleChange}
                showSorterTooltip={false}
                rowKey={record => record.id}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                columns={columns} dataSource={datas} pagination={{ pageSize: 10 }} loading={false}
            />
            <Select
                defaultValue={this.state.pagination}
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