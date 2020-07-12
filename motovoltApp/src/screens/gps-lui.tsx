import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Header, Left, Text, Footer, FooterTab, Button, Icon } from 'native-base'
import { scale, moderateScale } from 'react-native-size-matters'


type Props = {}
type State = {}

export default class GPSLui extends React.PureComponent<Props, State>{
    render() {
        return (
            < >
                <Header androidStatusBarColor="#f8c346"
                    style={{ backgroundColor: '#f8c346' }}
                    noShadow
                    hasTabs>
                    <Left><Text style={{ fontSize: scale(20) }}>
                        <Icon type="FontAwesome" name="chevron-left" style={{ fontSize: scale(14) }}></Icon>&nbsp;&nbsp;GPS</Text></Left>
                </Header>
                <View style={styles.container}>
                    <View style={styles.mapView}>

                    </View>
                    <View style={styles.footerView}>
                        <View style={styles.footerDescription}>
                            <View style={{ width: '20%' }}>
                                {/* Marker Image */}
                                <View style={styles.markerImage}>
                                    <Image source={require('../assets/icons/location_pin.png')}></Image>
                                </View>
                            </View>
                            <View style={{ width: '60%' }}>
                                {/* description */}
                                <Text style={{ fontSize: moderateScale(16), }}>Final Position</Text>
                                <Text style={{ fontSize: moderateScale(12), lineHeight: moderateScale(30) }}>04:21pm 20-04-20</Text>
                                <Text></Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                {/* Refresh */}
                                <TouchableOpacity onPress={() => console.log("Reresh pressed")}>
                                    <Image source={require('../assets/icons/refresh_icon.png')} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: moderateScale(12) }}>Refresh</Text>
                            </View>
                        </View>
                        <View style={styles.footerAddress}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: scale(12) }}>Unnamed road, HSR Layout</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: scale(12) }}>5 min ago</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Footer>
                    {/* Footer goes here. This is just a placeholder for now */}

                    <FooterTab>
                        <Button><Icon type="FontAwesome" name="lock"></Icon></Button>
                    </FooterTab>
                </Footer>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapView: {
        height: '80%',
        backgroundColor: 'red'
    },
    footerView: {
        height: '20%',
        padding: moderateScale(20),
        backgroundColor: '#FFFFFF',
    },
    markerImage: {
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center', height: moderateScale(48),
        width: moderateScale(48), borderRadius: moderateScale(24)
    },
    footerDescription: {
        height: '70%',
        flexDirection: 'row'
    },
    footerAddress: {
        height: '30%',
        flexDirection: 'row',
        paddingTop: moderateScale(10),
        flex: 1
    }
})