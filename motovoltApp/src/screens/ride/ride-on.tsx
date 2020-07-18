import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../home/components/card';
import Metrics from '../home/components/metrics';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Guage from '../home/components/guage';
import Colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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

export default class RideOn extends React.PureComponent<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor={'white'} title={'Bike ON'} />
        <View style={styles.flexAlignHorizontalCentre}>
          <View style={styles.flexVerticalCentre}>
            <Metrics
              batteryCharge="100"
              rangeAvailable="30"
              rangeCovered="10"
            />
          </View>
          <Guage
            fillDeg={90}
            speed={90.5}
            time={'00:05:12'}
            totalDistanceKm={1000}
          />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Card title={'Avg. Speed'} value={'14.5'} unit={'Kmph'} />
            <Card title={'Max Speed'} value={'24.5'} unit={'Kmph'} />
          </View>
          <View style={styles.rideStat}>
            <View
              style={{
                ...styles.flexAlignHorizontalCentre,
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.modeText}>Power Mode</Text>
              <Text style={styles.modeText}>Pedal Assist</Text>
            </View>
            <Footer
              lockOnlyVisible
              locked
              onItemSelect={() => {}}
              onLockClick={() => {}}
              selectedItem={'chart'}
            />
          </View>
        </View>
      </View>
    );
  }
}
