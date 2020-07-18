import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Tile from '../components/tile'
import { moderateScale } from 'react-native-size-matters'

type Props = {}
type State = {}

export default class Upgrade extends React.PureComponent<Props, State>{
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                <Tile
                    feature="Find My Bike"
                    icon={require("../assets/icons/icons2x/cycle.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                    unit={"25"}
                />
                <Tile
                    feature="Theft Detection"
                    icon={require("../assets/icons/icons2x/theft.png")}
                    onPress={() => console.log("Feature pressed")}
                    unit={"75"}
                    height={moderateScale(157)}
                />
                <Tile
                    feature="Geo Fencing"
                    icon={require("../assets/icons/icons2x/geo-fencing.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                    unit={"50"}
                />
                <Tile
                    feature="Ride Statistics"
                    icon={require("../assets/icons/icons2x/ride-statistics.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                    unit={"50"}
                />
                <Tile
                    feature="Smart Inspection"
                    icon={require("../assets/icons/icons2x/smart-inspection.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                    unit={"35"}
                />
                <Tile
                    feature="Remote Lock"
                    icon={require("../assets/icons/icons2x/lock.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                    unit={"40"}
                />
                <Tile
                    feature="Battery Analytics"
                    icon={require("../assets/icons/icons2x/battery-analytics.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                    unit={"20"}
                />
                <Tile
                    feature="Online Store"
                    icon={require("../assets/icons/icons2x/online-store.png")}
                    onPress={() => console.log("Feature pressed")}
                    height={moderateScale(157)}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        backgroundColor: '#F0F0F0',

    }
})