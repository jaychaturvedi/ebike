import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { scale, verticalScale, moderateScale } from '../../../styles/size-matters';
import Colors from '../../../styles/colors';
import { ThemeContext } from '../../../styles/theme/theme-context';

const styles = StyleSheet.create({
  tile: {
    width: "32%",
    height: moderateScale(92),
    borderRadius: scale(10),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE, //change dark theme
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 4, width: 2},
  },
  heading: {
    paddingBottom: verticalScale(5),
    display: 'flex',
    alignItems: 'center',
  },
  metric: {
    fontWeight: 'bold',
    fontSize: scale(16),
    color: Colors.TEXT_WHITE//change dark theme

  },
  unit: {
    fontSize: scale(12),
    color: Colors.TEXT_WHITE//change dark theme
  },
  body: {
    padding: verticalScale(2),
    alignItems: 'center',
  },
  bodyText: {
    fontSize: scale(12),
    color: Colors.TEXT_WHITE//change dark theme
  },
});

type MetricTypeProps = {
  icon: React.ReactNode;
  value: string;
  unit: string;
  descriptionLine1: string;
};
export default class MetricTile extends React.Component<MetricTypeProps, {}> {
  render() {
    let props = this.props
    let Theme = this.context.theme;
    return (
      <View style={{
        ...styles.tile, backgroundColor: Theme.WHITE, //change dark theme
      }}>
        <View style={styles.heading}>{props.icon}</View>
        <View style={styles.body}>
          <Text style={{
            ...styles.bodyText, color: Theme.TEXT_WHITE //change dark theme 
          }}
            numberOfLines={1}>
            {props.descriptionLine1}
          </Text>
          <View style={styles.heading}>
            <Text>
              <Text style={{
                ...styles.metric, color: Theme.TEXT_WHITE //change dark theme
              }}>{props.value}</Text>
              <Text style={{
                ...styles.unit, color: Theme.TEXT_WHITE //change dark theme
              }}> {props.unit}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
MetricTile.contextType = ThemeContext//attach theme context in class as this.context
