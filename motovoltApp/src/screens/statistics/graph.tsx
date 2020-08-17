import React from 'react'
import { View, Text, Button, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Route, RouteProp } from '@react-navigation/native'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
// import { ScrollView } from 'react-native-gesture-handler';
// import { BarChart } from 'react-native-chart-kit';
import * as scale from 'd3-scale'
import { moderateScale } from 'react-native-size-matters'

type Props = {
    data: {
        value: number,
        date: string
    }[]
}

type State = {
    data: any[],
    fill: string,
    offset: number,
    scrollEnd: boolean,
    direction: string
}

export default class Graph extends React.PureComponent<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            direction: '',
            scrollEnd: false,
            data: [],
            // data: [
            //     {
            //         value: 120,
            //         svg: {
            //             fill: 'transparent',
            //         },
            //         date: new Date("2020-08-09T16:25:31.541Z"),
            //     },
            //     {
            //         value: 50,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-07-30T16:25:31.541Z"),
            //     },
            //     {
            //         value: 10,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-07-31T16:25:31.541Z"),
            //     },
            //     {
            //         value: 20,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-01T16:25:31.541Z"),
            //     },
            //     {
            //         value: 15,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-02T16:25:31.541Z"),
            //     },
            //     {
            //         value: 50,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-03T16:25:31.541Z"),
            //     },
            //     {
            //         value: 80,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-04T16:25:31.541Z"),
            //     },
            //     {
            //         value: 80,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-05T16:25:31.541Z"),
            //     },
            //     {
            //         value: 50,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-06T16:25:31.541Z"),
            //     },
            //     {
            //         value: 10,
            //         svg: {
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-07T16:25:31.541Z"),
            //     },
            //     {
            //         value: 40,
            //         svg: {
            //             // stroke: 'purple',
            //             // strokeWidth: 1,
            //             // fill: 'white',
            //             // strokeDasharray: [4, 2],
            //             fill: 'rgb(83,114,255,0.4)',
            //         },
            //         date: new Date("2020-08-08T16:25:31.541Z"),
            //     },
            //     {
            //         value: 95,
            //         svg: {
            //             fill: 'rgb(83,114,255,1)',
            //         },
            //         date: new Date("2020-08-09T16:25:31.541Z"),
            //     },


            // ],
            fill: '#5372FF',
            offset: 0

        }
    }

    getDayString(day: number) {
        switch (day) {
            case 0: return 'Sun';
            case 1: return 'Mon';
            case 2: return 'Tue';
            case 3: return 'Wed';
            case 4: return 'Thu';
            case 5: return 'Fri';
            case 6: return 'Sat';
            default: return 'Sun';
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {/* {
                    this.setState({
                        data: [{
                            value: 120,
                            svg: {
                                fill: 'transparent',
                            },
                            date: new Date("2020-08-09T16:25:31.541Z"),
                        }, ...this.props.data.map(data => ({
                            value: data.value,
                            svg: {
                                fill: 'rgb(83,114,255,0.4)',
                            },
                            date: new Date(data.date),
                        }))]
                    })
                } */}
                <View style={{ width: '90%', flexDirection: 'row' }} >
                    <YAxis
                        // data={this.state.data}
                        data={[{
                            value: 120,
                            svg: {
                                fill: 'transparent',
                            },
                            date: new Date("2020-08-09T16:25:31.541Z"),
                        }, {
                            value: 10,
                            svg: {
                                fill: 'rgb(83,114,255,0.4)',
                            },
                            date: new Date("2020-08-07T16:25:31.541Z"),
                        },
                        {
                            value: 40,
                            svg: {
                                fill: 'rgb(83,114,255,0.4)',
                            },
                            date: new Date("2020-08-08T16:25:31.541Z"),
                        },
                        {
                            value: 95,
                            svg: {
                                fill: 'rgb(83,114,255,0.4)',
                            },
                            date: new Date("2020-08-09T16:25:31.541Z"),
                        },
                        ...this.props.data.map((graph, index: number) => ({
                            value: graph.value, date: graph.date, svg: {
                                fill: index === this.props.data.length - 1 ? 'rgb(83,114,255,1)' : 'rgb(83,114,255,0.4)'
                            }
                        }))]}
                        formatLabel={(value, index) => `${value} KM`}
                        numberOfTicks={2}
                        yAccessor={({ item }) => item.value}
                        svg={{ fill: '#3A8F98', fontSize: 12 }}
                        style={{ height: moderateScale(150), width: moderateScale(40) }} />

                    <ScrollView style={{}} horizontal={true}
                        onScrollAnimationEnd={() => console.log("animation end")}
                        onMomentumScrollEnd={() => console.log("Scroll ended")}
                        onScrollEndDrag={() => this.setState({ scrollEnd: true })}
                        scrollEventThrottle={16}
                        bounces={false}
                        onScroll={(event) => {
                            var currentOffset = event.nativeEvent.contentOffset.x;
                            var direction = currentOffset > this.state.offset ? 'right' : 'left';
                            this.setState({ offset: currentOffset, scrollEnd: false, direction });
                            // console.log(direction);
                        }} >
                        <View style={{ minWidth: moderateScale(300) }}>
                            <BarChart style={{ height: moderateScale(150) }}
                                // data={this.state.data}
                                data={[{
                                    value: 120,
                                    svg: {
                                        fill: 'transparent',
                                    },
                                    date: new Date("2020-08-09T16:25:31.541Z"),
                                },
                                {
                                    value: 10,
                                    svg: {
                                        fill: 'rgb(83,114,255,0.4)',
                                    },
                                    date: new Date("2020-08-07T16:25:31.541Z"),
                                },
                                {
                                    value: 40,
                                    svg: {
                                        fill: 'rgb(83,114,255,0.4)',
                                    },
                                    date: new Date("2020-08-08T16:25:31.541Z"),
                                },
                                {
                                    value: 95,
                                    svg: {
                                        fill: 'rgb(83,114,255,0.4)',
                                    },
                                    date: new Date("2020-08-09T16:25:31.541Z"),
                                },
                                ...this.props.data.map((graph, index: number) => ({
                                    value: graph.value, date: graph.date, svg: {
                                        fill: index === this.props.data.length - 1 ? 'rgb(83,114,255,1)' : 'rgb(83,114,255,0.4)'
                                    }
                                }))]}
                                svg={{ fill: this.state.fill }}
                                gridMin={2}
                                yAccessor={({ item }) => item.value}
                                numberOfTicks={2}
                                spacingInner={0.2} >
                                <Grid svg={{ strokeMiterlimit: 500 }} />
                            </BarChart>
                            <XAxis
                                // data={this.state.data}
                                data={[{
                                    value: 120,
                                    svg: {
                                        fill: 'transparent',
                                    },
                                    date: new Date("2020-08-09T16:25:31.541Z"),
                                },
                                {
                                    value: 10,
                                    svg: {
                                        fill: 'rgb(83,114,255,0.4)',
                                    },
                                    date: new Date("2020-08-07T16:25:31.541Z"),
                                },
                                {
                                    value: 40,
                                    svg: {
                                        fill: 'rgb(83,114,255,0.4)',
                                    },
                                    date: new Date("2020-08-08T16:25:31.541Z"),
                                },
                                {
                                    value: 95,
                                    svg: {
                                        fill: 'rgb(83,114,255,0.4)',
                                    },
                                    date: new Date("2020-08-09T16:25:31.541Z"),
                                },
                                ...this.props.data.map((graph, index: number) => ({
                                    value: graph.value, date: graph.date, svg: {
                                        fill: index === this.props.data.length - 1 ? 'rgb(83,114,255,1)' : 'rgb(83,114,255,0.4)',
                                    }
                                }))]}
                                scale={scale.scaleBand}
                                formatLabel={(value, index) => {
                                    // console.log(this.state.data[index].date);
                                    return this.getDayString(new Date(this.props.data[index] ? this.props.data[index].date : new Date()).getDay())
                                }}
                                style={{ height: moderateScale(40), paddingTop: moderateScale(5) }}
                                svg={{ fill: '#3A8F98', fontSize: moderateScale(15) }}
                            />
                        </View>
                    </ScrollView>
                </View>
                {/* <Text>
                    ScrollEnd : {this.state.scrollEnd ? "true" : "false"}</Text><Text>
                    Direction : {this.state.direction}
                </Text> */}
            </View >
        )
    }
}