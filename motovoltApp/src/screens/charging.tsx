import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChargingStatusBG from '../assets/svg/charging-status-bg';
import ChargingStatusCharging from '../assets/svg/charging-status-charging';
import ChargingStatusCharged from '../assets/svg/charging-status-charged';
import ChargingTime from '../assets/svg/charging_time';
import {scale, verticalScale} from '../styles/size-matters';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

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
        <AnimatedCircularProgress
          size={scale(340)}
          width={scale(9)}
          fill={360}
          arcSweepAngle={360}
          rotation={360}
          tintColor="rgba(196, 196, 196, 0.1)"
          lineCap="round">
          {(fill) => {
            return (
              <AnimatedCircularProgress
                size={scale(324)}
                width={scale(12)}
                backgroundWidth={scale(20)}
                fill={20}
                backgroundColor="rgba(0,0,0,0.1)"
                rotation={0}
                tintColor="#FFBB01"
                lineCap="round">
                {(fill) => {
                  return (
                    <LinearGradient
                      style={{
                        height: scale(300),
                        width: scale(300),
                        borderRadius: scale(300) / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      start={{x: 0.5, y: 0}}
                      end={{x: 0.5, y: 1}}
                      colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.05)']}>
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
                          <Text style={{color: 'white', fontSize: 24}}>
                            Kms
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 20,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#FFFFFF',
                            opacity: 0.6,
                          }}>
                          Charge Cycle
                        </Text>
                        <Text
                          style={{fontSize: 13, color: 'white', marginTop: 3}}>
                          425
                        </Text>
                      </View>
                    </LinearGradient>
                  );
                }}
              </AnimatedCircularProgress>
            );
          }}
        </AnimatedCircularProgress>
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
