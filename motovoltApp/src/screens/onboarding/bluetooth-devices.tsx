import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RegistartionStackParamList} from '../../navigation/registration';
import {TStore} from '../../service/redux/store';
import {ConnectBLE} from '../../service/redux/actions/saga/ble';
import {Store_UpdateUser} from '../../service/redux/actions/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

type ReduxState = {
  connectBle: (id: ConnectBLE) => void;
  updateUser: (params: Store_UpdateUser) => void;
  ble: TStore['ble'];
};

type BluetoothDeviceNavigationProp = StackNavigationProp<
  RegistartionStackParamList,
  'BluetoothDevices'
>;

interface Props extends ReduxState {
  navigation: BluetoothDeviceNavigationProp;
  route: RouteProp<RegistartionStackParamList, 'BluetoothDevices'>;
}

export type Device = {
  deviceName: string;
  id: string;
};

type State = {
  selectedCycleId: string;
};

type CycleProps = {
  onSelect?: () => void;
  device: Device;
  selected?: boolean;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  body: {
    paddingVertical: verticalScale(16),
    width: '100%',
    paddingHorizontal: verticalScale(28),
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: verticalScale(32),
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  match: {
    marginVertical: verticalScale(16),
    fontWeight: 'normal',
    color: Colors.BORDER_GREY,
  },
});

const cycleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
  },
  img: {
    width: scale(102),
    height: verticalScale(72),
  },
  name: {
    paddingLeft: scale(20),
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function CycleDetected(props: CycleProps) {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View
        style={{
          ...{
            ...cycleStyles.container,
          },
          ...(props.selected
            ? {
                backgroundColor: 'grey',
              }
            : {}),
        }}>
        <Image
          source={require('../../assets/images/cycle.png')}
          style={cycleStyles.img}
        />
        <Text style={cycleStyles.name}>{props.device.deviceName}</Text>
      </View>
    </TouchableOpacity>
  );
}

class RegisterBike extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCycleId: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CTAHeader
          hasBackButton
          title="Bluetooth Pairing"
          onBackClick={() =>
            this.props.navigation.navigate('TurnOnBluetooth', {})
          }
        />
        <View style={styles.body}>
          <Text style={styles.title}>Bluetooth Devices</Text>
          <Text
            style={
              styles.match
            }>{`${this.props.ble.devices.length} match found`}</Text>
          <View>
            {this.props.ble.devices.map((device, index) => (
              <CycleDetected
                key={index.toString()}
                device={{
                  deviceName: device.name || device.id,
                  id: device.id,
                }}
                selected={this.state.selectedCycleId === device.id}
                onSelect={() => {
                  this.setState({selectedCycleId: device.id});
                }}
              />
            ))}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CTAButton
            onPress={() => {
              const device = this.props.ble.devices.find(
                (dev) => dev.id === this.state.selectedCycleId,
              );
              if (device) {
                this.props.connectBle({
                  type: 'ConnectBLE',
                  payload: {
                    id: device.id,
                  },
                });
                this.props.updateUser({
                  type: 'Store_UpdateUser',
                  payload: {
                    isBikeRegistered: true,
                  },
                });
              }
              // if (device && this.props.onConnect) this.props.onConnect(device);
            }}
            text={'Connect'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
          />
        </View>
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
      connectBle: (params: ConnectBLE) => dispatch(params),
      updateUser: (params: Store_UpdateUser) => dispatch(params),
    };
  },
)(RegisterBike);
