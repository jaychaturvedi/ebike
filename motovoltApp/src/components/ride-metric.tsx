import React from 'react'
import { StyleSheet, View } from 'react-native'
import RideMetricTile from './ride-metric-tile'
import { moderateScale } from 'react-native-size-matters'

type Props = {
    icon1: any,
    header1: string,
    value1: string,
    unit1: string,
    icon2: any,
    header2: string,
    value2: string,
    unit2: string
}
type State = {}

export default class RideMetric extends React.PureComponent<Props, State>{


    render() {
        return (
            <View style={styles.container}>
                <RideMetricTile
                    icon={this.props.icon1}
                    headerText={this.props.header1}
                    value={this.props.value1}
                    unit={this.props.unit1}
                />
                <RideMetricTile
                    icon={this.props.icon2}
                    headerText={this.props.header2}
                    value={this.props.value2}
                    unit={this.props.unit2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: moderateScale(15)
    },
});