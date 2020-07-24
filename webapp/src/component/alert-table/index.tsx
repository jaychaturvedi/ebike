import './index.scss';
import React, { PureComponent, useState } from 'react';
import { DownOutlined, DownCircleFilled } from '@ant-design/icons';
import { ReactComponent as ActiveSort } from "../../assets/active_sort_icon.svg"
import { ReactComponent as Severity } from "../../assets/severity_icon.svg"
import { Table, Select, Button } from 'antd';
const paginationDate = ['10', '20', '30'];
type TData = {
    id?: any,
    key?: number,
    alertName: string,
    model: string,
    vehicleId: string,
    time: string,
    openSince: string,
    severity: any,
    location: string
}

let datas: Array<TData> = []
for (var i = 1; i < 101; i++) {
    datas.push({
        id: i,
        alertName: "Capacity Deteroriation",
        model: "Calssic" + i,
        vehicleId: "BDS" + i,
        time: i + " May 2020 10:05AM",
        openSince: "24 hrs " + i + " 0 min",
        severity: <span style={{ textAlign: 'center', paddingLeft: '10px' }}><Severity height="15" width="15" /></span>,
        location: "Bangalore " + i
    })
}

interface AlertProps {
    column?: any, data?: any,

}

interface AlertStates {
    id?: any, column?: any, isDesc: boolean, data?: Array<TData>,
    pagination?: any; isAsc: boolean; classname: string; sortedInfo: any;
    sortDirections: string; alertClicked: boolean; modelClicked: boolean;
    timeClicked: boolean; loading: boolean; severityClicked: boolean, openSinceClicked: boolean
}

class AlertTable extends React.Component<AlertProps, AlertStates> {

    constructor(props: AlertProps) {
        super(props);
        this.state = {
            pagination: {},
            data: [],
            isAsc: true,
            isDesc: false,
            classname: '',
            sortedInfo: null,
            sortDirections: 'ascend',
            loading: false,
            alertClicked: false,
            modelClicked: false,
            timeClicked: false,
            openSinceClicked: false,
            severityClicked: false,
        }
        // this.handleClickTime=this.handleClickTime.bind(this);
    }

    renderClass = () => {
        const { isAsc, isDesc } = this.state
        if (isAsc) {
            this.setState({
                isAsc: !this.state.isAsc,
                isDesc: !this.state.isDesc,
                classname: 'alert-down-circle',
            });
        }
        if (isDesc) {
            this.setState({
                isAsc: !this.state.isAsc,
                isDesc: !this.state.isDesc,
                classname: 'alert-down-circle open',
            });
        }
    }


    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log('tableChange', pagination, filters, sorter);
        const pager: any = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        const params = {
            pageSize: pagination.pageSize,
            currentPage: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order
        };
        // for (let key in filters) {
        //   if (filters.hasOwnProperty(key)) {
        //     params[key] = filters[key];
        //   }
        // }
        this.fetch(params);
    }

    fetch = (params = {}) => {
        console.log('param', params);
        this.setState({ loading: true });

        setTimeout(() => {
            //demoData
            const result = datas;
            const page = 1; const pageSize = 50;
            let pagination = this.state.pagination;
            pagination.total = result?.length;
            this.setState({
                loading: false,
                data: result.slice((page - 1) * pageSize, pageSize * page),//insert here page no. and page size
                pagination,
            });
        }, 1500);
    }
    componentDidMount() {
        this.fetch()
    }
    handleClickAlert = (event: any) => {
        event?.stopPropagation()
        const { alertClicked } = this.state
        if (!alertClicked) this.setState({
            alertClicked: true, modelClicked: false, timeClicked: false,
            openSinceClicked: false, severityClicked: false
        })
        this.renderClass()
        console.log(this.state.classname);
    }

    handleClickModel = (event: any) => {
        event?.stopPropagation()
        const { modelClicked } = this.state
        if (!modelClicked) this.setState({
            alertClicked: false, modelClicked: true, timeClicked: false,
            openSinceClicked: false, severityClicked: false
        })
        this.renderClass()
        console.log(this.state.classname);
    }

    handleClickTime = (event: any) => {
        const { isAsc, isDesc, timeClicked } = this.state
        if (!timeClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: true,
            openSinceClicked: false, severityClicked: false
        })
        this.renderClass()
        console.log(this.state.classname);
    }

    handleClickOpenSince = (event: any) => {
        const { isAsc, isDesc, openSinceClicked } = this.state
        if (!openSinceClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: false,
            openSinceClicked: true, severityClicked: false
        })
        this.renderClass()
        console.log(this.state.classname);
    }

    handleClickSeverity = (event: any) => {
        const { isAsc, isDesc, severityClicked } = this.state
        if (!severityClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: false,
            openSinceClicked: false, severityClicked: true
        })
        this.renderClass()
        console.log(this.state.classname);
    }

    render() {
        // this.fetch()
        let { sortedInfo, isAsc, modelClicked, alertClicked, timeClicked, severityClicked, openSinceClicked } = this.state;
        sortedInfo = sortedInfo || {};

        const columns: any = [
            {
                dataIndex: 'alertName', defaultSortOrder: 'ascend',
                title: <span className="header-sorter" onClick={this.handleClickAlert}> Alert Name
                    {alertClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '4px' }} />}
                </span>,
                sorter: (a: any, b: any) => a.alertName.length - b.alertName.length,
            },
            {
                dataIndex: 'model', key: 'model', defaultSortOrder: 'ascend',
                title:
                    <span className="header-sorter" onClick={this.handleClickModel}> Model
                        {modelClicked ? <ActiveSort height='20px' width='20px'
                            className={this.state.classname} /> : <DownOutlined style={{ padding: '4px' }} />}
                    </span>,
                sorter: (a: any, b: any) => a.model.length - b.model.length
            },
            {
                dataIndex: 'vehicleId', key: 'vehicleId',
                // sortDirections: ['descend', 'ascend'], headerSort: false,                
                title: <span className="header-sorter" > Vehicle Id </span>

            },
            {
                dataIndex: 'time', key: 'time', defaultSortOrder: 'ascend',
                sorter: (a: any, b: any) => a.time.length - b.time.length,
                sortOrder: 'ascend',
                title: <span className="header-sorter" onClick={this.handleClickTime}> Time
                        {timeClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '4px' }} />}
                </span>,
            },
            {
                dataIndex: 'openSince', key: 'openSince',
                sorter: (a: any, b: any) => a.openSince.length - b.openSince.length,
                title: <span className="header-sorter" onClick={this.handleClickOpenSince}> Open Since
                        {openSinceClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '4px' }} />}
                </span>,
            },
            {
                dataIndex: 'severity', key: 'severity',
                title: <span className="header-sorter" onClick={this.handleClickSeverity} style={{ cursor: 'pointer' }} > Severity
                        {severityClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '4px' }} />}
                </span>,
            },
            {
                dataIndex: 'location', key: 'location', title: "Location",
                // title: () =>     <Header className={this.state.classname} name='Location' />
            },
        ];

        return <>
            <Table
                // scroll={{ x: 1500, y: 300 }}
                size={"small"}
                tableLayout="auto"
                bordered={false}
                className="ant-table-thead"
                onChange={this.handleTableChange}
                showSorterTooltip={false}
                rowKey={record => record.id}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                columns={columns}
                dataSource={datas}//{this.state.data}
                pagination={this.state.pagination}
                loading={false}
            />

            {/*// scroll={{ x: 'true' }}
            //     onHeaderRow={(column, index) => {
            //         return {
            //             onClick: () => {
            //                 console.log(column.indexOf);
            //             }, // click header row
            //         };
            //     }}
           
             <Select
                defaultValue={this.state.pagination}
                className='paginate-dropdown'
            >
                {paginationDate.map(page => (
                    <Option key={page} value={page} title={page}>{page}</Option>
                ))}
            </Select> */}
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