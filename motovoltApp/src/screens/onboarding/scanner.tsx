'use strict';

import React from 'react';
import {View, Dimensions, StatusBar, Platform} from 'react-native';
import {Icon} from 'native-base';
import BarcodeMask from 'react-native-barcode-mask';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {StyleSheet, Text} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RegistartionStackParamList} from '../../navigation/registration';
import {ValidateFrame} from '../../service/redux/actions/saga/bike-actions';
import {Store_UpdateBike} from '../../service/redux/actions/store';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

interface ReduxState {
  validateFrame: (params: ValidateFrame) => void;
  bike: TStore['bike'];
}

type ScannerSwiperNavigationProp = StackNavigationProp<
  RegistartionStackParamList,
  'Scanner'
>;

interface Props extends ReduxState {
  navigation: ScannerSwiperNavigationProp;
  route: RouteProp<RegistartionStackParamList, 'Scanner'>;
}

type State = {};

/**
 * Add permission for iso in ./ios/motovoltApp/info.plist
 *                for android ./android/app/build.gradle
 */

const overlayColor = '#434343'; // this gives us a black color with a 50% transparency

class ScanScreen extends React.PureComponent<Props, State> {
  onSuccess = (e: any) => {
    console.log('Scanned data', e.data);
    this.props.validateFrame({
      type: 'ValidateFrame',
      payload: {
        frameNumber: e.data,
      },
    });
  };

  render() {
    if (this.props.bike.id) {
      this.props.navigation.replace('FrameRegistered', {});
    }
    return (
      <View style={{height: '100%', backgroundColor: '#434343'}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#434343"
          translucent={true}
        />
        <View style={styles.backButton}>
          <Icon
            type="FontAwesome"
            name="arrow-circle-left"
            style={{color: 'white', fontSize: scale(35)}}
            onPress={() => this.props.navigation.goBack()}></Icon>
        </View>
        <View style={styles.topOverlay}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#F89308',
              fontWeight: 'bold',
            }}>
            Scan QR Code to register
          </Text>
        </View>

        <QRCodeScanner
          onRead={this.onSuccess}
          cameraStyle={{
            height: Dimensions.get('window').height,
            marginBottom: 0,
          }}
          showMarker
          reactivate
          reactivateTimeout={1000}
          /**
           * The below property needs to be removed when the issue @qr code scanner library is fixed
           * issue  @link : https://github.com/moaazsidat/react-native-qrcode-scanner/issues/270
           **/
          topViewStyle={{
            marginTop: -Dimensions.get('window').width,
            marginBottom: 0,
          }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View
                style={{
                  backgroundColor: overlayColor,
                  flex: 1,
                }}></View>
              <View style={{flexDirection: 'row'}}>
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
              <View style={{flex: 1, backgroundColor: overlayColor}}>
                <View style={styles.bottomOverlay}>
                  <Text style={{fontSize: scale(16), color: 'white'}}>
                    Point your camera at the QR Code
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 32,
    zIndex: 11,
    backgroundColor: overlayColor,
    height: '10%',
    marginBottom: 0,
    paddingLeft: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  rectangle: {
    height: verticalScale(200),
    width: '60%',
    backgroundColor: 'transparent',
  },
  topOverlay: {
    position: 'absolute',
    top: 64,
    zIndex: 10,
    width: '100%',
    height: '10%',
    backgroundColor: overlayColor,
    paddingTop: 20,
    alignItems: 'center',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftAndRightOverlay: {
    height: verticalScale(200),
    width: '20%',
    backgroundColor: overlayColor,
  },
});

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      validateFrame: (params: ValidateFrame) => dispatch(params),
    };
  },
)(ScanScreen);
