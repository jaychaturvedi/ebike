import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {Footer} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import ChargingStatusBG from '../assets/svg/charging-status-bg';
import ChargingStatusCharging from '../assets/svg/charging-status-charging';
import ChargingStatusCharged from '../assets/svg/charging-status-charged';
import CloseCharging from '../assets/svg/close-charging';
import ChargingTime from '../assets/svg/charging_time';
import {scale, verticalScale} from '../styles/size-matters';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

type ChargingProps = {
  chargePercentage: number;
  chargeCycle: number;
  kms: number;
  timeRemaining: string;
  charging: boolean;
  charged: boolean;
  onClose: () => void;
};

export default function Charging(props: ChargingProps) {
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AnimatedCircularProgress
            size={scale(316)}
            width={scale(9)}
            fill={360}
            arcSweepAngle={360}
            rotation={360}
            tintColor="rgba(196, 196, 196, 0.1)"
            lineCap="round">
            {(fill) => {
              return (
                <AnimatedCircularProgress
                  size={scale(298)}
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
                          height: scale(274),
                          width: scale(274),
                          borderRadius: scale(274) / 2,
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
                              width: '33%',
                            }}>
                            <Text style={{color: 'white', fontSize: 58}}>
                              {props.chargePercentage}
                            </Text>
                            <Text style={{color: 'white', fontSize: 24}}>
                              %
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '33%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {props.charging ? (
                              <ChargingStatusCharging />
                            ) : (
                              <ChargingStatusCharged />
                            )}
                          </View>
                          <View
                            style={{
                              width: '33%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{color: 'white', fontSize: 58}}>
                              {props.kms}
                            </Text>
                            <Text style={{color: 'white', fontSize: 24}}>
                              kms
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: verticalScale(50),
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
                            style={{
                              fontSize: 13,
                              color: 'white',
                              marginTop: 3,
                            }}>
                            {props.chargeCycle}
                          </Text>
                        </View>
                      </LinearGradient>
                    );
                  }}
                </AnimatedCircularProgress>
              );
            }}
          </AnimatedCircularProgress>
          {props.charged && (
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
          )}
          {!props.charged && (
            <View
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
                {props.timeRemaining}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Footer>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: 90,
            height: 64,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CloseCharging />
        </View>
      </Footer>
    </View>
  );
}
