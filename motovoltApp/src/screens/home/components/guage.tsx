import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Svg} from 'react-native-svg';
import {scale} from '../../../styles/size-matters';
import Marking from './markings';
import Colors from '../../../styles/colors';
import LanguageSelector from '../../../translations';
import {ThemeContext} from '../../../styles/theme/theme-context';

const Width = scale(300);

const guageStyle = StyleSheet.create({
  marking: {
    position: 'absolute',
    transform: [{rotateZ: '-120deg'}],
  },
  guageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: scale(20),
  },
  centre: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    fontSize: 14,
    color: Colors.BORDER_GREY,
  },
  value: {
    fontSize: 24,
    color: Colors.BLACK,
    fontWeight: '500',
  },
  speed: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  speedUnit: {
    fontSize: 16,
    color: Colors.BLACK,
  },
});

type Props = {
  time: string;
  speed: number;
  totalDistanceKm: number;
  fillDeg: number;
};

export default class Guage extends React.PureComponent<Props, {}> {
  render() {
    let Theme = this.context.theme; //load theme from context
    return (
      <View style={{width: '100%', alignItems: 'center', marginTop: 24}}>
        <Svg height={Width} width={Width} style={guageStyle.marking}>
          <Marking
            centerX={Width / 2}
            centerY={Width / 2}
            hours={9}
            minutes={40}
            radius={scale(130)}
          />
        </Svg>
        <AnimatedCircularProgress
          size={Width + 5}
          width={scale(15)}
          backgroundWidth={scale(15)}
          fill={this.props.fillDeg}
          arcSweepAngle={240}
          rotation={240}
          tintColor="#6d83a6"
          backgroundColor={Colors.BG_GREY}
          lineCap="round"
          children={(fill) => {
            return (
              <View style={guageStyle.guageContainer}>
                <View style={guageStyle.centre}>
                  <Text style={{...guageStyle.key, color: Theme.BORDER_GREY}}>
                    {LanguageSelector.t('speedometer.timeElapsed')}
                  </Text>
                  <Text style={{...guageStyle.value, color: Theme.TEXT_WHITE}}>
                    {this.props.time}
                  </Text>
                </View>
                <View style={guageStyle.centre}>
                  <Text style={{...guageStyle.speed, color: Theme.TEXT_WHITE}}>
                    {this.props.speed}
                  </Text>
                  <Text
                    style={{...guageStyle.speedUnit, color: Theme.TEXT_WHITE}}>
                    Km/h
                  </Text>
                </View>
                <View style={guageStyle.centre}>
                  <Text style={{...guageStyle.key, color: Theme.BORDER_GREY}}>
                    {LanguageSelector.t('speedometer.totalDistance')}
                  </Text>
                  <Text style={{...guageStyle.value, color: Theme.TEXT_WHITE}}>
                    {this.props.totalDistanceKm} Km
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

Guage.contextType = ThemeContext;
