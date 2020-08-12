import './index.scss';
import { Layout, Table, Select, Typography } from "antd";
import React, { PureComponent } from 'react';
import { ReactComponent as Severity } from "../../../assets/severity_icon.svg"
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveSort } from "../../../assets/active_sort_icon.svg"
import { ReactComponent as NextPage } from "../../../assets/next_page_icon.svg"
import { ReactComponent as PrevPage } from "../../../assets/previous_page_icon.svg"
import { ReactComponent as LastPage } from "../../../assets/last_page_icon.svg"
import { ReactComponent as FirstPage } from "../../../assets/first_page_icon.svg"
import GraphSelector from "./graph-selector"
import { connect, } from 'react-redux';
import {
    mapStateToProps, mapDispatchToProps, ReduxAlertDetailActions,
    ReduxAlertDetailState
} from '../../../connectm-client/actions/alert-detail';
import { TSort, TPastAlertData } from '../../../connectm-client/redux/connectm-state';

const paginationDate = ['10', '25', '50'];
const { Option } = Select;

interface AlertPastTableProps extends ReduxAlertDetailActions, ReduxAlertDetailState {
    alertId: string,
}
interface AlertPastTableStates {
    id?: any, column?: any, isDesc: boolean, data: TPastAlertData[],
    current: number; isAsc: boolean; classname: string; pageSize: number;
    sortDirections: string; alertTimeClicked: boolean; total: number;
    sortingKey: any;
    selectedRowId: number;
    dataLoaded: boolean;
    handleSort: (arr: any, sort: TSort) => any,
}

class AlertPastTable extends PureComponent<AlertPastTableProps, AlertPastTableStates> {
    constructor(props: AlertPastTableProps) {
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
            alertTimeClicked: false,
            selectedRowId: -1,
            dataLoaded: false,
            handleSort: this.handleSort,
        }
    }

    static getDerivedStateFromProps(props: AlertPastTableProps, state: AlertPastTableStates) {
        if (props.alertId && (state.dataLoaded == false)) {
            props.getPastAlerts({
                type: "GET_PAST_ALERTS",
                payload: {
                    alertId: Number(props.alertId),
                    alertName: props.alerts[props.alerts.activeAlertTab][props.alertId].alertName,
                    alertType: props.alerts.activeAlertTab,
                    customerId: props.alerts[props.alerts.activeAlertTab][props.alertId].customerId,
                    vehicleID: props.alerts[props.alerts.activeAlertTab][props.alertId].frameId,
                    pagination: {
                        pageNumber: state.current,
                        pageSize: state.pageSize
                    },
                    sort: {
                        fieldName: state.sortingKey,
                        direction: state.isAsc ? "ascend" : "descend"
                    },
                    comment: "",
                }
            })
            state.dataLoaded = true
        }
        state.data = state.handleSort(Object.values(props.pastAlerts.data), props.pastAlerts.sort) as TPastAlertData[]
        state.total = props.pastAlerts.dataCount
        console.log("past alert table", state)
        return state
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
    handleClickAlert = (event: any) => {
        event?.stopPropagation()
        const { alertTimeClicked: alertClicked } = this.state
        if (!alertClicked) this.setState({
            alertTimeClicked: true
        })
        this.setState({ sortingKey: "alertTime", dataLoaded: false })
        this.renderClass()
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

    handleSort = (arr: any, sort: TSort) => {
        console.log("arr", arr, "sort", sort)
        if (!sort.fieldName) { return arr }
        return arr.sort((a: any, b: any) => {
            return a[sort.fieldName].localeCompare(b[sort.fieldName])
        });
    };

    /**Row Selection*/
    onRowClick = (record: any) => {
        let newDatas = this.state.data!.map(data => {
            if (record.alertId == data.alertId) {
                return {
                    ...data,
                    alertGraph: !data.alertGraph
                }
            }
            return {
                ...data,
                alertGraph: false
            }
        })
        const selectedRow = this.state.selectedRowId == record.alertId ? -1 : record.alertId
        this.setState({
            data: newDatas,
            selectedRowId: selectedRow
        })
        this.props.updatePastAlerts({
            type: "UPDATE_PAST_ALERTS",
            payload: {
                //selected rowId
                alertId: selectedRow,
                pastAlerts: {
                    data : newDatas,
                    dataCount : this.state.total
                },
                pagination: {
                    pageNumber: this.state.current,
                    pageSize: this.state.pageSize
                },
                sort: {
                    direction: this.state.isAsc ? "ascend" : "descend",
                    fieldName: this.state.sortingKey
                }
            }
        })
    }

    onRow = (record: any, rowIndex: any) => {
        return {
            onClick: () => { this.onRowClick(record) }
        }
    }
    /**Row Selection*/

    setRowClassName = (record: any, index: any) => {
        if (record.id === this.state.selectedRowId) {
            return 'past-alert-selected-row'
        }
        return index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
    }

    render() {
        let { isAsc, alertTimeClicked: alertClicked } = this.state;
        const columns: any = [
            {
                dataIndex: 'alertTime', defaultSortOrder: 'ascend',
                title: <span className="header-sorter" onClick={this.handleClickAlert}> Alert Time
                    {alertClicked ? <ActiveSort height='20px' width='20px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '10px' }} className={this.state.classname} />}
                </span>,
            },
            {
                dataIndex: 'tat', key: 'tat', defaultSortOrder: 'ascend',
                title: 'TAT'
            },

            {
                dataIndex: 'location', key: 'location', title: "Location",
            },
            {
                dataIndex: 'alertGraph', key: 'alertGraph',
                title: <span > Alert Graph </span>,
                render: (text: any, record: any, index: any) => <GraphSelector text={text} record={record} index={index} />
            },
        ];


        // const data = this.getData()

        return <>
            <div className="connectm-AlertPastTable">
                <div className={"connectm-AlertPastTable-header"}>
                    <Typography.Text style={{ color: "#ffffff" }} strong>PAST ALERTS</Typography.Text>
                    <div className={"pagination-footer"}>
                        Showing &nbsp;&nbsp;&nbsp; <span >
                            <Select className={'select-button'}
                                showArrow={true}
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

                <div className={'table-body'}>
                    <Table
                        tableLayout={"auto"}
                        // scroll={{ y: datas.length > 10 ? 455 : 455, x: 'max-content' }}
                        scroll={{ y: '28.5vh' }} //not able to make dynamic
                        // size={"middle"}
                        bordered={false}
                        className="ant-table-thead"
                        showSorterTooltip={false}
                        rowKey={record => record.alertId}
                        rowClassName={this.setRowClassName}
                        columns={columns}
                        dataSource={this.state.data}//{this.state.data}
                        pagination={false}
                        loading={false}
                        onRow={this.onRow}
                    />
                </div>
            </div>
        </>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertPastTable);