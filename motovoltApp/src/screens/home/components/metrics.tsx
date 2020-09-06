import React from 'react';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import MetricTile from './metric-tile';
import LanguageSelector from '../../../translations';

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
        descriptionLine1={LanguageSelector.t("home.battery")}
        descriptionLine2={LanguageSelector.t("home.charge")}></MetricTile>
      <MetricTile
        value={props.rangeAvailable}
        unit={'Km'}
        descriptionLine1={LanguageSelector.t("home.range")}
        descriptionLine2={LanguageSelector.t("home.available")}></MetricTile>
      <MetricTile
        value={props.rangeCovered}
        unit={'Km'}
        descriptionLine1={LanguageSelector.t("home.range")}
        descriptionLine2={LanguageSelector.t("home.covered")}></MetricTile>
    </View>
  );
}
