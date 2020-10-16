import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

type Props = {
    icon: any,
    metric: string,
    unit: string,
    textColor: string,
    helpText: string
}

type State = {}

export default class ChargingTile extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image source={this.props.icon} />
                </View>
                <View style={styles.status}>
                    <Text>
                        <Text style={{
                            fontSize: moderateScale(36), color: this.props.textColor,
                            textAlign: 'center', fontWeight: 'bold'
                        }}>{this.props.metric}</Text>
                        <Text style={{
                            fontSize: moderateScale(20),
                            color: this.props.textColor, textAlign: 'center'
                        }}>&nbsp;{this.props.unit}</Text>
                    </Text>
                </View>
                <View style={styles.helpText}>
                    <Text style={{ fontSize: moderateScale(12), textAlign: 'center' }}>{this.props.helpText}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: moderateScale(15),
        backgroundColor: 'white',
        borderRadius: moderateScale(15)
    },
    icon: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    helpText: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})