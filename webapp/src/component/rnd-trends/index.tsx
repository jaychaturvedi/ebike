import './index.scss';
import { Menu, Dropdown, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TtrendTotalAlerts, TtrendLocationWise, TtrendTop5Alert } from "../../connectm-client/redux/models";
import React, { PureComponent } from 'react';
import moment from "moment";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip,
} from 'recharts';
import { ReduxAlertTrendActions, ReduxAlertTrendState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/trends"
import { connect } from 'react-redux';
import TrendsDropdown from './dropdown';

interface RandDTrendsProps extends ReduxAlertTrendActions, ReduxAlertTrendState { 
  trendsAlertType:"smart"|"bms"|"mc"
}

interface RandDTrendsStates {
  trendsPeriod: string,
  totalAlerts: TtrendTotalAlerts,
  top5Alerts: TtrendTop5Alert,
  locationWiseAlerts: TtrendLocationWise,
  xAxis: number
  reload: boolean,
  startDate: string,
  endDate: string,
  clickCount: number,
  zoom: number,
  interval: number,
  alertType:"smart"|"bms"|"mc",
  lineTooltipType: string,
}
// let data: object[] = []
// for (let i = 1; i <= 31; i++) {
//     data.push({ date: `2020-07-${i}`, count: i % 3 ? 200 : 100 })
// }
// const re = data.sort((a: any, b: any): any => {
//     return a["date"] > b["date"]
// })

class CustomizedDot extends React.PureComponent<any> {
  render() {
    const { cx, cy, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        viewBox="0 0 10 10"
        fill="#ff7385"
      >
        <rect width="10" height="10" />
      </svg>
    );
  }
}

class RandDTrends extends PureComponent<RandDTrendsProps, RandDTrendsStates> {
  constructor(props: RandDTrendsProps) {
    super(props);
    this.state = {
      clickCount: 0,
      trendsPeriod: "Last 7 Days",
      totalAlerts: {data:[{
        date: "2020-10-15",
        count: 1
      }]},
      locationWiseAlerts: {
        lines: {
          loc1: "Bengaluru",
          loc2: "Kolkata"
        }, data: [{
          date: "2020-11-02",
          loc1count: 4,
          loc2count: 15
        }]
      },
      top5Alerts: {
        lines: {
          alert1: "No data"
        }, data: [{
          date: "2020-10-30",
          alert1count: 4
        }]
      },
      zoom: 0,
      xAxis: 7,
      reload: true,
      startDate: moment().subtract(6, 'd').format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      interval: 0,
      alertType:"smart",
      lineTooltipType:""
    }
  }
  // componentDidMount(){
  //   this.props.getAlertTrends({
  //     type: "GET_ALERT_TRENDS",
  //     payload: {
  //       alertType: this.props.trendsAlertType,
  //       startDate: this.state.startDate,
  //       endDate: this.state.endDate,
  //       trendsZoom: this.state.zoom
  //     }
  //   })
  // }

  static getDerivedStateFromProps(props: RandDTrendsProps, state: RandDTrendsStates) {
    // console.log("GET_ALERT_TRENDS props",state, props.alerts.activeAlertTab,props.trendsAlertType);
    if (state.alertType !==props.alerts.activeAlertTab || state.reload) {
      props.getAlertTrends({
        type: "GET_ALERT_TRENDS",
        payload: {
          alertType: props.trendsAlertType,
          startDate: state.startDate,
          endDate: state.endDate,
          trendsZoom: state.zoom
        }
      })
      state.reload = false;
    }
    state.alertType=props.alerts.activeAlertTab
    state.totalAlerts.data = props?.trendTotalAlert?.data?.sort((a: any, b: any): any => {
      return a["date"] > b["date"] ? b["date"] : a["date"]
    })
    state.top5Alerts = {
      lines: props?.trendTop5Alert?.lines,
      data: props?.trendTop5Alert?.data?.sort((a: any, b: any): any => {
        return a["date"] > b["date"] ? b["date"] : a["date"]
      })
    }
    state.locationWiseAlerts = {
      lines: props?.trendLocationWise?.lines,
      data: props.trendLocationWise?.data?.sort((a: any, b: any): any => {
        return a["date"] - b["date"] ? b["date"] : a["date"]
      })
    }
    state.zoom = props.trendsZoom
    // console.log("component rnd trends props and states", props, state);
    return state
  }

  handlePeriodChange = (e: any) => {
    let dateTo
    let dateFrom
    if (e.key === "Last 30 Days") {
      dateTo = moment().format("YYYY-MM-DD HH:mm:ss");
      dateFrom = moment().subtract(30, 'd').format("YYYY-MM-DD HH:mm:ss");
      this.setState({ interval: 1 })
    } else {
      dateTo = moment().format("YYYY-MM-DD HH:mm:ss");
      dateFrom = moment().subtract(6, 'd').format("YYYY-MM-DD HH:mm:ss");
      this.setState({ interval: 0 })
    }
    this.setState({
      trendsPeriod: e.key,
      startDate: dateFrom,
      endDate: dateTo,
      reload: true
    })
  }

  formatDate = (label: any) => {
    // console.log("label", label)
    // console.log(moment(`${label}`).format('dddd'));
    if ("Last 7 Days" === this.state.trendsPeriod)
      return moment(`${label}`).format('dddd').slice(0, 3).toUpperCase()
    else if (label === this.state.startDate) {
      return moment(`${label}`).format('DD').toString() + moment(`${label}`).format('ll').toString().split(' ')[0]
    }
    else return moment(`${label}`).format('DD')
  }

  CustomTooltip = (obj: any) => {
    const { label, payload, active } = obj;
    const style = { top: obj?.viewBox.y - 20, color: "#white", zIndex: 20,  };
    // console.log(payload);
    if (!active || !label || payload?.length === 0 ||
      !payload || this.state.lineTooltipType == "") return null;
    const line = payload?.filter((item: any) => { return item?.dataKey === this.state.lineTooltipType })
    if(line?.length == 0) return null
    console.log(line);
    return (
      <div className="custom-tooltip" style={{...style, fontSize:10}}>
        <p className="label">{line[0]?.name} : <b>{line[0]?.value}</b></p>
      </div>
    );
  };

  render() {
    return <div className="connectm-RandDTrends">
        <TrendsDropdown 
          handlePeriodChange={this.handlePeriodChange}
          trendsPeriod={this.state.trendsPeriod}
        />
      <div className={"title-header"}>
        <Typography.Text
          strong
          className="title-header-text"
        >
          Total Alerts
        </Typography.Text>
      </div>

      <ResponsiveContainer width="100%" height="28%" className="total-recharts">
        <LineChart
          margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
          data={this.state.totalAlerts?.data}
        >
          <CartesianGrid
            strokeDasharray="3 4 5 2"
            stroke="#515151"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: 'white' }}
            interval={this.state.interval}
            padding={{ left: 20, right: 20 }}
            minTickGap={1}
            tickFormatter={(label) => this.formatDate(label)}
          />
          <Tooltip
            offset={-17}
            content={this.CustomTooltip}
            cursor={{ fill: "transparent", top: 0, }}
          />
          <YAxis
            type="number"
            // domain={[0, 'dataMax']}
            tick={{ fill: 'white' }}
            stroke='#131731'
          />
          {this.state.totalAlerts?.data?.length &&
            <Line
              name="Total Alerts"
              type="monotone"
              dataKey="count"
              stroke="#7BE9F4"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }}
            />}
        </LineChart>
      </ResponsiveContainer>

      <div className={"title-header"}>
        <Typography.Text strong className="title-header-text">Top 5 Alerts</Typography.Text>
      </div>

      <ResponsiveContainer width="100%" height="28%" className="top-five-recharts">
        <LineChart
          data={this.state.top5Alerts.data}
          margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 4 5 2" stroke="#515151" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'white' }}
            interval={this.state.interval}
            padding={{ left: 20, right: 20 }}
            tickFormatter={(label) => this.formatDate(label)}
          />
          <Legend
            iconType="circle"
            iconSize={5}
            wrapperStyle={{ width: '100%', marginLeft: "20%" }}
          />
          <Tooltip
            offset={-17}
            content={this.CustomTooltip}
            cursor={{ fill: "transparent", top: 0, }}
          />
          <YAxis
            type="number"
            // domain={[0, 100]}
            tick={{ fill: 'white' }}
            stroke='#131731'
          />
          {this.state.top5Alerts.lines?.alert1 &&
            <Line
              name={this.state.top5Alerts.lines?.alert1}
              type="monotone"
              dataKey="alert1count"
              stroke="#EB8E27"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "alert1count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }}            
            />
          }
          {this.state.top5Alerts.lines?.alert2 &&
            <Line
              name={this.state.top5Alerts.lines?.alert2}
              type="monotone"
              dataKey="alert2count"
              stroke="#80F0FA"
              strokeWidth={2}
              isAnimationActive={true}
              animationEasing={'ease-in-out'}
              animationDuration={100}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "alert2count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }}  
            />
          }
          {this.state.top5Alerts.lines?.alert3 &&
            <Line
              name={this.state.top5Alerts.lines?.alert3}
              type="monotone"
              dataKey="alert3count"
              stroke="#5280EF"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "alert3count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }}  
            />
          }
          {this.state.top5Alerts.lines?.alert4 &&
            <Line
              name={this.state.top5Alerts.lines?.alert4}
              type="monotone"
              dataKey="alert4count"
              stroke="#89ED72"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "alert4count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }} 
            />
          }
          {this.state.top5Alerts.lines?.alert5 &&
            <Line
              name={this.state.top5Alerts.lines?.alert5}
              type="monotone"
              dataKey="alert5count"
              stroke="#B7413E"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "alert5count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }} 
            />
          }
        </LineChart>
      </ResponsiveContainer>

      <div className={"title-header"}>
        <Typography.Text strong className="title-header-text">Location-Wise Alerts</Typography.Text>
      </div>

      <ResponsiveContainer width="100%" height="28%" className="location-recharts">
        <LineChart
          data={this.state.locationWiseAlerts.data}
          margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 4 5 2"
            stroke="#515151"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: 'white' }}
            interval={this.state.interval}
            padding={{ left: 20, right: 20 }}
            tickFormatter={(label) => this.formatDate(label)}
          />
          <Legend
            iconType="circle"
            iconSize={5} align="right"
            wrapperStyle={{ width: '80%', paddingRight: '50px' }}
          />
          <YAxis type="number"
            // domain={[0, 100]}
            tick={{ fill: 'white' }}
            stroke='#131731'
          />
          <Tooltip
            offset={-17}
            content={this.CustomTooltip}
            cursor={{ fill: "transparent", top: 0, }}
          />
          {this.state.locationWiseAlerts.lines?.loc1 &&
            <Line
              name={this.state.locationWiseAlerts.lines?.loc1}
              type="monotone"
              dataKey="loc1count"
              stroke="#EB8E27"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "loc1count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }} 
            />
          }
          {this.state.locationWiseAlerts.lines?.loc2 &&
            <Line
              name={this.state.locationWiseAlerts.lines?.loc2}
              type="monotone"
              dataKey="loc2count"
              stroke="#80F0FA"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "loc2count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }} 
            />
          }
          {this.state.locationWiseAlerts.lines?.loc3 &&
            <Line
              name={this.state.locationWiseAlerts.lines?.loc3}
              type="monotone"
              dataKey="loc3count"
              stroke="#89ED6F"
              strokeWidth={2}
              dot={false}
              activeDot={{
                onMouseOver: (e: any) => this.setState({lineTooltipType: "loc3count"}),
                onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
              }} 
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
    // console.log(this.state.top5Alerts, 'top5')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandDTrends);