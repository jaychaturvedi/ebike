'use strict';

import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import BarcodeMask from 'react-native-barcode-mask';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

import {
    StyleSheet,
    Text,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { RegistrationStackParamList } from '../../navigation/registartion'

type IntroSwiperNavigationProp = StackNavigationProp<
    RegistrationStackParamList,
    'Scanner'
>;

type Props = {
    navigation: IntroSwiperNavigationProp,
    route: RouteProp<RegistrationStackParamList, 'Scanner'>
};

type State = {}

/**
 * Add permission for iso in ./ios/motovoltApp/info.plist
 *                for android ./android/app/build.gradle  
 */

const overlayColor = "#434343"; // this gives us a black color with a 50% transparency

export default class ScanScreen extends React.PureComponent<Props, State> {

    onSuccess = (e: any) => {
        console.log('Scanned data', e.data)
        this.props.navigation.navigate('FrameRegistered', {})
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                cameraStyle={{ height: Dimensions.get('window').height }}
                showMarker
                reactivate
                reactivateTimeout={1000}
                /**
                 * The below property needs to be removed when the issue @qr code scanner library is fixed
                 * issue  @link : https://github.com/moaazsidat/react-native-qrcode-scanner/issues/270
                 **/
                topViewStyle={{ marginTop: -Dimensions.get('window').width - moderateScale(1) }}
                customMarker={
                    <View style={styles.rectangleContainer}>
                        <View style={styles.backButton}>
                            <Icon type="FontAwesome" name="arrow-circle-left" style={{ color: 'white', fontSize: scale(35) }}
                                onPress={() => this.props.navigation.goBack()}></Icon>
                        </View>
                        <View style={styles.topOverlay}>
                            <Text style={{ fontSize: scale(16), color: "#F89308", fontWeight: 'bold' }}>
                                Scan QR Code to register
                        </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.leftAndRightOverlay} />
                            <View style={styles.rectangle}>
                                <BarcodeMask
                                    showAnimatedLine={false}
                                    width={'100%'}
                                    height={verticalScale(200)}
                                    edgeHeight={verticalScale(30)}
                                    edgeWidth={scale(30)}
                                />
                            </View>
                            <View style={styles.leftAndRightOverlay} />
                        </View>
                        <View style={styles.bottomOverlay}>
                            <Text style={{ fontSize: scale(16), color: "white" }}>
                                Point your camera at the QR Code
                      </Text>
                        </View>
                    </View>
                }
            />
        );
    }
}


const styles = StyleSheet.create({
    rectangleContainer: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
    },
    backButton: {
        backgroundColor: overlayColor,
        width: '100%',
        marginBottom: 0,
        paddingLeft: moderateScale(30),
        paddingTop: moderateScale(30)
    },
    rectangle: {
        height: verticalScale(200),
        width: '60%',
        backgroundColor: "transparent"
    },
    topOverlay: {
        width: '100%',
        height: '20%',
        backgroundColor: overlayColor,
        paddingTop: 20,
        alignItems: "center"
    },
    bottomOverlay: {
        flex: 1,
        backgroundColor: overlayColor,
        paddingTop: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
    leftAndRightOverlay: {
        height: verticalScale(200),
        width: '20%',
        backgroundColor: overlayColor
    },
});