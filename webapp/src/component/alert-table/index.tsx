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
import TimeRenderer from "./time-renderer"
import OpenSinceRenderer from "./openSinceRenderer"
import { ReduxAlertActions, ReduxAlertState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/alerts"
import { AlertData as AlertModel, TAlertType, TSort, TFilter } from "../../connectm-client/redux/models"
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
    sortingKey: any; alertType: TAlertType, dataLoaded: boolean, handleSort: (arr: any, sort: TSort) => any,
    filterField: TFilter
}

class AlertTable extends React.Component<AlertProps, AlertStates> {
    constructor(props: AlertProps) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            data: [],
            isAsc: false,
            sortingKey: 'alertTime',
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
            alertType: "smart",
            handleSort: this.handleSort,
            filterField: {
                fieldName: "all",
                value: ""
            }
        }
    }

    static getDerivedStateFromProps(props: AlertProps, state: AlertStates) {
        console.log(props.alerts.activeAlertTab, state.isAsc, state.isDesc)
        if ((state.alertType != props.alerts.activeAlertTab)
            || state.dataLoaded == false
            || (state.filterField.value != props.alerts.filter.value)) {
            props.getAlerts(
                {
                    type: "GET_ALERTS",
                    payload: {
                        alertType: props.alerts.activeAlertTab,
                        pagination: {
                            pageNumber: state.current,
                            pageSize: state.pageSize
                        },
                        sort: {
                            fieldName: state.sortingKey,
                            direction: state.isAsc ? "ascend" : "descend"
                        },
                        filter: props.alerts.filter
                    }
                }
            )
            state.dataLoaded = true
            state.alertType = props.alerts.activeAlertTab
            state.filterField = props.alerts.filter
        }
        state.total = props.alerts.activeAlertTab == 'smart'
            ? props.alerts.smartCount : props.alerts.activeAlertTab == 'bms'
                ? props.alerts.bmsCount : props.alerts.mcCount
        state.pageSize = props.alerts.pagination.pageSize
        state.current = props.alerts.pagination.pageNumber
        state.data = state.handleSort(Object.values(props.alerts[state.alertType]), props.alerts.sort) as AlertModel[]
        console.log("state", state)
        return state;
    }
    /**Sorting */
    handleSort = (arr: any, sort: TSort) => {
        if (!sort.fieldName) { return arr }
        let sortedData = arr.sort((a: any, b: any) => {
            if (typeof (a[sort.fieldName]) == "number") {
                return a[sort.fieldName] > b[sort.fieldName]
            }
            return a[sort.fieldName].localeCompare(b[sort.fieldName])
        });
        if (sort.direction == "descend") {
            return sortedData.reverse()
        }
        return sortedData
    };

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

    handleClickAlert = (event: any) => {
        event?.stopPropagation()
        const { alertClicked } = this.state
        if (!alertClicked) this.setState({
            alertClicked: true, modelClicked: false, timeClicked: false,
            openSinceClicked: false, severityClicked: false, dataLoaded: false
        })
        this.setState({ sortingKey: "alertName", dataLoaded: false })
        this.renderClass()
        console.log("isAsc, isDesc ", this.state.isAsc, this.state.isDesc)
        console.log(this.state.classname);
    }

    handleClickModel = (event: any) => {
        event?.stopPropagation()
        const { modelClicked } = this.state
        if (!modelClicked) this.setState({
            alertClicked: false, modelClicked: true, timeClicked: false,
            openSinceClicked: false, severityClicked: false, dataLoaded: false
        })
        this.renderClass()
        this.setState({ sortingKey: "model", dataLoaded: false })

        console.log(this.state.classname);
    }

    handleClickTime = (event: any) => {
        const { isAsc, isDesc, timeClicked } = this.state
        if (!timeClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: true,
            openSinceClicked: false, severityClicked: false, dataLoaded: false
        })
        this.renderClass()
        this.setState({ sortingKey: "alertTime", dataLoaded: false })
        console.log("isAsc, isDesc ", this.state.isAsc, this.state.isDesc)
        console.log(this.state.classname);
    }

    handleClickOpenSince = (event: any) => {
        const { isAsc, isDesc, openSinceClicked } = this.state
        if (!openSinceClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: false,
            openSinceClicked: true, severityClicked: false, dataLoaded: false
        })
        this.renderClass()
        this.setState({ sortingKey: "openSince", dataLoaded: false })

        console.log(this.state.classname);
    }

    handleClickSeverity = (event: any) => {
        const { isAsc, isDesc, severityClicked } = this.state
        if (!severityClicked) this.setState({
            alertClicked: false, modelClicked: false, timeClicked: false,
            openSinceClicked: false, severityClicked: true, dataLoaded: false
        })
        this.renderClass()
        this.setState({ sortingKey: "Severity", dataLoaded: false })

        console.log(this.state.classname);
    }
    handleColumnSort = (arr: any, key: string) => {
        if (!key) { return arr }
        return arr.sort((a: any, b: any) => {
            return a[key].localeCompare(b[key])
        });
    };
    /**Sorting */

    /**Pagination */
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
    /**Pagination */

    /**Navigation */
    onRowClick = (record: any) => {
        console.log(record)
        this.props.history.push("/" + this.state.alertType + "/" + record.alertId);
    }

    onRow = (record: any, rowIndex: any) => {
        return {
            onClick: () => { this.onRowClick(record) }
        }
    }
    /**Navigation */

    render() {
        console.log("isAsc, isDesc ", this.state.isAsc, this.state.isDesc)
        // this.fetch()
        let { isAsc, modelClicked, alertClicked, timeClicked, severityClicked, openSinceClicked } = this.state;
        const columns: any = [
            {
                dataIndex: 'alertName', defaultSortOrder: 'ascend', width: 200,
                title: <span className="header-sorter" onClick={this.handleClickAlert}> Alert Name
                    {alertClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '10px' }} />}
                </span>,
            },
            {
                dataIndex: 'model', key: 'model', defaultSortOrder: 'ascend', width: 80,
                title:
                    <span className="header-sorter" onClick={this.handleClickModel}> Model
                        {modelClicked ? <ActiveSort height='20px' width='20px'
                            className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '10px' }} />}
                    </span>,
            },
            {
                dataIndex: 'frameId', key: 'frameId', width: 100,
                // sortDirections: ['descend', 'ascend'], headerSort: false,                
                title: <span > Vehicle Id </span>

            },
            {
                dataIndex: 'alertTime', key: 'alertTime', defaultSortOrder: 'ascend',
                title: <span className="header-sorter" onClick={this.handleClickTime}> Time
                        {timeClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '10px' }} />}
                </span>,
                render: (text: any, record: any, index: any) => <TimeRenderer text={text} record={record} index={index} />,
            },
            {
                dataIndex: 'openSince', key: 'openSince', width: 150,
                title: <span className="header-sorter" onClick={this.handleClickOpenSince}> Open Since
                        {openSinceClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '10px' }} />}
                </span>,
                render: (text: any, record: any, index: any) => <OpenSinceRenderer text={text} record={record} index={index} />,
            },
            {
                dataIndex: 'Severity', key: 'Severity', width: 100,
                title: <span className="header-sorter" onClick={this.handleClickSeverity} style={{ cursor: 'pointer' }} > Severity
                        {severityClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '10px' }} />}
                </span>,
                render: (text: any, record: any, index: any) => <SeverityRenderer text={text} record={record} index={index} />,
            },
            {
                dataIndex: 'location', key: 'location', title: "Location",
            },
        ];


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
                        <Select className={'select-button'}
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
        </>;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlertTable));

var alertData = [
    {
        frameId: "BLR 327490",
        alertName: "Voltages Deviation",
        alertTime: "2020-08-08 11:11:00",
        model: "Classic",
        alertId: 101,
        mfgDate: "2020-08-08",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Bangalore",
        openSince: "00:41",
        Severity: "0"
    },
    {
        frameId: "BLR 327490",
        alertName: "Capacity Deterioration",
        alertTime: "2020-08-09 11:11:00",
        model: "Cargo",
        alertId: 102,
        mfgDate: "2020-08-09",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Kolkata",
        openSince: "00:41",
        Severity: "1"
    },
    {
        frameId: "BLR 327490",
        alertName: "Vehicle Idle/Inactive",
        alertTime: "2020-08-10 11:11:00",
        model: "Cargo",
        alertId: 103,
        mfgDate: "2020-08-10",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Delhi",
        openSince: "00:41",
        Severity: "2"
    },
    {
        frameId: "BLR 327490",
        alertName: "High Operating Temperature",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "0"
    },
    {
        frameId: "BLR 327490",
        alertName: "Unit Over Voltage",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "1"
    },
    {
        frameId: "BLR 327490",
        alertName: "High Charging Temperature",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "2"
    },
    {
        frameId: "BLR 327490",
        alertName: "Charge Over Current",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "1"
    },
    {
        frameId: "BLR 327490",
        alertName: "High SOC L1",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "0"
    },
    {
        frameId: "BLR 327490",
        alertName: "EXCESSIVE TEMPERATURE DIFFERENCE L1",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "1"
    },
    {
        frameId: "BLR 327490",
        alertName: "HALL SENSOR FAULT",
        alertTime: "2020-08-11 11:11:00",
        model: "Classic",
        alertId: 104,
        mfgDate: "2020-08-11",
        batteryId: "BAT123456",
        alertType: "smart",
        customerId: "CUS14567",
        location: "Hyderabad",
        openSince: "00:41",
        Severity: "2"
    },
]