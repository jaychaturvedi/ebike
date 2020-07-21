import React from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'

export default () => {
    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#F0F0F0', position: 'absolute' }}>
            <View style={{ height: '45%', backgroundColor: '#FFC40F', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.triangle}>
                </View>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    triangle: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFC40F',
        borderLeftWidth: Dimensions.get('window').width,
        borderBottomWidth: 150,
        borderLeftColor: 'transparent',
        borderBottomColor: '#F0F0F0',
    },
})