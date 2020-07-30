import './index.scss';
import React, { PureComponent, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveSort } from "../../assets/active_sort_icon.svg"
import { ReactComponent as NextPage } from "../../assets/next_page_icon.svg"
import { ReactComponent as PrevPage } from "../../assets/previous_page_icon.svg"
import { ReactComponent as LastPage } from "../../assets/last_page_icon.svg"
import { ReactComponent as FirstPage } from "../../assets/first_page_icon.svg"
import { Table, Select, Button, Pagination, Alert } from 'antd';
import { withRouter, RouteComponentProps } from "react-router";
import SeverityRenderer from "./severity-rendere"
import { ReduxAlertActions, ReduxAlertState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/alerts"
import { Alert as AlertModel } from "../../connectm-client/redux/connectm-state"
import { connect } from 'react-redux'

const paginationDate = ['10', '25', '50'];
const { Option } = Select;

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

// let datas: Array<TData> = []
// for (var i = 1; i < 101; i++) {
//     datas.push({
//         id: i,
//         alertName: i % 2 ? "Capacity Deteroriation " : "Voltage Deviation",
//         model: "Classic" + i,
//         vehicleId: "BDS" + i,
//         time: i + " May 2020 10:05AM",
//         openSince: "24 hrs " + i + "0 min",
//         severity: <span style={{ textAlign: 'center', paddingLeft: '10px' }}>
//             <Severity height="15" width="15" className={`${i == 1 ? "" : i % 2 ? "severity-color-major" : "severity-color-minor"}`} /></span>,
//         location: "Bangalore " + i
//     })
// }

interface AlertProps extends RouteComponentProps, ReduxAlertActions, ReduxAlertState {
    column?: any, data?: any,
}

interface AlertStates {
    id?: any, column?: any, isDesc: boolean, data: AlertModel[],
    current: number; isAsc: boolean; classname: string; pageSize: number;
    sortDirections: string; alertClicked: boolean; modelClicked: boolean; total: number;
    timeClicked: boolean; loading: boolean; severityClicked: boolean, openSinceClicked: boolean;
    sortingKey: any; alertType: { [key: string]: boolean }, dataLoaded: boolean
}


class AlertTable extends React.Component<AlertProps, AlertStates> {

    constructor(props: AlertProps) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 100,
            data: [],
            isAsc: false,
            sortingKey: '',
            isDesc: true,
            classname: 'alert-down-circle',
            sortDirections: 'ascend',
            loading: false,
            alertClicked: false,
            modelClicked: false,
            timeClicked: true,
            openSinceClicked: false,
            severityClicked: false,
            dataLoaded: false,
            alertType: {
                smart: true
            }
        }
    }

    static getDerivedStateFromProps(props: AlertProps, state: AlertStates) {
        console.log(props.alerts.activeAlertTab)
        if (state.alertType["smart"] && state.dataLoaded == false) {
            props.getAlerts(
                {
                    type: "GET_ALERTS",
                    payload: {
                        alertType: "smart",
                        pageNumber: state.current,
                        pageSize: state.pageSize
                    }
                }
            )
            state.dataLoaded = true
        }
        state.data = Object.values(props.alerts.smart)
        return state;
    }

    renderClass = () => {
        const { isAsc, isDesc } = this.state
        if (isAsc) {
            this.setState({
                isAsc: !this.state.isAsc,
                isDesc: !this.state.isDesc,
                classname: 'alert-down-circle open',
            });
        }
        if (isDesc) {
            this.setState({
                isAsc: !this.state.isAsc,
                isDesc: !this.state.isDesc,
                classname: 'alert-down-circle',
            });
        }
    }

    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log('tableChange', pagination, filters, sorter);
    }

    handleClickAlert = (event: any) => {
        event?.stopPropagation()
        const { alertClicked } = this.state
        if (!alertClicked) this.setState({
            alertClicked: true, modelClicked: false, timeClicked: false,
            openSinceClicked: false, severityClicked: false
        })
        this.setState({ sortingKey: "alertName" })
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
        this.setState({ sortingKey: "model" })

        console.log(this.state.classname);
    }

    handleClickTime = (event: any) => {
        const { isAsc, isDesc, timeClicked } = this.state
        if (!timeClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: true,
            openSinceClicked: false, severityClicked: false
        })
        this.renderClass()
        this.setState({ sortingKey: "time" })

        console.log(this.state.classname);
    }

    handleClickOpenSince = (event: any) => {
        const { isAsc, isDesc, openSinceClicked } = this.state
        if (!openSinceClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: false,
            openSinceClicked: true, severityClicked: false
        })
        this.renderClass()
        this.setState({ sortingKey: "openSince" })

        console.log(this.state.classname);
    }

    handleClickSeverity = (event: any) => {
        const { isAsc, isDesc, severityClicked } = this.state
        if (!severityClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: false,
            openSinceClicked: false, severityClicked: true
        })
        this.renderClass()
        // this.setState({ sortingKey: "severity" })

        console.log(this.state.classname);
    }

    handleSelect = (event: any) => {
        this.setState({ sortingKey: '' })
        const { pageSize, current } = this.state
        this.setState({ pageSize: Number(event), current: 1, dataLoaded: false })
        console.log(pageSize, current);
    }

    handleNav = (name: any, e: any) => {
        e.preventDefault()
        let { current, total, pageSize } = this.state
        const from = current * pageSize
        const last = Math.floor(total / pageSize)
        if (name === "next" && from < total) { this.setState({ current: ++current, dataLoaded: false }) }
        if (name === "prev" && current != 1) { this.setState({ current: --current, dataLoaded: false }) }
        if (name === "first") { this.setState({ current: 1, dataLoaded: false }) }
        if (name === "last") {
            (total % pageSize > 0) ? this.setState({ current: last + 1, dataLoaded: false }) : this.setState({ current: last, dataLoaded: false })
        }
    }

    handleColumnSort = (arr: any, key: string) => {
        if (!key) { return arr }
        return arr.sort((a: any, b: any) => {
            return a[key].localeCompare(b[key])
        });
    };

    onRowClick = (record: any) => {
        console.log(record)
        this.props.history.push("/" + record.id);
    }

    onRow = (record: any, rowIndex: any) => {
        return {
            onClick: () => { this.onRowClick(record) }
        }
    }

    getData = () => {
        // Normally you should get the data from the server
        const { current, pageSize, sortingKey, isAsc, isDesc } = this.state
        // const data = datas.slice((current - 1) * pageSize, pageSize * current);
        // this.setState({ total: datas.length })
        const sortedData = sortingKey ? this.handleColumnSort(this.state.data, sortingKey) : this.state.data
        return sortingKey ? isDesc ? sortedData.reverse() : sortedData : this.state.data;

    };

    render() {
        // this.fetch()
        let { isAsc, modelClicked, alertClicked, timeClicked, severityClicked, openSinceClicked } = this.state;
        const columns: any = [
            {
                dataIndex: 'alertName', defaultSortOrder: 'ascend',
                title: <span className="header-sorter" onClick={this.handleClickAlert}> Alert Name
                    {alertClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '4px', fontSize: '12px' }} />}
                </span>,
            },
            {
                dataIndex: 'model', key: 'model', defaultSortOrder: 'ascend',
                title:
                    <span className="header-sorter" onClick={this.handleClickModel}> Model
                        {modelClicked ? <ActiveSort height='20px' width='20px'
                            className={this.state.classname} /> : <DownOutlined style={{ padding: '4px', fontSize: '12px' }} />}
                    </span>,
            },
            {
                dataIndex: 'frameId', key: 'frameId', width: 100,
                // sortDirections: ['descend', 'ascend'], headerSort: false,                
                title: <span > Vehicle Id </span>

            },
            {
                dataIndex: 'alertTime', key: 'alertTime', defaultSortOrder: 'ascend',
                sortOrder: 'ascend',
                title: <span className="header-sorter" onClick={this.handleClickTime}> Time
                        {timeClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '12px' }} />}
                </span>,
            },
            {
                dataIndex: 'openSince', key: 'openSince', width: 150,
                title: <span className="header-sorter" onClick={this.handleClickOpenSince}> Open Since
                        {openSinceClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '12px' }} />}
                </span>,
            },
            {
                dataIndex: 'Severity', key: 'Severity', width: 100,
                title: <span className="header-sorter" onClick={this.handleClickSeverity} style={{ cursor: 'pointer' }} > Severity
                        {severityClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '12px' }} />}
                </span>,
                render: (text: any, record: any, index: any) => <SeverityRenderer text={text} record={record} index={index} />,
            },
            {
                dataIndex: 'location', key: 'location', title: "Location",
            },
        ];


        // const data = this.getData()

        return <>
            <div className="container" >
                <div className={'table-body'}>
                    <Table
                        tableLayout={"auto"}
                        // scroll={{ y: datas.length > 10 ? 455 : 455, x: 'max-content' }}
                        // size={"middle"}
                        scroll={{ y: this.state.pageSize > 10 ? '54vh' : undefined }}
                        bordered={false}
                        className="ant-table-thead"
                        onChange={this.handleTableChange}
                        showSorterTooltip={false}
                        rowKey={record => record.alertId}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={false}
                        loading={false}
                        onRow={this.onRow}
                    />
                </div>
                <div className={"pagination-footer"}>
                    Showing &nbsp;&nbsp;&nbsp; <span >
                        <Select className={'select-button'} style={{ height: 30 }}
                            defaultValue={this.state.pageSize} onChange={this.handleSelect}>
                            {paginationDate.map(page => (
                                <Option value={page} key={page}>{page}</Option>
                            ))}
                        </Select>
                    </span> &nbsp;&nbsp;&nbsp;rows&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className={'spacer'}></div>
                    <span className={'nav-button'}>
                        <pre> {this.state.pageSize * (this.state.current - 1) + 1} -&nbsp;
                        {this.state.pageSize * this.state.current > this.state.total
                                ? this.state.total : this.state.pageSize * this.state.current}
                          &nbsp;of {this.state.total}</pre>
                    </span>
                    <div className={'spacer'}></div>
                    <span onClick={(e) => { this.handleNav("first", e) }} className={'nav-button'} >
                        <FirstPage style={{ border: '1px solid #818181' }} className='icon' />
                    </span>
                    <span onClick={(e) => { this.handleNav("prev", e) }} className={'nav-button'}>
                        <PrevPage style={{ border: '1px solid #818181' }} className='icon' />
                    </span>
                    <span onClick={(e) => { this.handleNav("next", e) }} className={'nav-button'}>
                        <NextPage style={{ border: '1px solid #ffffff' }} className='icon' />
                    </span>
                    <span onClick={(e) => { this.handleNav("last", e) }} className={'nav-button'}>
                        <LastPage style={{ border: '1px solid #ffffff' }} className='icon' />
                    </span>
                </div>
            </div>


            {/* // scroll={{ x: 'true' }}
            //     onHeaderRow={(column, index) => {
            //         return {
            //             onClick: () => {
            //                 console.log(column.indexOf);
            //             }, // click header row
            //         };
            //     }}
            */}

            {/* todo align select menu */}
        </>;
    }

    onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }
    handleRowClick(vehicleId: string, alertName: string) {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlertTable));

//todo pagination and filter request

//   handleTableChange = (pagination, filters, sorter) => {
//     this.fetch({
//       sortField: sorter.field,
//       sortOrder: sorter.order,
//       pagination,
//       ...filters,
//     });
//   };