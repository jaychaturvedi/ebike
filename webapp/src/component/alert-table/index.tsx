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
  filterField: TFilter,
  tableLoading:boolean
}

class AlertTable extends React.Component<AlertProps, AlertStates> {
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      // pageSize : props.alerts.pagination.pageSize,
      // current : props.alerts.pagination.pageNumber,
      total: 0,
      data: [],
      isAsc: true,
      sortingKey: 'alertTime',
      isDesc: false,
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
      },
      tableLoading:true,
    }
  }

  static getDerivedStateFromProps(props: AlertProps, state: AlertStates) {
    state.tableLoading = true
    if ((state.alertType !== props.alerts.activeAlertTab)
      || state.dataLoaded === false
      || (state.filterField.value !== props.alerts.filter.value 
      ||  state.current!==props.alerts.pagination.pageNumber 
      ||  state.pageSize !== props.alerts.pagination.pageSize)) {
      props.getAlerts(
        {
          type: "GET_ALERTS",
          payload: {
            alertType: props.alerts.activeAlertTab,
            pagination: {
              pageNumber: props.alerts.pagination.pageNumber,
              pageSize: props.alerts.pagination.pageSize
            },
            sort: {
              fieldName: state.sortingKey,
              direction: state.isAsc ? "ascend" : "descend"
            },
            filter: props.alerts.filter,
            locationFilter: props.alerts.locationFilter,
            timeFrameFilter: props.alerts.timeFrameFilter,
            vehicleFilter: props.alerts.vehicleFilter,
            searchFilter: props.alerts.searchFilter,
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
        console.log("alert typee", props.alerts );
        
    state.pageSize = props.alerts.pagination.pageSize
    state.current = props.alerts.pagination.pageNumber
    state.tableLoading = false
    // state.data = state.handleSort(Object.values(props.alerts[state.alertType]), props.alerts.sort) as AlertModel[]
    state.data= props.alerts.alertData[state.alertType]

    return state;
  }
  /**Sorting */
  handleSort = (arr: any, sort: TSort) => {
    if (!sort.fieldName) { return arr }
    let sortedData = arr.sort((a: any, b: any) => {
      return a[sort.fieldName]?.localeCompare(b[sort.fieldName])
    });
    if (sort.direction === "descend") {
      return sortedData.reverse()
    }
    return sortedData
  };

  renderClass = () => {
    this.setState({
      isAsc: !this.state.isAsc,
      classname: !this.state.isAsc? 'alert-down-circle' :'alert-down-circle open',
    });
  }

  handleClickAlert = (event: any) => {
    if(this.state.sortingKey!=="alertName"){
      this.setState({
        isAsc: true,
        classname: 'alert-down-circle'
      })
    }
    else this.renderClass()
    this.setState({
      alertClicked: true,
      modelClicked: false,
      timeClicked: false,
      openSinceClicked: false,
      severityClicked: false,
      dataLoaded: false,
      sortingKey: "alertName",
    })
  }

  handleClickModel = (event: any) => {
    if(this.state.sortingKey!=="model"){
      this.setState({
        isAsc: true,
        classname: 'alert-down-circle'
      })
    }
    else this.renderClass()
    this.setState({
      alertClicked: false,
      modelClicked: true,
      timeClicked: false,
      openSinceClicked: false,
      severityClicked: false,
      dataLoaded: false,
      sortingKey: "model"
    })
  }

  handleClickTime = (event: any) => {
    if(this.state.sortingKey!=="alertTime"){
      this.setState({
        isAsc: true,
        classname: 'alert-down-circle'
      })
    }
    else this.renderClass()
    this.setState({
      alertClicked: false,
      modelClicked: false,
      timeClicked: true,
      openSinceClicked: false,
      severityClicked: false,
      dataLoaded: false,
      sortingKey: "alertTime"
    })
  }

  handleClickOpenSince = (event: any) => {
    if(this.state.sortingKey!=="openSince"){
      this.setState({
        isAsc: true,
        classname: 'alert-down-circle'
      })
    }
    else this.renderClass()
    this.setState({
      alertClicked: false,
      modelClicked: false,
      timeClicked: false,
      openSinceClicked: true,
      severityClicked: false,
      dataLoaded: false,
      sortingKey: "openSince"
    })
  }

  handleClickSeverity = (event: any) => {
    if(this.state.sortingKey!=="Severity"){
      this.setState({
        isAsc: true,
        classname: 'alert-down-circle'
      })
    }
    else this.renderClass()
    this.setState({
      alertClicked: false,
      modelClicked: false,
      timeClicked: false,
      openSinceClicked: false,
      severityClicked: true,
      dataLoaded: false,
      sortingKey: "Severity"
    })
  }

  /**Pagination */
  handleSelect = (event: any) => {
    this.setState({ sortingKey: '' })
    const { pageSize, current } = this.state
    console.log("page change",event);
    
    this.props.alertTabChanged({
      type: "UPDATE_ACTIVE_ALERT",
      payload: {
        alertType: this.props.alerts.activeAlertTab,
        pagination: {
          pageNumber: 1,
          pageSize: Number(event)
        },
        sort: this.props.alerts.sort,
        filter: this.props.alerts.filter,
        locationFilter: this.props.alerts.locationFilter,
        timeFrameFilter: this.props.alerts.timeFrameFilter,
        vehicleFilter: this.props.alerts.vehicleFilter,
        searchFilter: this.props.alerts.searchFilter,
      }
    })
    this.setState({ 
      pageSize: Number(event), 
      current: 1, 
      dataLoaded: false 
    })
  }

  handleNav = (name: any, e: any) => {
    e.preventDefault()
    let { current, total, pageSize } = this.state
    let newPageNumber :number=1
    let from = current * pageSize
    let last = Math.floor(total / pageSize)
    if (name === "next" && from < total) {
      newPageNumber=++current
      // this.setState({
      //   current: newPageNumber,
      //   dataLoaded: false
      // })
    }
    if (name === "prev" && current !== 1) {
      newPageNumber=--current
      // this.setState({
      //   current: --current,
      //   dataLoaded: false
      // })
    }
    if (name === "first") {
      newPageNumber=1
      // this.setState({
      //   current: 1,
      //   dataLoaded: false
      // })
    }
    if (name === "last") {
      newPageNumber = (total % pageSize > 0) ?(last+1): last;
        // this.setState({ current: newPageNumber, dataLoaded: false })
    }
    this.props.alertTabChanged({
      type: "UPDATE_ACTIVE_ALERT",
      payload: {
        alertType: this.props.alerts.activeAlertTab,
        pagination: {
          pageNumber: newPageNumber,
          pageSize: this.props.alerts.pagination.pageSize
        },
        sort: this.props.alerts.sort,
        filter: this.props.alerts.filter,
        locationFilter: this.props.alerts.locationFilter,
        timeFrameFilter: this.props.alerts.timeFrameFilter,
        vehicleFilter: this.props.alerts.vehicleFilter,
        searchFilter: this.props.alerts.searchFilter,
      }
    })
    this.setState({dataLoaded:false})
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
  customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', fontSize:"18px" }} className={"my-ant-empty-normal"}>
      <p>No alerts available at the moment</p>
    </div>
  );
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
          <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
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
                spinning: this.state.tableLoading,
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
              {this.state.total?(this.state.pageSize * (this.state.current - 1) + 1):0} -&nbsp;
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
