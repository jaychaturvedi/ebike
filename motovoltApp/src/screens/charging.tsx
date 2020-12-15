import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChargingStatusBG from '../assets/svg/charging-status-bg';
import ChargingStatusCharging from '../assets/svg/charging-status-charging';
import ChargingStatusCharged from '../assets/svg/charging-status-charged';
import ChargingTime from '../assets/svg/charging_time';
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
      <View
        style={{
          marginBottom: verticalScale(100),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          style={{
            height: scale(270),
            width: scale(270),
            borderRadius: scale(270) / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 58}}>74</Text>
              <Text style={{color: 'white', fontSize: 24}}>%</Text>
            </View>
            <View>
              <ChargingStatusCharging />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 58}}>21</Text>
              <Text style={{color: 'white', fontSize: 24}}>Kms</Text>
            </View>
          </View>
          <View
            style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 13, color: '#FFFFFF', opacity: 0.6}}>
              Charge Cycle
            </Text>
            <Text style={{fontSize: 13, color: 'white', marginTop: 3}}>
              425
            </Text>
          </View>
        </LinearGradient>
        <View style={{marginTop: 27}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 40,
              fontWeight: '400',
              lineHeight: 46,
            }}>
            Fully Charged!
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              opacity: 0.6,
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
            }}>
            You may disconnect the charger
          </Text>
        </View>
        {/* <View
          style={{
            marginTop: 27,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ChargingTime />
          <Text
            style={{
              marginLeft: 13,
              color: 'white',
              textAlign: 'center',
              fontSize: 40,
              fontWeight: '400',
              lineHeight: 46,
            }}>
            0:18:05
          </Text>
        </View> */}
      </View>
    </View>
  );
}
