import './index.scss';
import { Layout, Table, Select, Typography, ConfigProvider, Empty } from "antd";
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
import { TSort, TPastAlertData, TAlertType } from '../../../connectm-client/redux/models';
import TimeRenderer from "./time-renderer"
import OpenSinceRenderer from "./openSinceRenderer"
import Location from "./location"
import { getAlertTypeId } from '../../../connectm-client/util/alert-graph';
const paginationDate = ['10', '25', '50'];
const { Option } = Select;

interface AlertPastTableProps extends ReduxAlertDetailActions, ReduxAlertDetailState {
    alertId: string,
    alertType: TAlertType,
    alertCleared: boolean,
    alertName: string,
    vehicleId: string,
}

interface AlertPastTableStates {
    id?: any, column?: any, isDesc: boolean, data: TPastAlertData[],
    current: number; isAsc: boolean; classname: string; pageSize: number;
    sortDirections: string; alertTimeClicked: boolean; total: number;
    sortingKey: any;
    selectedRowId: number;
    dataLoaded: boolean;
    graphDataLoaded: boolean
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
            graphDataLoaded: false,
            handleSort: this.handleSort,
        }
    }

    static getDerivedStateFromProps(props: AlertPastTableProps, state: AlertPastTableStates) {
        const alert = props.alerts[props.alertType][props.alertId]
        if (props.alertId && (state.dataLoaded === false) && alert !== undefined) {
            props.getPastAlerts({
                type: "GET_PAST_ALERTS",
                payload: {
                    alertId: Number(props.alertId),
                    alertName: alert.alertName,
                    alertType: props.alertType,
                    customerId: alert.customerId,
                    vehicleID: alert.frameId,
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
            state.dataLoaded = true;
        }
        state.data = state.handleSort(Object.values(props.pastAlerts.data), props.pastAlerts.sort) as TPastAlertData[]
        state.total = props.pastAlerts.dataCount
        // console.log("past alert table", state)
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
        if (name === "prev" && current !== 1) { this.setState({ current: --current, dataLoaded: false }) }
        if (name === "first") { this.setState({ current: 1, dataLoaded: false }) }
        if (name === "last") {
            (total % pageSize > 0) ? this.setState({ current: last + 1, dataLoaded: false }) : this.setState({ current: last, dataLoaded: false })
        }
    }

    handleSort = (arr: any, sort: TSort) => {
        // console.log("arr", arr, "sort", sort)
        if (!sort.fieldName) { return arr }
        let sortedData = arr.sort((a: any, b: any) => {
            return a['alertTime'].localeCompare(b['alertTime'])
        });
        if (sort.direction === "descend") {
            return sortedData.reverse()
        }
        return sortedData
    };

    /**Row Selection*/
    onRowClick = (record: any) => {
        let newDatas = this.state.data!.map(data => {
            if (record.alertId === data.alertId) {
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
        const selectedRow = this.state.selectedRowId === record.alertId ? -1 : record.alertId
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
                    data: newDatas,
                    dataCount: this.state.total
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
        let alertTypeId: number
        console.log("Got alert graph request")
        if (this.props.alertName !== undefined && this.state.selectedRowId === -1) {
            alertTypeId = getAlertTypeId(this.props.alertName!.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase())
            if (this.state.graphDataLoaded === false || alertTypeId !== this.state.selectedRowId) {
                this.props.getPastAlertGraph({
                    type: "GET_ALERT_GRAPH",
                    payload: {
                        alertId: this.state.graphDataLoaded ? this.state.selectedRowId : this.props.alertId as any as number,
                        vehicleId: this.props.vehicleId,
                        alertName: this.props.alertName,
                        alertTypeId: alertTypeId
                    }
                })
            }
            this.setState({ graphDataLoaded: !this.state.graphDataLoaded })
        }
    }

    onRow = (record: any, rowIndex: any) => {
        return {
            onClick: () => { this.onRowClick(record) }
        }
    }
    /**Row Selection*/

    setRowClassName = (record: TPastAlertData, index: any) => {
        if (record.alertGraph) {
            console.log("Selected rowID", Number(record.alertId), this.state.selectedRowId)
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
                    {alertClicked ? <ActiveSort height='26px' width='26px'
                        className={this.state.classname} /> : <DownOutlined style={{ padding: '5px', fontSize: '16px' }} className={this.state.classname} />}
                </span>,
                render: (text: any, record: any, index: any) => <TimeRenderer text={text} record={record} index={index} />
            },
            {
                dataIndex: 'tat', key: 'tat', defaultSortOrder: 'ascend',
                title: 'TAT',
                render: (text: any, record: any, index: any) => <OpenSinceRenderer text={text} record={record} index={index} />
            },

            {
                dataIndex: 'location', key: 'location', title: "Location",
                render: (text: any, record: any, index: any) => <Location text={text} record={record} index={index} />
            },
            {
                dataIndex: 'alertGraph', key: 'alertGraph',
                title: <span > Alert Graph </span>,
                render: (text: any, record: any, index: any) => <GraphSelector text={text} record={record} index={index} />
            },
        ];


        // const data = this.getData()

        return <>

            <div className={"connectm-AlertPastTable-header"}>
                <Typography.Text style={{ color: "#ffffff" }} strong className="past-alerts-text">PAST ALERTS</Typography.Text>
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
            <div className="connectm-AlertPastTable">
                <div className={'table-body'}>
                    <ConfigProvider renderEmpty={() => <Empty description="No Data"
                        image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ color: '#ffffff' }} />}>
                        <Table
                            tableLayout={"fixed"}
                            // scroll={{ y: datas.length > 10 ? 455 : 455, x: 'max-content' }}
                            // scroll={{ y: this.state.data.length > 3 ? '28.5vh' : undefined}}
                            scroll={{ y: '30vh' }} //not able to make dynamic
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

                    </ConfigProvider>
                </div>
            </div>
        </>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AlertPastTable);