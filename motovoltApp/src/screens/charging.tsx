import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChargingStatusBG from '../assets/svg/charging-status-bg';
import ChargingStatusCharging from '../assets/svg/charging-status-charging';
import ChargingStatusCharged from '../assets/svg/charging-status-charged';
import {scale, verticalScale} from '../styles/size-matters';

const {width, height} = Dimensions.get('window');

export default function Charging() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ChargingStatusBG
        style={{position: 'absolute'}}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      />
      <LinearGradient
        style={{
          height: scale(270),
          width: scale(270),
          borderRadius: scale(270) / 2,
          marginBottom: verticalScale(100),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}>
        <ChargingStatusCharging />
      </LinearGradient>
    </View>
  );
}
