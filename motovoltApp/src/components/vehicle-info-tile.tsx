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
                        <Text style={{ fontSize: 16, color: Theme.TEXT_WHITE }}>{this.props.headerText}</Text>
                    </View>
                    <ScrollView>
                        {
                            this.props.value.map((value: string, index: number) => {
                                return (
                                    <Text style={{
                                        color: Theme.TEXT_WHITE, fontWeight: 'bold',
                                        fontSize: 25, 
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
        width: "49%",
        padding: 16,
        borderRadius: scale(10),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowOpacity: 0.25,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 1},    
        elevation: 3  
    },
    icon: {
        width: moderateScale(20)
    },
    textarea: {
        // flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
    }
})