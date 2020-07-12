import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'

type Props = {
    headerText: string,
    value: string[],
}
type State = {}

export default class VehicleInfoTile extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textarea}>
                    <View style={{ paddingBottom: moderateScale(5) }}>
                        <Text style={{ fontSize: scale(12) }}>{this.props.headerText}</Text>
                    </View>
                    <ScrollView style={{ height: scale(70) }}>
                        {
                            this.props.value.map((value: string, index: number) => {
                                return (
                                    <Text style={{
                                        color: '#000000', fontWeight: 'bold',
                                        fontSize: scale(16), textDecorationLine: 'underline',
                                    }} key={index}>{value}
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

const styles = StyleSheet.create({
    container: {
        height: scale(100),
        width: scale(150),
        padding: moderateScale(10),
        borderRadius: scale(10),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
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