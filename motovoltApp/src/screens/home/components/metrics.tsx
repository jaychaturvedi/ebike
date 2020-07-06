import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import MetricTile from './metric-tile';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

type Props = {
  batteryCharge: string;
  rangeAvailable: string;
  rangeCovered: string;
};

export default function Metrics(props: Props) {
  return (
    <View style={styles.container}>
      <MetricTile
        value={props.batteryCharge}
        unit={'%'}
        descriptionLine1="Battery"
        descriptionLine2="Charge"></MetricTile>
      <MetricTile
        value={props.rangeAvailable}
        unit={'Km'}
        descriptionLine1="Range"
        descriptionLine2="Available"></MetricTile>
      <MetricTile
        value={props.rangeCovered}
        unit={'Km'}
        descriptionLine1="Range"
        descriptionLine2="Covered"></MetricTile>
    </View>
  );
}
