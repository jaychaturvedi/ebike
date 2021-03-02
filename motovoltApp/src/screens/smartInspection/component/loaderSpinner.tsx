import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface Props {
  fill: number,
  size: number,
  width: number
}

type State = {
  fill: number
};

class InspectionProgress extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fill: 0
    };
  }

  render() {
    return (
      <View>
          <AnimatedCircularProgress
            size={this.props.size}
            width={this.props.width}
            fill={this.props.fill}
            style={{ marginVertical: 20 }}
            tintColor="#3C5BE8"
            backgroundColor="#DEDEDE"
            rotation={0}
            dashedBackground={{ width: 20, gap: 10 }}
            dashedTint={{ width: 20, gap: 10 }}
            lineCap="butt"
            tintTransparency={false}>
            {
              (fill) => (
                <Text style={{ fontSize: 30 }}>
                  {this.props.fill + "%"}
                </Text>
              )
            }
          </AnimatedCircularProgress>
      </View>
    );
  }
}

export default InspectionProgress

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
});