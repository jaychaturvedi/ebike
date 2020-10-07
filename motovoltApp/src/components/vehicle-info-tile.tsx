import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'
import Colors from '../styles/colors'
import { ThemeContext } from '../styles/theme/theme-context';

type Props = {
    headerText: string,
    value: string[],
}
type State = {}

export default class VehicleInfoTile extends React.PureComponent<Props, State>{
    render() {
        let Theme = this.context.theme //load theme context
        return (
            <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT }}>
                <View style={styles.textarea}>
                    <View style={{ paddingBottom: moderateScale(5) }}>
                        <Text style={{ fontSize: scale(12), color: Theme.TEXT_WHITE }}>{this.props.headerText}</Text>
                    </View>
                    <ScrollView style={{ height: scale(70) }}>
                        {
                            this.props.value.map((value: string, index: number) => {
                                return (
                                    <Text style={{
                                        color: Theme.TEXT_WHITE, fontWeight: 'bold',
                                        fontSize: scale(16), textDecorationLine: 'underline',
                                    }} key={index} numberOfLines={1}>{value}
                                    </Text>
                                )
                            })

                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

VehicleInfoTile.contextType = ThemeContext

const styles = StyleSheet.create({
    container: {
        height: scale(100),
        width: scale(150),
        padding: moderateScale(10),
        borderRadius: scale(10),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {height: 4, width: 2},    
    },
    icon: {
        width: moderateScale(20)
    },
    textarea: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
    }
})