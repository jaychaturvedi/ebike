import React from 'react';
import {Footer} from 'native-base';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChargingStatusBG from '../assets/svg/charging-status-bg';
import ChargingStatusCharging from '../assets/svg/charging-status-charging';
import ChargingStatusCharged from '../assets/svg/charging-status-charged';
import CloseCharging from '../assets/svg/close-charging';
import ChargingTime from '../assets/svg/charging_time';
import {scale, verticalScale} from '../styles/size-matters';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Moment from 'moment';

const {width, height} = Dimensions.get('window');

type ChargingProps = {
  chargePercentage: number;
  chargeCycle: number;
  kms: number;
  timeRemainingMillis: number;
  onClose: () => void;
};

type ChargingState = {
  timeRemainingMillis: number;
  timer: number | null;
};

export default class Charging extends React.PureComponent<
  ChargingProps,
  ChargingState
> {
  constructor(props: ChargingProps) {
    super(props);
    this.state = {
      timeRemainingMillis: props.timeRemainingMillis,
      timer: null,
    };
  }

  startTimer() {
    const timer = setInterval(() => {
      console.log('Callin', this.state.timeRemainingMillis);
      if (this.state.timeRemainingMillis > 0)
        this.setState({
          timeRemainingMillis: this.state.timeRemainingMillis - 1000,
        });
    }, 1000);
    this.setState({timer: timer});
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    if (this.state.timer) clearInterval(this.state.timer);
  }

  render() {
    console.log('State', this.state);
    const props = this.props;
    return (
      <View
        style={{
          width: width,
          height: height,
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
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
                    fill={props.chargePercentage}
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
                            paddingHorizontal: 12,
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
                              <Text
                                style={{color: 'white', fontSize: scale(48)}}>
                                {props.chargePercentage}
                              </Text>
                              <Text
                                style={{color: 'white', fontSize: scale(20)}}>
                                %
                              </Text>
                            </View>
                            <View
                              style={{
                                width: '33%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              {props.chargePercentage !== 100 ? (
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
                              <Text
                                style={{color: 'white', fontSize: scale(48)}}>
                                {props.kms}
                              </Text>
                              <Text
                                style={{color: 'white', fontSize: scale(20)}}>
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
            {props.chargePercentage === 100 && (
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
            {props.chargePercentage !== 100 && (
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
                  {/* {
                    new Date(this.state.timeRemainingSecs)
                      .toTimeString()
                      .split(' ')[0]
                  } */}
                  {/* {formatTime(this.state.timeRemainingSecs/10)} */}
                  {/* {this.state.timeRemainingSecs} */}
                  {Moment.utc(this.state.timeRemainingMillis).format(
                    'HH:mm:ss',
                  )}
                </Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            width: 90,
            height: 64,
            bottom: 0,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          onPress={props.onClose}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CloseCharging style={{margin: 'auto'}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
