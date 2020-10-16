import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Colors from 'src/styles/colors'
import { Icon } from 'native-base'
import { ThemeContext } from '../styles/theme/theme-context';

type Props = {
    icon: any,
    iconStyle?: any,
    feature: string,
    height: number,
    premium?: boolean,
    unit?: string,
    onPress: () => void
}
type State = {}

export default class Upgrade extends React.PureComponent<Props, State>{
    render() {
        let Theme = this.context.theme //load theme context
        return (
            <TouchableOpacity style={{ ...styles.container, height: this.props.height, backgroundColor: Theme.BACKGROUND_LIGHT }}
                onPress={this.props.onPress}
            >
                <View style={styles.premium}>
                    {
                        this.props.premium ? <Image source={require("../assets/icons/premium_icon.png")} /> : null
                    }
                </View>
                <View style={styles.icon}>
                    <Image source={this.props.icon} style={this.props.iconStyle} />
                </View>
                <View style={styles.helpText}>
                    <Text numberOfLines={1} style={{ fontSize: moderateScale(16), color: Theme.TEXT_WHITE }}>{this.props.feature}</Text>
                    {
                        this.props.unit ?
                            <Text style={{ fontSize: moderateScale(12), color: Theme.TEXT_WHITE }}>
                                <Icon name="inr" type="FontAwesome" style={{ fontSize: moderateScale(12), color: Theme.TEXT_WHITE }} /> {this.props.unit} / month</Text>
                            : null
                    }
                </View>
            </TouchableOpacity >
        )
    }
}

Upgrade.contextType = ThemeContext

const styles = StyleSheet.create({
    container: {
        width: '47%',
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(20),
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 1}, 
        elevation: 2     
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