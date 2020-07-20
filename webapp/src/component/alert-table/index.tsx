import './index.scss';
import { Table } from 'antd';
import React, { PureComponent } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as Severity } from "../../assets/severity_icon.svg"
import { ReactComponent as ActiveSort } from "../../assets/active_sort_icon.svg"

const columns: any = [
    {
        dataIndex: 'alertName', title: () =>
            <div className="ant-table-cell"> Alert Name <DownOutlined /></div>,
    },
    {
        dataIndex: 'model', title: () =>
            <div className="ant-table-cell">Model  <DownOutlined /></div>,
    },
    {
        dataIndex: 'vehicleId',
        title: () => <div className="ant-table-cell">Vehicle ID </div>,
    },
    {
        dataIndex: 'time', title: () => <div className="ant-table-cell"
            style={{ display: 'flex', justifyContent: 'center' }} >
            Time  <ActiveSort width="20" height="20" cursor='pointer' /></div>,
    },
    {
        dataIndex: 'openSince', title: () =>
            <div className="ant-table-cell">Open Since  <DownOutlined /></div>,
    },
    {
        dataIndex: 'severity', title: () =>
            <div className="ant-table-cell">Severity  <DownOutlined /></div>,
    },
    {
        dataIndex: 'location', title: () =>
            <div className="ant-table-cell">Location </div>,
    },
];
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
        severity: <Severity width="20" height="20" />,
        location: "Bangalore " + i
    })
}

interface AlertProps {
    column?: any, data?: any

}

interface AlertStates {
    column?: any, data?: Array<TData>
}

class AlertTable extends React.Component<AlertProps, AlertStates> {
    render() {
        return (
            <Table size={"small"}
                tableLayout="auto"
                bordered={false}
                className="ant-table-thead"
                showSorterTooltip={false}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                columns={columns} dataSource={datas} pagination={{ pageSize: 10 }} loading={false}
            />
        );
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