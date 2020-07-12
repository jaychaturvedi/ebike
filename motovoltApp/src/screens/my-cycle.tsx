import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import RideMetric from '../components/ride-metric'
import VehicleInfo from '../components/vehicle-info-battery'

type Props = {}
type State = {}

export default class MyCycle extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cycle}>
                    <Image source={require('../assets/images/cycle.png')}
                        style={{ resizeMode: 'center' }}
                    />
                </View>
                <View style={styles.cycleName}>
                    <Text style={{ fontSize: scale(16), fontWeight: 'bold' }}>Cycle A</Text>
                </View>
                <View style={styles.metrics}>
                    <RideMetric
                        header1="Health"
                        header2="Service Date"
                        icon1={require("../assets/icons/health_green.png")}
                        icon2={require("../assets/icons/calendar_green.png")}
                        value1="100 %"
                        value2="24/10/20"
                        unit1=""
                        unit2=""
                    />
                    <RideMetric
                        header1="Motor"
                        header2="Battery"
                        icon1={require("../assets/icons/health_green.png")}
                        icon2={require("../assets/icons/calendar_green.png")}
                        value1="100 %"
                        value2="100 %"
                        unit1=""
                        unit2=""
                    />
                    <VehicleInfo
                        header1="Vehicle ID"
                        header2="Battery ID"
                        value1={["1234566"]}
                        value2={["1234567", "2345679", "1234567", "2345679", "1234567", "2345679"]}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#F0F0F0',
        padding: moderateScale(15)
    },
    cycle: {
        height: moderateScale(300),
        padding: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cycleName: {
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    metrics: {
        flex: 1,
        marginTop: moderateScale(20)
    }
})