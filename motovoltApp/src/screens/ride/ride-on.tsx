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

type ReduxState = {
  bike: TStore['bike'];
  ride: TStore['ride'];
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

class RideOn extends React.PureComponent<Props, {}> {
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
            fillDeg={60}
            speed={this.props.ride.speedKmph}
            time={this.props.ride.durationSec.toString()}
            totalDistanceKm={this.props.ride.totalDistanceKm}
          />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Card
              title={'Avg. Speed'}
              value={this.props.ride.avgSpeedKmph.toString()}
              unit={'Kmph'}
            />
            <Card
              title={'Max Speed'}
              value={this.props.ride.maxSpeedKmph.toString()}
              unit={'Kmph'}
            />
          </View>
          <View style={styles.rideStat}>
            <View
              style={{
                ...styles.flexAlignHorizontalCentre,
                justifyContent: 'space-evenly',
              }}>
              <Text style={{...styles.modeText, color: Colors.WARNING_RED}}>Power Mode</Text>
              <Text style={styles.modeText}>Pedal Assist</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      bike: store['bike'],
      ride: store['ride'],
    };
  },
)(RideOn);
