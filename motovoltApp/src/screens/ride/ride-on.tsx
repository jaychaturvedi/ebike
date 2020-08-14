import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../home/components/card';
import Metrics from '../home/components/metrics';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Guage from '../home/components/guage';
import Colors from '../../styles/colors';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
const objectid = require("react-native-bson/lib/bson/objectid");
import { Dispatch } from 'redux';
import { StartRide, EndRide, Speedometer } from '../../service/redux/actions/saga';


type ReduxState = {
  bike: TStore['bike'];
  ride: TStore['ride'];
  speedometer: TStore['speedometer'],
  startRide: (params: StartRide) => void,
  endRide: (params: EndRide) => void,
  getSpeedometerData: (params: Speedometer) => void,
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

interface Props extends ReduxState { }

interface State {
  rideId: string,
  hour: number,
  minutes: number,
  seconds: number,
  interval: any
}

class RideOn extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      rideId: '',
      hour: 0,
      minutes: 0,
      seconds: 0,
      interval: null
    }
  }

  startTimer() {
    this.setState({
      interval: setInterval(() => {
        if (this.state.seconds !== 59) {
          if (this.state.seconds % 10 === 0 && this.state.seconds != 0) {
            this.props.getSpeedometerData({
              type: 'Speedometer',
              payload: {
                rideId: this.state.rideId
              }
            })
          }
          this.setState({
            seconds: this.state.seconds + 1
          });
        } else if (this.state.minutes !== 59) {
          this.setState({
            seconds: 0,
            minutes: this.state.minutes + 1
          });
        } else {
          this.setState({
            seconds: 0,
            minutes: 0,
            hour: this.state.hour + 1
          });
        }
      }, 1000)
    });
  }

  stopTimer() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    console.log("Ride on")
    const rideId = new objectid().toHexString()
    console.log(rideId);
    this.setState({ rideId });
    this.props.startRide({
      type: 'StartRide',
      payload: {
        rideId: rideId,
        bikeId: this.props.bike.id,
        startDate: new Date().toISOString()
      }
    })
    this.startTimer()
  }

  componentWillUnmount() {
    console.log("Ride off")
    this.stopTimer()
    this.props.endRide({
      type: 'EndRide',
      payload: {
        rideId: this.state.rideId,
        bikeId: this.props.bike.id,
        endDate: new Date().toISOString()
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={Colors.WHITE}
          title={`Bike ${this.props.bike.isOn ? 'ON' : 'OFF'}`}
          hasTabs
        />
        <View style={styles.flexAlignHorizontalCentre}>
          <View style={styles.flexVerticalCentre}>
            <Metrics
              batteryCharge={this.props.bike.batteryChargePer.toString()}
              rangeAvailable={this.props.bike.rangeAvailableKm.toString()}
              rangeCovered={this.props.bike.rangeCoveredKm.toString()}
            />
          </View>
          <Guage
            fillDeg={(this.props.speedometer.speed * 240) / 360}
            speed={this.props.speedometer.speed}
            time={`${this.state.hour < 10 ? "0" + this.state.hour : this.state.hour}:` +
              `${this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes}:` +
              `${this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds}`}
            totalDistanceKm={this.props.speedometer.distance}
          />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Card
              title={'Avg. Speed'}
              value={this.props.speedometer.averageSpeed.toString()}
              unit={'Kmph'}
            />
            <Card
              title={'Max Speed'}
              value={this.props.speedometer.maxSpeed.toString()}
              unit={'Kmph'}
            />
          </View>
          <View style={styles.rideStat}>
            <View
              style={{
                ...styles.flexAlignHorizontalCentre,
                justifyContent: 'space-evenly',
              }}>
              <Text style={{ ...styles.modeText, color: Colors.WARNING_RED }}>Power Mode</Text>
              <Text style={styles.modeText}>Pedal Assist</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

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
      startRide: (params: StartRide) => dispatch(params),
      endRide: (params: EndRide) => dispatch(params),
      getSpeedometerData: (params: Speedometer) => dispatch(params),
    };
  },

)(RideOn);
