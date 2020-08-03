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
    alertGraph: boolean
}

let datas: Array<TData> = []
for (var i = 1; i < 101; i++) {
    datas.push({
        id: i,
        alertName: i % 2 ? "Capacity Deterioration " : "Voltage Deviation",
        model: "Classic" + i,
        vehicleId: "BDS" + i,
        time: i + " May 2020 10:05AM",
        openSince: "24 hrs " + i + "0 min",
        severity: <span style={{ textAlign: 'center', paddingLeft: '10px' }}>
            <Severity height="15" width="15" className={`${i == 1 ? "" : i % 2 ? "severity-color-major" : "severity-color-minor"}`} /></span>,
        location: "Bangalore " + i,
        alertGraph: false
    })
}
interface AlertPastTableProps {
    column?: any, data?: any,
}

interface AlertPastTableStates {
    id?: any, column?: any, isDesc: boolean, data?: Array<TData>,
    current: number; isAsc: boolean; classname: string; pageSize: number;
    sortDirections: string; alertClicked: boolean; total: number;
    loading: boolean;
    sortingKey: any;
    selectedRowId:number;
}



class AlertPastTable extends PureComponent<AlertPastTableProps, AlertPastTableStates> {
    constructor(props: AlertPastTableProps) {
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
            selectedRowId : -1
        }
    }

    static getDerivedStateFromProps(props: AlertPastTableProps, state: AlertPastTableStates) {
        if (state.data?.length === 0) {
            state.data = datas
        }
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
        const { alertClicked } = this.state
        if (!alertClicked) this.setState({
            alertClicked: true
        })
        this.setState({ sortingKey: "alertName" })
        this.renderClass()
        console.log(this.state.classname);
    }
    handleSelect = (event: any) => {
        this.setState({ sortingKey: '' })
        const { pageSize, current } = this.state
        this.setState({ pageSize: Number(event), current: 1 })
        console.log(pageSize, current);
    }

    handleNav = (name: any, e: any) => {
        e.preventDefault()
        let { current, total, pageSize } = this.state
        const from = current * pageSize
        const last = Math.floor(total / pageSize)
        if (name === "next" && from < total) { this.setState({ current: ++current }) }
        if (name === "prev" && current != 1) { this.setState({ current: --current }) }
        if (name === "first") { this.setState({ current: 1 }) }
        if (name === "last") {
            (total % pageSize > 0) ? this.setState({ current: last + 1 }) : this.setState({ current: last })
        }
    }

    handleColumnSort = (arr: any, key: string) => {
        if (!key) { return arr }
        return arr.sort((a: any, b: any) => {
            return a[key].localeCompare(b[key])
        });
    };


    getData = () => {
        // Normally you should get the data from the server
        const { current, pageSize, sortingKey, isAsc, isDesc } = this.state
        const data = datas.slice((current - 1) * pageSize, pageSize * current);
        // this.setState({ total: datas.length })
        const sortedData = sortingKey ? this.handleColumnSort(data, sortingKey) : data
        return sortingKey ? isDesc ? sortedData.reverse() : sortedData : data;

    };

    /**Row Selection*/
    onRowClick = (record: any) => {
        console.log(record)
        let newDatas = this.state.data!.map(data => {
            if (record.id == data.id) {
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
        const selectedRow = this.state.selectedRowId == record.id ? -1 : record.id
        this.setState({
            data: newDatas,
            selectedRowId: selectedRow
        })
    }

    onRow = (record: any, rowIndex: any) => {
        return {
            onClick: () => { this.onRowClick(record) }
        }
    }
    /**Row Selection*/

    setRowClassName = (record: any, index: any) => {
        if (record.id === this.state.selectedRowId){
            return 'past-alert-selected-row'
        }
        return index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
    }

    render() {
        { console.log("datas", this.state.data) }
        let { isAsc, alertClicked } = this.state;
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
                title: 'TAT'
            },

            {
                dataIndex: 'location', key: 'location', title: "Location",
            },
            {
                dataIndex: 'alertGraph', key: 'alertGraph',               
                title: <span > Alert graph </span>,
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
                        rowKey={record => record.id}
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

export default AlertPastTable;
// <div className="connectm-AlertPastTable">
//             </div>