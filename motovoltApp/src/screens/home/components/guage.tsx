import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Svg} from 'react-native-svg';
import {scale} from '../../../styles/size-matters';
import Marking from './markings';
import Colors from '../../../styles/colors';

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
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
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
          tintColor="#ff0000"
          backgroundColor={Colors.BG_GREY}
          lineCap="round"
          children={(fill) => {
            return (
              <View style={guageStyle.guageContainer}>
                <View style={guageStyle.centre}>
                  <Text style={guageStyle.key}>Time Elapsed</Text>
                  <Text style={guageStyle.value}>{this.props.time}</Text>
                </View>
                <View style={guageStyle.centre}>
                  <Text style={guageStyle.speed}>{this.props.speed}</Text>
                  <Text style={guageStyle.speedUnit}>Km/h</Text>
                </View>
                <View style={guageStyle.centre}>
                  <Text style={guageStyle.key}>Total Distance</Text>
                  <Text style={guageStyle.value}>
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
