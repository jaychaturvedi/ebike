import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'

type Props = {
    icon: any,
    headerText?: string,
    value?: string,
    unit?: string
}
type State = {}

export default class RideMetricTile extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image source={this.props.icon} />
                </View>
                <View style={styles.textarea}>
                    <View style={{ paddingBottom: moderateScale(5) }}>
                        <Text style={{ fontSize: scale(12) }}>{this.props.headerText}</Text>
                    </View>
                    <View style={{}}>
                        <Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: scale(16) }}>{this.props.value}</Text>
                            <Text>&nbsp;{this.props.unit}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: scale(60),
        width: scale(150),
        padding: moderateScale(10),
        borderRadius: scale(10),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
    },
    icon: {
        width: moderateScale(20),
        justifyContent: 'center'
    },
    textarea: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: moderateScale(25)
    }
})