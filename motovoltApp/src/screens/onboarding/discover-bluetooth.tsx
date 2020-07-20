import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import CTAHeader from './components/header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';
import {TStore} from '../../service/redux/store';
import {TurnOnBLE, ScanBLEDevices} from '../../service/redux/actions/ble';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

type ReduxState = {
  enableBluetooth: (params: TurnOnBLE) => void;
  scanDevices: (params: ScanBLEDevices) => void;
  ble: TStore['ble'];
};

type DiscoverNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Discovering'
>;

interface Props extends ReduxState {
  navigation: DiscoverNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'Discovering'>;
}

type State = {
  bleScanRequested: boolean;
  bleScanning: boolean;
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

class DiscoveringBluetooth extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bleScanRequested: false,
      bleScanning: false,
      intervalId: 0,
      circleCount: 0,
    };
  }

  timer = () => {
    this.setState({circleCount: (this.state.circleCount + 1) % 4});
  };

  componentDidMount() {
    this.props.enableBluetooth({
      type: 'TurnOnBLE',
      payload: {},
    });
    const intervalId = setInterval(this.timer, 500);
    this.setState({intervalId});
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.ble.state == "on" && !state.bleScanRequested) {
      props.scanDevices({
        type: 'ScanBLEDevices',
        payload: {},
      });
      state.bleScanRequested = true;
    }
    if (props.ble.scanning) {
      state.bleScanning = true;
    }
    return state;
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    if (this.state.bleScanning && !this.props.ble.scanning) {
      this.props.navigation.navigate('BluetoothDevices', {});
    }
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

export default connect(
  (store: TStore) => {
    return {
      ble: store['ble'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      enableBluetooth: (params: TurnOnBLE) => dispatch(params),
      scanDevices: (params: ScanBLEDevices) => dispatch(params),
    };
  },
)(DiscoveringBluetooth);
