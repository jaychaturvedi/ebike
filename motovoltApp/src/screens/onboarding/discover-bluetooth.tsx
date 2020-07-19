import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding'

type DiscoverNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Discovering'
>;

type Props = {
  navigation: DiscoverNavigationProp,
  route: RouteProp<OnboardingStackParamList, 'Discovering'>
};

type State = {
  intervalId: number;
  circleCount: number;
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  text: {
    fontSize: 14,
    marginTop: verticalScale(24),
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class DiscoveringBluetooth extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      intervalId: 0,
      circleCount: 0,
    };
  }

  timer = () => {
    this.setState({ circleCount: (this.state.circleCount + 1) % 4 });
  };

  componentDidMount() {
    var intervalId = setInterval(this.timer, 500);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    setTimeout(() => this.props.navigation.navigate('BluetoothDevices', {}), 3000)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CTAHeader
            hasBackButton
            title={'Bluetooth Pairing'}
            onBackClick={() => this.props.navigation.goBack()}
          />
        </View>
        <View
          style={{
            borderColor: 'rgba(240, 240, 240, 1)',
            borderRadius: 150,
            width: 300,
            height: 300,
            borderWidth: this.state.circleCount >= 3 ? 1 : 0,
            ...styles.circle,
          }}>
          <View
            style={{
              borderColor: 'rgba(204, 204, 204, 1)',
              borderRadius: 100,
              width: 200,
              height: 200,
              borderWidth: this.state.circleCount >= 2 ? 1 : 0,
              ...styles.circle,
            }}>
            <View
              style={{
                borderColor: 'rgba(100, 100, 100, 1)',
                borderRadius: 50,
                width: 100,
                height: 100,
                borderWidth: this.state.circleCount >= 1 ? 1 : 0,
                ...styles.circle,
              }}>
              <Image
                source={require('../../assets/images/bluetooth_pairing.png')}
              />
            </View>
          </View>
        </View>
        <Text style={styles.text}>Searching for devices . . .</Text>
      </View>
    );
  }
}
