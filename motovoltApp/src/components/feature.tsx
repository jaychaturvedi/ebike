import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'

type Props = {
    icon: any,
    feature: string,
    premium: boolean,
    onPress: () => void
}


type State = {}

export default class Feature extends React.PureComponent<Props, State>{
    render() {
        return (
            <TouchableOpacity style={{ ...styles.container }}
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
                <View style={styles.name}>
                    <Text numberOfLines={1}>{this.props.feature}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: moderateScale(94),
        width: moderateScale(103),
        borderRadius: moderateScale(10),
        backgroundColor: 'white',
        marginBottom: moderateScale(20),
    },
    premium: {
        height: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: moderateScale(54),
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: moderateScale(2)
    },
    name: {
        height: moderateScale(18),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: moderateScale(2)
    }
})