import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {ThemeContext} from '../styles/theme/theme-context';

type Props = {
  icon: any;
  feature: string;
  premium: boolean;
  badge?: React.ReactNode;
  onPress: () => void;
};

type State = {};

export default class Feature extends React.PureComponent<Props, State>{
    render() {
    let Theme = this.context.theme; //load theme
        return (
            <TouchableOpacity style={{
                ...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT //change dark theme
            }}
                onPress={this.props.onPress}
            >
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 8,
          }}>
          {this.props.badge}
        </View>
        <View style={styles.premium}>
                    {
                        this.props.premium ? <Image source={require("../assets/icons/premium_icon.png")} /> : null
                    }
                </View>
                <View style={styles.icon}>
                    <Image source={this.props.icon} />
                </View>
                <View style={styles.name}>
                    <Text numberOfLines={1} style={{ color: Theme.TEXT_WHITE }}>{this.props.feature}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

Feature.contextType = ThemeContext //load theme context

const styles = StyleSheet.create({
    container: {
        height: moderateScale(94),
        width: moderateScale(103),
        borderRadius: moderateScale(10),
        backgroundColor: 'white',
        marginBottom: moderateScale(20),
        position: 'relative',
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