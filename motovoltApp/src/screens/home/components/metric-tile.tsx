import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { scale, verticalScale } from '../../../styles/size-matters';
import Colors from '../../../styles/colors';
import FontWeight from '../../../styles/font-weight';
import { ThemeContext } from '../../../styles/theme/theme-context';

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
    fontSize: scale(36),
  },
  unit: {
    fontSize: scale(20),
  },
  body: {
    padding: scale(2),
    alignItems: 'center',
  },
  bodyText: {
    fontSize: scale(12),
    opacity: 0.75,
  },
});

type MetricTypeProps = {
  value: string;
  unit: string;
  descriptionLine1: string;
  descriptionLine2: string;
};

export default class MetricTile extends React.PureComponent<MetricTypeProps, {}> {
  render() {
    let props = this.props
    let Theme = this.context.theme; //load theme from context
    return (
      <View style={{
        ...styles.tile, backgroundColor: Theme.BACKGROUND_LIGHT,//change dark theme
      }}>
        <View style={{ ...styles.heading, backgroundColor: Theme.BACKGROUND_LIGHT }}>
          <Text numberOfLines={1}>
            <Text style={{
              ...styles.metric, color: Theme.TEXT_WHITE//change dark theme
            }}>{Math.floor(Number(props.value))}</Text>
            <Text style={{
              ...styles.unit, color: Theme.TEXT_WHITE//change dark theme
            }}> {props.unit}</Text>
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={{
            ...styles.bodyText, color: Theme.TEXT_WHITE//change dark theme
          }}>{props.descriptionLine1}</Text>
          <Text style={{
            ...styles.bodyText, color: Theme.TEXT_WHITE//change dark theme
          }} numberOfLines={1}>
            {props.descriptionLine2}
          </Text>
        </View>
      </View>
    );
  }
}

MetricTile.contextType = ThemeContext