import React from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { moderateScale, scale } from 'react-native-size-matters'

type Props = {}
type State = {}

export default class PropfileImage extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: moderateScale(72),
        width: moderateScale(72),
        borderRadius: moderateScale(72),
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
})