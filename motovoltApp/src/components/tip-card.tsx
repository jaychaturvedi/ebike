import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'

type Props = {
    header: string,
    tip: string
}
type State = {}

export default class TipCard extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolTip}>
                    <Image source={require('../assets/icons/tool_tip_icon.png')} />
                </View>
                <View style={styles.tip}>
                    <View style={styles.tipHeader}>
                        <Text style={{ fontWeight: 'bold', fontSize: scale(14) }}>
                            {this.props.header}
                        </Text>
                    </View>
                    <View style={styles.tipContent}>
                        <Text numberOfLines={3}>
                            {this.props.tip}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        borderRadius: moderateScale(10),
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: moderateScale(10)
    },
    toolTip: {
        width: '10%',
        alignItems: 'center'
    },
    tip: {
        width: '90%',
        marginLeft: moderateScale(10)
    },
    tipHeader: {
        height: '20%',
    },
    tipContent: {
        height: '80%',
        marginTop: moderateScale(10)
    }
})