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
                    <Image style={{width: 40, height: 40}} source={this.props.icon} />
                </View>
                <View style={styles.textarea}>
                    <View style={{ paddingBottom: moderateScale(5) }}>
                        <Text style={{
                            fontSize: 16,
                            color: Theme.TEXT_WHITE, //change dark theme
                        }}>{this.props.headerText}</Text>
                    </View>
                    <View style={{}}>
                        <Text numberOfLines={1}>
                            <Text style={{
                                color: Theme.TEXT_WHITE, //change dark theme
                                fontWeight: 'bold', fontSize: 24
                            }}>{this.props.value}</Text>
                            <Text style={{
                                fontSize: 18,
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
        // height: scale(60),
        width: "49%",
        padding: 16,
        borderRadius: scale(10),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 1},  
        elevation: 2    
    },
    icon: {
        width: moderateScale(20),
        justifyContent: 'center'
    },
    textarea: {
        flexDirection: 'column',
        justifyContent: "center",
        paddingLeft: moderateScale(25)
    }
})