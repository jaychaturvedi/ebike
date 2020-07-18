import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Colors from 'src/styles/colors'
import { Icon } from 'native-base'

type Props = {
    icon: any,
    feature: string,
    height: number,
    premium?: boolean,
    unit?: string,
    onPress: () => void
}
type State = {}

export default class Upgrade extends React.PureComponent<Props, State>{
    render() {
        return (
            <TouchableOpacity style={{ ...styles.container, height: this.props.height, }}
                onPress={this.props.onPress}
            >
                <View style={styles.premium}>
                    {
                        this.props.premium ? <Image source={require("../assets/icons/premium_icon.png")} /> : null
                    }
                </View>
                <View style={styles.icon}>
                    <Image source={this.props.icon} />
                </View>
                <View style={styles.helpText}>
                    <Text numberOfLines={1} style={{ fontSize: moderateScale(16) }}>{this.props.feature}</Text>
                    {
                        this.props.unit ?
                            <Text style={{ fontSize: moderateScale(12), color: '#6F6F6F' }}>
                                <Icon name="inr" type="FontAwesome" style={{ fontSize: moderateScale(12), color: '#6F6F6F' }} /> {this.props.unit} / month</Text>
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: moderateScale(163),
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(20)
    },
    premium: {
        height: '10%',
        paddingTop: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: moderateScale(10)
    },
    helpText: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
        paddingBottom: moderateScale(10)
    }
})