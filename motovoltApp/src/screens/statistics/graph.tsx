import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Route, RouteProp} from '@react-navigation/native';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
// import { ScrollView } from 'react-native-gesture-handler';
// import { BarChart } from 'react-native-chart-kit';
import * as scale from 'd3-scale';
import {moderateScale} from 'react-native-size-matters';
import LanguageSelector from '../../translations';

type Props = {
  data: {
    value: number;
    date: string;
  }[];
};

type State = {
  data: any[];
  fill: string;
  offset: number;
  scrollEnd: boolean;
  direction: string;
};

export default class Graph extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      direction: '',
      scrollEnd: false,
      data: [],
      fill: '#5372FF',
      offset: 0,
    };
  }

  getDayString(day: number) {
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return 'Sun';
    }
  }

  render() {
    const yData = [
      {
        value: 120,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-09T16:25:31.541Z'),
      },
      {
        value: 10,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-07T16:25:31.541Z'),
      },
      {
        value: 40,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-08T16:25:31.541Z'),
      },
      {
        value: 95,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-09T16:25:31.541Z'),
      },
      {
        value: 95,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-09T16:25:31.541Z'),
      },
      {
        value: 95,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-09T16:25:31.541Z'),
      },
      {
        value: 95,
        svg: {
          fill: 'transparent',
        },
        date: new Date('2020-08-09T16:25:31.541Z'),
      },
      ...this.props.data.map((graph, index: number) => ({
        value: graph.value,
        date: graph.date,
        svg: {
          fill:
            index === this.props.data.length - 1
              ? 'rgb(83,114,255,1)'
              : 'rgb(83,114,255,0.4)',
        },
      })),
    ];
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '90%', flexDirection: 'row' }}>
          <YAxis
            max={110}
            min={-5}
            data={yData.slice(-7)}
            formatLabel={(value, index) => `${value} KM`}
            numberOfTicks={3}
            yAccessor={({item}) => item.value}
            svg={{fill: 'black', fontSize: 12}}
            style={{height: moderateScale(150), width: moderateScale(40)}}
          />
          <ScrollView
            style={{}}
            horizontal={true}
            onScrollAnimationEnd={() => console.log('animation end')}
            onMomentumScrollEnd={() => console.log('Scroll ended')}
            onScrollEndDrag={() => this.setState({scrollEnd: true})}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={(event) => {
              var currentOffset = event.nativeEvent.contentOffset.x;
              var direction =
                currentOffset > this.state.offset ? 'right' : 'left';
              this.setState({
                offset: currentOffset,
                scrollEnd: false,
                direction,
              });
              // console.log(direction);
            }}>
            {this.props.data.length === 0 ? (
              <View
                style={{
                  height: '100%',
                  minWidth: moderateScale(250),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f3f5',
                }}>
                <Text>{LanguageSelector.t('myRides.noHistoryDataFound')}</Text>
              </View>
            ) : (
              <View style={{minWidth: moderateScale(260), width: "100%"}}>
                <BarChart
                  yMin={-5}
                  yMax={110}
                  style={{height: moderateScale(150)}}
                  // data={this.state.data}
                  data={yData.slice(-7)}
                  svg={{fill: this.state.fill}}
                  gridMin={2}
                  gridMax={2}
                  yAccessor={({item}) => item.value}
                  numberOfTicks={3}
                  spacingInner={0.2}>
                  <Grid svg={{strokeMiterlimit: 500}} />
                </BarChart>
                <XAxis
                  // data={this.state.data}
                  data={yData.slice(-7)}
                  scale={scale.scaleBand}
                  formatLabel={(value, index) => {
                    console.log(yData.slice(-7));
                    // console.log(this.state.data[index].date);
                    if (yData.slice(-7)[index].svg.fill === 'transparent')
                      return '';
                    return this.getDayString(
                      new Date(yData.slice(-7)[index].date).getDay(),
                    );
                  }}
                  style={{
                    height: moderateScale(40),
                    paddingTop: moderateScale(5),
                  }}
                  svg={{fill: '#3A8F98', fontSize: 13}}
                />
              </View>
            )}
          </ScrollView>
        </View>
        {/* <Text>
                    ScrollEnd : {this.state.scrollEnd ? "true" : "false"}</Text><Text>
                    Direction : {this.state.direction}
                </Text> */}
      </View>
    );
  }
}
