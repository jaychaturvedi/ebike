import './index.scss';
import { Table } from 'antd';
import React, { PureComponent } from 'react';
import { DownOutlined } from '@ant-design/icons';

const columns: any = [
    {
        title: 'AlertName', dataIndex: 'alertName', sorter: {
            compare: (a: any, b: any) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        title: 'Model', dataIndex: 'model', sorter: {
            compare: (a: any, b: any) => a.model - b.model,
            multiple: 3,
        },
    },
    {
        title: 'VehicleId', dataIndex: 'vehicleId',
    },
    {
        title: 'Time', dataIndex: 'time', sorter: {
            compare: (a: any, b: any) => a.time - b.time,
            multiple: 1,
        },
    },
    {
        title: 'Open Since', dataIndex: 'openSince', sorter: {
            compare: (a: any, b: any) => a.openSince - b.openSince,
            multiple: 1,
        },
    },
    {
        title: 'Severity', dataIndex: 'severity',
    },
    {
        title: 'Location', dataIndex: 'location',
    },
];
type TData = {
    key: number,
    alertName: string,
    model: string,
    vehicleId: string,
    time: string,
    openSince: string,
    severity: string,
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
        severity: "major",
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
                columns={columns} dataSource={datas} onChange={this.onChange} pagination={{ pageSize: 10 }} loading={false}
            />
            // onRowDoubleClick={(record: any, index: any) => this.handleRowClick(record, index)}
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