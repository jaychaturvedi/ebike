import './index.scss';
import React from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined, DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ReactComponent as ActiveSort } from "../../assets/active_sort_icon.svg"
import GifLoader from '../../assets/gif/ImpoliteLivelyGenet-small.gif'
import { Table, Select, ConfigProvider, Empty } from 'antd';
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

interface AlertProps extends RouteComponentProps, ReduxAlertActions, ReduxAlertState {
  column?: any;
  data?: any;
}

interface AlertStates {
  id?: any;
  column?: any;
  isDesc: boolean;
  data: AlertModel[];
  current: number;
  isAsc: boolean;
  classname: string;
  pageSize: number;
  sortDirections: string;
  alertClicked: boolean;
  modelClicked: boolean;
  total: number;
  timeClicked: boolean;
  loading: boolean;
  severityClicked: boolean;
  openSinceClicked: boolean;
  sortingKey: any;
  alertType: TAlertType;
  dataLoaded: boolean;
  handleSort: (arr: any, sort: TSort) => any;
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
    if ((state.alertType !== props.alerts.activeAlertTab)
      || state.dataLoaded === false
      || (state.filterField.value !== props.alerts.filter.value)) {
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
    state.total = props.alerts.activeAlertTab === 'smart'
      ? props.alerts.smartCount : props.alerts.activeAlertTab === 'bms'
        ? props.alerts.bmsCount : props.alerts.mcCount
    state.pageSize = props.alerts.pagination.pageSize
    state.current = props.alerts.pagination.pageNumber
    state.data = state.handleSort(Object.values(props.alerts[state.alertType]), props.alerts.sort) as AlertModel[]
    return state;
  }
  /**Sorting */
  handleSort = (arr: any, sort: TSort) => {
    if (!sort.fieldName) { return arr }
    let sortedData = arr.sort((a: any, b: any) => {
      return a[sort.fieldName].localeCompare(b[sort.fieldName])
    });
    if (sort.direction === "descend") {
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
    if (!alertClicked) {
      this.setState({
        alertClicked: true,
        modelClicked: false,
        timeClicked: false,
        openSinceClicked: false,
        severityClicked: false,
        dataLoaded: false
      })
    }
    this.setState({ sortingKey: "alertName", dataLoaded: false })
    this.renderClass()
  }

  handleClickModel = (event: any) => {
    event?.stopPropagation()
    const { modelClicked } = this.state
    if (!modelClicked) {
      this.setState({
        alertClicked: false,
        modelClicked: true,
        timeClicked: false,
        openSinceClicked: false,
        severityClicked: false,
        dataLoaded: false
      })
    }
    this.renderClass()
    this.setState({ sortingKey: "model", dataLoaded: false })
  }

  handleClickTime = (event: any) => {
    const { timeClicked } = this.state
    if (!timeClicked) {
      this.setState({
        alertClicked: false,
        modelClicked: false,
        timeClicked: true,
        openSinceClicked: false,
        severityClicked: false,
        dataLoaded: false
      })
    }
    this.renderClass()
    this.setState({ sortingKey: "alertTime", dataLoaded: false })
  }

  handleClickOpenSince = (event: any) => {
    const { openSinceClicked } = this.state
    if (!openSinceClicked) {
      this.setState({
        alertClicked: false,
        modelClicked: false,
        timeClicked: false,
        openSinceClicked: true,
        severityClicked: false,
        dataLoaded: false
      })
    }
    this.renderClass()
    this.setState({ sortingKey: "openSince", dataLoaded: false })
  }

  handleClickSeverity = (event: any) => {
    const { severityClicked } = this.state
    if (!severityClicked) {
      this.setState({
        alertClicked: false,
        modelClicked: false,
        timeClicked: false,
        openSinceClicked: false,
        severityClicked: true,
        dataLoaded: false
      })
    }
    this.renderClass()
    this.setState({ sortingKey: "Severity", dataLoaded: false })
  }
  // handleColumnSort = (arr: any, key: string) => {
  //     if (!key) { return arr }
  //     return arr.sort((a: any, b: any) => {
  //         return a[key].localeCompare(b[key])
  //     });
  // };
  /**Sorting */

  /**Pagination */
  handleSelect = (event: any) => {
    this.setState({ sortingKey: '' })
    const { pageSize, current } = this.state
    this.setState({ 
      pageSize: Number(event), 
      current: 1, 
      dataLoaded: false 
    })
  }

  handleNav = (name: any, e: any) => {
    e.preventDefault()
    let { current, total, pageSize } = this.state
    const from = current * pageSize
    const last = Math.floor(total / pageSize)
    if (name === "next" && from < total) {
      this.setState({
        current: ++current,
        dataLoaded: false
      })
    }
    if (name === "prev" && current !== 1) {
      this.setState({
        current: --current,
        dataLoaded: false
      })
    }
    if (name === "first") {
      this.setState({
        current: 1,
        dataLoaded: false
      })
    }
    if (name === "last") {
      (total % pageSize > 0) ?
        this.setState({ current: last + 1, dataLoaded: false }) :
        this.setState({ current: last, dataLoaded: false })
    }
  }
  /**Pagination */

  /**Navigation */
  onRowClick = (record: any) => {
    this.props.history.push("/alerts/" + this.state.alertType + "/" + record.alertId);
  }

  onRow = (record: any, rowIndex: any) => {
    return {
      onClick: () => { this.onRowClick(record) }
    }
  }
  /**Navigation */

  render() {
    let { modelClicked, alertClicked, timeClicked, severityClicked, openSinceClicked } = this.state;
    const columns: any = [
      {
        dataIndex: 'alertName',
        defaultSortOrder: 'ascend',
        key: "alertName",
        width: '27%',
        title: <span className="header-sorter" onClick={this.handleClickAlert}> Alert Name
                    {alertClicked ?
            <ActiveSort height='30px' width='30px' className={this.state.classname} /> :
            <DownOutlined style={{ padding: '5px', fontSize: '16px' }}
            />}
        </span>,
      },
      {
        dataIndex: 'model',
        key: 'model',
        defaultSortOrder: 'ascend',
        width: '10%',
        title: <span className="header-sorter" onClick={this.handleClickModel}> Model
                        {modelClicked ?
            <ActiveSort height='30px' width='30px' className={this.state.classname} /> :
            <DownOutlined style={{ padding: '5px', fontSize: '16px' }}
            />}
        </span>,
      },
      {
        dataIndex: 'frameId',
        key: 'frameId',
        title: <span > Vehicle Id </span>,
        width: '12%'
      },
      {
        dataIndex: 'alertTime',
        key: 'alertTime',
        defaultSortOrder: 'ascend',
        width: "20%",
        title: <span className="header-sorter" onClick={this.handleClickTime}> Time
                        {timeClicked ?
            <ActiveSort height='30px' width='30px' className={this.state.classname} /> :
            <DownOutlined style={{ padding: '5px', fontSize: '16px' }}
            />}
        </span>,
        render: (text: any, record: any, index: any) =>
          <TimeRenderer text={text} record={record} index={index} />
      },
      {
        dataIndex: 'openSince',
        key: 'openSince',
        width: "15%",
        title: <span className="header-sorter" onClick={this.handleClickOpenSince}> Open Since
                        {openSinceClicked ?
            <ActiveSort height='30px' width='30px' className={this.state.classname} /> :
            <DownOutlined style={{ padding: '5px', fontSize: '16px' }}
            />}
        </span>,
        render: (text: any, record: any, index: any) =>
          <OpenSinceRenderer text={text} record={record} index={index} />
      },
      {
        dataIndex: 'Severity',
        key: 'Severity',
        title: <span className="header-sorter"
          onClick={this.handleClickSeverity} style={{ cursor: 'pointer' }} > Severity
                        {severityClicked ?
            <ActiveSort height='30px' width='30px' className={this.state.classname} /> :
            <DownOutlined style={{ padding: '5px', fontSize: '16px' }} />}
        </span>,
        render: (text: any, record: any, index: any) =>
          <SeverityRenderer text={text} record={record} index={index} />
      },
      {
        dataIndex: 'location',
        key: 'location',
        title: "Location",
        width: "12%"
      },
    ];

    return <>
      <div className="container" >
        <div className={'table-body'}>
          <ConfigProvider renderEmpty={() => <Empty description="No Data"
            image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ color: '#ffffff' }} />}>
            <Table
              tableLayout={"auto"}
              bordered={false}
              className="ant-table-thead"
              showSorterTooltip={false}
              rowKey={record => record.alertId}
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
              columns={columns}
              dataSource={this.state.data}
              pagination={false}
              loading={{
                spinning: false,
                indicator: <div className="loader-gif"><img src={GifLoader} alt="loading..." /></div>,
              }}
              onRow={this.onRow}
            />
          </ConfigProvider>
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
            <pre className="pages-available">
              {this.state.pageSize * (this.state.current - 1) + 1} -&nbsp;
                        {this.state.pageSize * this.state.current > this.state.total
                ? this.state.total : this.state.pageSize * this.state.current}
                          &nbsp;of {this.state.total}</pre>
          </span>
          <div className={'spacer'}></div>
          <span onClick={(e) => { this.handleNav("first", e) }} className={'nav-button'} >
            <DoubleLeftOutlined className={`icon ${this.state.current !== 1 ? "active" : "inactive"}`} />
            {/* <FirstPage style={{}} className={`icon ${this.state.current !== 1 ? "active" : "inactive"}`} /> */}
          </span>
          <span onClick={(e) => { this.handleNav("prev", e) }} className={'nav-button'}>
            <LeftOutlined className={`icon ${this.state.current !== 1 ? "active" : "inactive"}`} />
          </span>
          <span onClick={(e) => { this.handleNav("next", e) }} className={'nav-button'}>
            <RightOutlined className={`icon ${this.state.current * this.state.pageSize >= this.state.total ? "inactive" : "active"}`} />
          </span>
          <span onClick={(e) => { this.handleNav("last", e) }} className={'nav-button'}>
            <DoubleRightOutlined className={`icon ${this.state.current * this.state.pageSize >= this.state.total ? "inactive" : "active"}`} />
          </span>
        </div>
      </div>
    </>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlertTable));
