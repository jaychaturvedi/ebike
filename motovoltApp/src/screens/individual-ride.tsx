import React from 'react';
import { View, StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import TipCard from '../components/tip-card'
import Swiper from 'react-native-swiper'
import RideMetric from '../components/ride-metric'

type Props = {}
type State = {}

export default class IndividualRide extends React.PureComponent<Props, State>{

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.map}></View>
                <View style={styles.tip}>
                    <Swiper loop={true}
                        dot={<View />}
                        activeDot={<View />}
                        index={0}
                        autoplay
                        automaticallyAdjustContentInsets
                        ref="mySwiper"
                    >
                        <View style={styles.slide}>
                            <TipCard
                                header="Tip to improve ride"
                                tip="Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut"
                            />
                        </View>
                        <View style={styles.slide}>
                            <TipCard
                                header="Tip to improve ride"
                                tip="Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut"
                            />
                        </View>
                    </Swiper>
                </View>
                <View style={styles.metrics}>
                    <RideMetric
                        header1="Distance"
                        header2="Duration"
                        icon1={require("../assets/icons/total_distance_icon.png")}
                        icon2={require("../assets/icons/charge_time_remaining.png")}
                        value1="15"
                        value2="01:10:00"
                        unit1="Km"
                        unit2=""
                    />
                    <RideMetric
                        header1="Avg. speed"
                        header2="Max. speed"
                        icon1={require("../assets/icons/total_distance_icon.png")}
                        icon2={require("../assets/icons/total_distance_icon.png")}
                        value1="16.5"
                        value2="35"
                        unit1="Kmph"
                        unit2="Kmph"
                    />
                    <RideMetric
                        header1="Green Miles"
                        header2="Calories Burnt"
                        icon1={require("../assets/icons/green_miles_icon.png")}
                        icon2={require("../assets/icons/calories_icon_blue.png")}
                        value1="5"
                        value2="2"
                        unit1="Km"
                        unit2=""
                    />
                    <RideMetric
                        header1="Petrol Savings"
                        header2="Ride Score"
                        icon1={require("../assets/icons/inr_icon.png")}
                        icon2={require("../assets/icons/star_icon_large.png")}
                        value1="145"
                        value2="2"
                        unit1="INR"
                        unit2="L"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#F0F0F0'
    },
    map: {
        height: moderateScale(200),
        backgroundColor: 'white',
        borderRadius: moderateScale(15),
        margin: moderateScale(15),
    },
    slide: {
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15)
    },
    tip: {
        height: moderateScale(100),
    },
    metrics: {
        flex: 1,
        padding: moderateScale(15)
    }
})