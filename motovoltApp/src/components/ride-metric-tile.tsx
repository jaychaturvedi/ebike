import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import { ThemeContext } from '../styles/theme/theme-context';


type Props = {
    icon: any,
    headerText?: string,
    value?: string,
    unit?: string
}
type State = {}

export default class RideMetricTile extends React.PureComponent<Props, State>{
    render() {
        let Theme = this.context.theme //load theme context
        return (
            <View style={{
                ...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT,//change dark theme
            }}>
                <View style={styles.icon}>
                    <Image source={this.props.icon} />
                </View>
                <View style={styles.textarea}>
                    <View style={{ paddingBottom: moderateScale(5) }}>
                        <Text style={{
                            fontSize: scale(12),
                            color: Theme.TEXT_WHITE, //change dark theme
                        }}>{this.props.headerText}</Text>
                    </View>
                    <View style={{}}>
                        <Text>
                            <Text style={{
                                color: Theme.TEXT_WHITE, //change dark theme
                                fontWeight: 'bold', fontSize: scale(16)
                            }}>{this.props.value}</Text>
                            <Text style={{
                                color: Theme.TEXT_WHITE, //change dark theme
                            }}>&nbsp;{this.props.unit}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

RideMetricTile.contextType = ThemeContext

const styles = StyleSheet.create({
    container: {
        height: scale(60),
        width: scale(150),
        padding: moderateScale(10),
        borderRadius: scale(10),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: {height: 4, width: 2},    
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