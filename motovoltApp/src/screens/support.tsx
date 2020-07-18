import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Tile from '../components/tile'
import { moderateScale } from 'react-native-size-matters'
import Colors from '../../src/styles/colors'

type Props = {}
type State = {}

export default class Upgrade extends React.PureComponent<Props, State>{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: moderateScale(16) }}>Help with issues</Text>
                    <Text style={{
                        fontSize: moderateScale(13), color: Colors.LINK_BLUE,
                        textDecorationLine: 'underline'
                    }}
                        onPress={() => console.log("View service")}
                    >View service</Text>
                </View>
                <View style={styles.support}>
                    <Tile
                        feature="Call us"
                        icon={require("../assets/icons/icons1.5x/call.png")}
                        onPress={() => console.log("Feature pressed")}
                        height={moderateScale(110)}
                    />
                    <Tile
                        feature="Video Call"
                        icon={require("../assets/icons/icons1.5x/video-call.png")}
                        onPress={() => console.log("Feature pressed")}
                        premium
                        height={moderateScale(110)}
                    />
                    <Tile
                        feature="Report an Issue"
                        icon={require("../assets/icons/icons1.5x/report-issue.png")}
                        onPress={() => console.log("Feature pressed")}
                        height={moderateScale(110)}
                    />
                    <Tile
                        feature="Book a Service"
                        icon={require("../assets/icons/icons1.5x/book-service.png")}
                        onPress={() => console.log("Feature pressed")}
                        height={moderateScale(110)}
                        premium
                    />
                    <Tile
                        feature="Chat with us"
                        icon={require("../assets/icons/icons1.5x/chat.png")}
                        onPress={() => console.log("Feature pressed")}
                        height={moderateScale(110)}
                        premium
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(20),
        height: '100%',
        backgroundColor: '#F0F0F0',
        justifyContent: 'space-between'
    },
    header: {
        height: moderateScale(20),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    support: {
        paddingVertical: moderateScale(20),
        flex: 1,
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})