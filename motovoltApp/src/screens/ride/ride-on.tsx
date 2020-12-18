import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../home/components/card';
import Metrics from '../home/components/metrics';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Guage from '../home/components/guage';
import Colors from '../../styles/colors';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
const objectid = require('react-native-bson/lib/bson/objectid');
import {Dispatch} from 'redux';
import {Store_ResetRide} from '../../service/redux/actions/store';
import {
  StartRide,
  EndRide,
  Speedometer,
} from '../../service/redux/actions/saga';
import LanguageSelector from '../../translations';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ThemeContext} from '../../styles/theme/theme-context';
import Moment from 'moment';

const MaxSpeed = 50;

type ReduxState = {
  bike: TStore['bike'];
  ride: TStore['ride'];
  speedometer: TStore['speedometer'];
  resetRide: (params: Store_ResetRide) => void;
  startRide: (params: StartRide) => void;
  endRide: (params: EndRide) => void;
  getSpeedometerData: (params: Speedometer) => void;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexAlignHorizontalCentre: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  flexVerticalCentre: {
    paddingTop: 10,
    paddingHorizontal: scale(20),
    flex: 1,
    justifyContent: 'center',
  },
  rideStat: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
  modeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BORDER_GREY,
  },
});

interface Props extends ReduxState {}

interface State {
  rideId: string;
  hour: number;
  minutes: number;
  seconds: number;
  interval: any;
}

function getMode(mode: number | null) {
  switch (mode) {
    case 1:
      return 'Pedal Assist';
    case 2:
      return 'Eco Mode';
    case 3:
      return 'Cruise Mode';
    case 4:
      return 'Power Mode';
    default:
      return '';
  }
}

class RideOn extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rideId: '',
      hour: 0,
      minutes: 0,
      seconds: 0,
      interval: null,
    };
  }

  startTimer() {
    this.setState({
      interval: setInterval(() => {
        if (this.state.seconds !== 59) {
          if (this.state.seconds % 10 === 0 && this.state.seconds != 0) {
            this.props.getSpeedometerData({
              type: 'Speedometer',
              payload: {
                rideId: this.state.rideId,
              },
            });
          }
          this.setState({
            seconds: this.state.seconds + 1,
          });
        } else if (this.state.minutes !== 59) {
          this.setState({
            seconds: 0,
            minutes: this.state.minutes + 1,
          });
        } else {
          this.setState({
            seconds: 0,
            minutes: 0,
            hour: this.state.hour + 1,
          });
        }
      }, 1000),
    });
  }

  stopTimer() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    console.log('Ride on');
    const rideId = new objectid().toHexString();
    console.log(rideId);
    this.setState({rideId});
    this.props.resetRide({
      type: 'Store_ResetRide',
      payload: {},
    });
    this.props.startRide({
      type: 'StartRide',
      payload: {
        rideId: rideId,
        bikeId: this.props.bike.id,
        startDate: Moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    });
    this.startTimer();
  }

  componentWillUnmount() {
    console.log('Ride off');
    this.stopTimer();
    // this.props.endRide({
    //   type: 'EndRide',
    //   payload: {
    //     rideId: this.state.rideId,
    //     bikeId: this.props.bike.id,
    //     endDate: Moment().format('YYYY-MM-DD HH:mm:ss'),
    //   },
    // });
  }

  render() {
    let Theme = this.context.theme; //load theme in class
    return (
      <View style={{...styles.container}}>
        <Header
          backgroundColor={Theme.WHITE} //change dark theme
          title={`${LanguageSelector.t('home.bike')} ${
            this.props.bike.isOn
              ? LanguageSelector.t('home.on')
              : LanguageSelector.t('home.off')
          }`}
          hasTabs
        />
        <View style={styles.flexAlignHorizontalCentre}>
          <View style={styles.flexVerticalCentre}>
            <Metrics
              hideShadow
              batteryCharge={Math.round(
                Number(this.props.speedometer.batteryChargePer),
              ).toString()}
              rangeAvailable={Math.round(
                Number(this.props.speedometer.rangeAvailable),
              ).toString()}
              rangeCovered={Math.round(
                Number(this.props.speedometer.rangeCovered),
              ).toString()}
            />
          </View>
          <Guage
            fillDeg={(100 / MaxSpeed ) * this.props.speedometer.speed}
            speed={Math.round(Number(this.props.speedometer.speed))}
            time={
              `${
                this.state.hour < 10 ? '0' + this.state.hour : this.state.hour
              }:` +
              `${
                this.state.minutes < 10
                  ? '0' + this.state.minutes
                  : this.state.minutes
              }:` +
              `${
                this.state.seconds < 10
                  ? '0' + this.state.seconds
                  : this.state.seconds
              }`
            }
            totalDistanceKm={Math.round(
              Number(this.props.speedometer.distance),
            )}
          />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Card
              title={LanguageSelector.t('speedometer.avgSpeed')}
              value={Math.round(
                Number(this.props.speedometer.averageSpeed),
              ).toString()}
              unit={'Kmph'}
            />
            <Card
              title={LanguageSelector.t('speedometer.maxSpeed')}
              value={Math.round(
                Number(this.props.speedometer.maxSpeed),
              ).toString()}
              unit={'Kmph'}
            />
          </View>
          <View style={styles.rideStat}>
            <View
              style={{
                ...styles.flexAlignHorizontalCentre,
                justifyContent: 'space-evenly',
              }}>
              <Text
                style={{
                  ...styles.modeText,
                  color:
                    this.props.speedometer.mode === 4
                      ? Colors.WARNING_RED
                      : Theme.BORDER_GREY,
                }}>
                {getMode(this.props.speedometer.mode)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

RideOn.contextType = ThemeContext; //load theme from theme context

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
      ride: store['ride'],
      speedometer: store['speedometer'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      resetRide: (params: Store_ResetRide) => dispatch(params),
      startRide: (params: StartRide) => dispatch(params),
      endRide: (params: EndRide) => dispatch(params),
      getSpeedometerData: (params: Speedometer) => dispatch(params),
    };
  },
)(RideOn);
