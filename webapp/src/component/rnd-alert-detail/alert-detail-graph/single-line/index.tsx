import './index.scss';
import { Typography } from "antd";
import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, ReferenceLine, Brush
} from 'recharts';
import moment from 'moment';
import { formatDateTime } from '../../../../connectm-client/util/time-formater';


const CustomizedDot = (props: any) => {
    const { cx, cy, payload, alertDate } = props;
    const TimeDate = moment(payload?.xAxisValue).format("DD/MM/YYYY hh:mm")
    const AlertDate= moment(props?.alertDate).format("DD/MM/YYYY hh:mm")
    if (TimeDate === AlertDate) {
        return (
            <svg x={cx - 5} y={cy - 10} width={20} height={20} fill="red">
                <polygon points="6 2, 12 12, 0 12" />
            </svg>
        );
    }
    else return null;
};

interface AlertDetailGraphProps {
    data: any; 
    line1StrokeColor?: string;
    L1: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    line1Name?: string; 
    refColor?: string;
    dataKey?: string; 
    line1Key?: string; 
    title: string; 
    alertCleared?: boolean; 
    alertDate?: string;
    L1Value?:number;
}

interface AlertDetailGraphStates {
    data: any; 
    line1StrokeColor?: string,
    xAxisLabel?: string, 
    yAxisLabel?: string, 
    line1Name?: string, 
    refColor?: string,
    dataKey?: string, 
    line1Key?: string, 
    title: string, 
    L1Value: number,
    lineTooltipType: string,
}
class AlertDetailGraph extends PureComponent<AlertDetailGraphProps, AlertDetailGraphStates> {
    constructor(props: AlertDetailGraphProps) {
        super(props);
        this.state = {
            data: [{ a: 0, b: 0, c: 0 }],
            dataKey: 'a',
            xAxisLabel: "X Label",
            yAxisLabel: "Y Label",
            title: "Graph Name",
            L1Value: 0,
            refColor: "white",
            line1Name: 'legend 1',
            line1Key: "b",
            lineTooltipType: ""
        }
    }
    static getDerivedStateFromProps(props: AlertDetailGraphProps, state: AlertDetailGraphStates) {
        let data = state.data
        if (props.data !== undefined && props.data !== null) {
            data = props.data;
            state.L1Value = props.L1Value! ?props.L1Value!:0;
            state.xAxisLabel = props.xAxisLabel;
            state.yAxisLabel = props.yAxisLabel;
            state.refColor = props.refColor;
            state.dataKey = props.dataKey;
            state.line1Key = props.line1Key;
            state.line1Name = props.line1Name;
        }
        state.data = data
        return state
    }

    DynamicLabel = (props: any) => {
        return (
            <text
                style={{ fontSize: "12px", fontWeight: 700 }}
                x={props.viewBox.x + props.viewBox.width / 2}
                y={props.viewBox.y + props.viewBox.height - 5}
                textAnchor="middle"
                fill="#ffffff">
                {props.value}
            </text>
        );
    }
    formatDate = (label: any) => {
        return this.props.xAxisLabel === "Time"
            ? this.state.data[0]?.xAxisValue === label
            ? formatDateTime(label, "hh:mm a DD/MM/YYYY")
            : formatDateTime(label, "hh:mm a")
            : label
    }

    CustomTooltip = (obj: any) => {
      const { label, payload, active } = obj;
      const style = { top: obj?.viewBox.y - 20, color: "#white", zIndex: 20, fontSize: "12px" };
      if (!active || !label || payload?.length === 0 ||
        !payload || this.state.lineTooltipType === "") return null;
      const formatType = this.props.xAxisLabel === "Days" ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm:ss a"
      const line = payload.filter((item: any) => { return item.dataKey === this.state.lineTooltipType })
      const localAlertTime = formatDateTime(line[0]?.payload?.xAxisValue, formatType)
      if (line?.length === 0) return null
      if(this.props.xAxisLabel === "No of Cycles") {
        return (
          <div className="custom-tooltip" style={style}>
            <p className="label">{line[0]?.name} : {line[0]?.value}</p>
            <p className="label">{this.props.xAxisLabel} : {`${line[0]?.payload?.xAxisValue}`}</p>
          </div>
        );
      }
      return (
        <div className="custom-tooltip" style={style}>
          <p className="label">{line[0]?.name} : {line[0]?.value}</p>
          <p className="label">{this.props.xAxisLabel} : {`${localAlertTime}`}</p>
        </div>
      );
    };

  render() {
    return (
      <div className="connectm-AlertDetailGraph">
        <div className={"connectm-header"}>
          <Typography.Text className="graph-header-text" strong>{this.props.title}</Typography.Text>
        </div>
        {/* <LineGraph/> */}
        <div
          className="alert-graph-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            width: '100%' }} >
          <ResponsiveContainer width="95%" height="95%">
            <LineChart
              data={this.props.data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0, }}>
              <Legend
                wrapperStyle={{ top: 0, left: 30 }}
                verticalAlign="top"
                layout="horizontal"
                iconType="circle"
                iconSize={10}
              />
              <CartesianGrid strokeDasharray="3 3 5 2" stroke="#515151" />
              {!this.props.alertCleared ?
                this.state.L1Value ?
                  <ReferenceLine
                    y={this.state.L1Value}
                    stroke={this.props.refColor}
                    strokeDasharray="3 3 5 2"
                    isFront={true}
                  >
                    <Label
                      position={'insideBottomLeft'}
                      fill="#ffffff"
                      style={{ fontSize: '8px', textAnchor: 'center' }}
                      value="L1"
                    >
                    </Label>
                  </ReferenceLine> :
                  <ReferenceLine /> :
                ''}
              <XAxis
                dataKey={this.state.dataKey}
                height={35}
                tickFormatter={(label) => this.formatDate(label)}
                // ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]}
                interval={"preserveStartEnd"}
                tick={{ fill: 'white' }}
                stroke='#ffffff'
                allowDataOverflow={true}
                padding={{ left: 30, right: 20 }}
              >
                <Label
                  value={this.state.xAxisLabel}
                  position="bottom"
                  offset={-18}
                  style={{ padding: 5 }}
                  content={props => { return this.DynamicLabel(props) }}
                />
              </XAxis>
              <YAxis
                tick={{ fill: 'white' }}
                // ticks={[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]}
                // interval={1}
                padding={{ top: 20, bottom: 20 }} 
                allowDataOverflow={true}
                stroke='#ffffff'
              >
                <Label
                  angle={270}
                  position='left'
                  offset={-20}
                  fill="#ffffff"
                  style={{ fontSize: '12px', textAnchor: 'middle', }}
                  value={this.state.yAxisLabel}
                  className="recharts-yaxis-label"
                />
              </YAxis>
              <Tooltip
                offset={-25}
                content={this.CustomTooltip}
                cursor={{ fill: "transparent", top: 0, }}
              />
              <Brush
                dataKey={this.state.dataKey}
                fill="#131731"
                height={12}
                stroke="#3C4473"
                startIndex={0}
                endIndex={0}
              />
              {!this.props.alertCleared ?
                <Line
                  name={this.state.line1Name}
                  type="monotone"
                  dataKey={this.state.line1Key as string}
                  stroke={this.props.line1StrokeColor}
                  strokeWidth={3} isAnimationActive={true}
                  dot={<CustomizedDot
                    L1={this.state.L1Value}
                    alertDate={this.props.alertDate} />}
                    activeDot={{
                      onMouseOver: (e: any) => this.setState({lineTooltipType: this.state.line1Key!}),
                      onMouseLeave: (e: any) => this.setState({lineTooltipType: ""})
                    }}
                />
                : ''}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div >
    )
  }

}

export default AlertDetailGraph;