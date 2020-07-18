import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import ChargingTile from '../components/charging-tile'

type Props = {
    chargingStatus: string,
    charge: string,
    remainingTime: string
}
type State = {}

export default class Charging extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cycle}>
                    <Image source={require('../assets/images/cycle.png')}
                        style={{
                            resizeMode: 'contain',
                            aspectRatio: 1.5, flex: 1
                        }}
                    />
                </View>
                <View style={styles.charge}>
                    <ChargingTile
                        icon={require("../assets/icons/charge_status.png")}
                        metric={this.props.charge}
                        unit={"%"}
                        helpText={`Battery Status: ${this.props.chargingStatus}`}
                        textColor="#2ECC71"
                    />
                </View>

                <View style={styles.remainingTime}>
                    <ChargingTile
                        icon={require("../assets/icons/charge_time_large.png")}
                        metric={this.props.remainingTime}
                        unit={"(10 pm)"}
                        helpText={`Remaining Time to full charge`}
                        textColor="black"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: moderateScale(15),
        backgroundColor: '#F0F0F0'
    },
    cycle: {
        height: moderateScale(265),
        justifyContent: 'center',
        alignItems: 'center',
    },
    charge: {
        height: moderateScale(157),
        marginTop: moderateScale(13)
    },
    remainingTime: {
        height: moderateScale(157),
        marginTop: moderateScale(20)
    }
})  