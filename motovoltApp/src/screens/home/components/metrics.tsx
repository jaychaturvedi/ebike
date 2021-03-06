import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import MetricTile from './metric-tile';
import LanguageSelector from '../../../translations';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

type Props = {
  batteryCharge: string;
  rangeAvailable: string;
  rangeCovered: string;
  hideShadow?: boolean;
};

export default function Metrics(props: Props) {
  return (
    <View style={styles.container}>
      <MetricTile
        hideShadow={props.hideShadow}
        value={props.batteryCharge}
        unit={'%'}
        descriptionLine1={LanguageSelector.t('home.battery')}
        descriptionLine2={LanguageSelector.t('home.charge')}></MetricTile>
      <MetricTile
        hideShadow={props.hideShadow}
        value={props.rangeAvailable}
        unit={'Km'}
        descriptionLine1={LanguageSelector.t('home.range')}
        descriptionLine2={LanguageSelector.t('home.available')}></MetricTile>
      <MetricTile
        hideShadow={props.hideShadow}
        value={props.rangeCovered}
        unit={'Km'}
        descriptionLine1={LanguageSelector.t('home.range')}
        descriptionLine2={LanguageSelector.t('home.covered')}></MetricTile>
    </View>
  );
}
