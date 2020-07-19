import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { scale, verticalScale } from '../../../styles/size-matters';
import Colors from '../../../styles/colors';
import FontWeight from '../../../styles/font-weight';

const styles = StyleSheet.create({
  tile: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
  },
  metric: {
    fontWeight: FontWeight.BOLD,
    fontSize: 36,
  },
  unit: {
    fontSize: 20,
    fontWeight: '200',
  },
  body: {
    padding: scale(2),
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 12,
    opacity: 0.75,
  },
});

type MetricTypeProps = {
  value: string;
  unit: string;
  descriptionLine1: string;
  descriptionLine2: string;
};

export default function MetricTile(props: MetricTypeProps) {
  return (
    <View style={styles.tile}>
      <View style={styles.heading}>
        <Text>
          <Text style={styles.metric}>{props.value}</Text>
          <Text style={styles.unit}> {props.unit}</Text>
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>{props.descriptionLine1}</Text>
        <Text style={styles.bodyText} numberOfLines={1}>
          {props.descriptionLine2}
        </Text>
      </View>
    </View>
  );
}
