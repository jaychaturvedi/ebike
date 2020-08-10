import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { scale, verticalScale, moderateScale } from '../../../styles/size-matters';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  tile: {
    width: moderateScale(100),
    height: moderateScale(92),
    borderRadius: scale(10),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  heading: {
    paddingBottom: verticalScale(5),
    display: 'flex',
    alignItems: 'center',
  },
  metric: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  unit: {
    fontSize: 12,
  },
  body: {
    padding: verticalScale(2),
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 12,
  },
});

type MetricTypeProps = {
  icon: React.ReactNode;
  value: string;
  unit: string;
  descriptionLine1: string;
};

export default function MetricTile(props: MetricTypeProps) {
  return (
    <View style={styles.tile}>
      <View style={styles.heading}>{props.icon}</View>
      <View style={styles.body}>
        <View style={styles.heading}>
          <Text>
            <Text style={styles.metric}>{props.value}</Text>
            <Text style={styles.unit}> {props.unit}</Text>
          </Text>
        </View>
        <Text style={styles.bodyText} numberOfLines={1}>
          {props.descriptionLine1}
        </Text>
      </View>
    </View>
  );
}
