import React from 'react'
import { StyleSheet, View } from 'react-native'
import VehicleInfoTile from './vehicle-info-tile'
import { moderateScale } from 'react-native-size-matters'

type Props = {
    header1: string,
    value1: string[],
    header2: string,
    value2: string[],
}
type State = {}

export default class VehicleInfo extends React.PureComponent<Props, State>{

    render() {
        return (
            <View style={styles.container}>
                <VehicleInfoTile
                    headerText={this.props.header1}
                    value={this.props.value1}
                />
                <VehicleInfoTile
                    headerText={this.props.header2}
                    value={this.props.value2}
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