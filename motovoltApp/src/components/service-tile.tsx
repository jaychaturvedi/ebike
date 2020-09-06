import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Colors from '../styles/colors'
import LanguageSelector from '../translations';

type Props = {
    title: string,
    time: string,
    serviceId: string,
    onView: () => void
}
type State = {}

export default class ServiceTile extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{ fontSize: moderateScale(16), fontWeight: '600' }}>{this.props.title}</Text>
                    <Text style={{ fontSize: moderateScale(14), color: Colors.LINK_BLUE, textDecorationLine: 'underline' }}
                        onPress={() => this.props.onView()}
                    >{LanguageSelector.t("support.view")}</Text>
                </View>
                <View style={{ flex: 1, paddingTop: moderateScale(10) }}>
                    <Text style={{
                        color: '#333333', fontSize: moderateScale(14)
                    }}>{LanguageSelector.t("support.serviceId")}: <Text style={{
                        color: '#000000', fontSize: moderateScale(14), fontWeight: '600'
                    }} >{this.props.serviceId}</Text></Text>
                    <Text style={{ color: '#333333', fontSize: moderateScale(12) }}>{this.props.time}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        margin: moderateScale(10),
        borderRadius: moderateScale(10),
        padding: moderateScale(20)
    },
    title: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})