import React from 'react';
import {
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  FlatList,
  Button,
} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';

type BLEState = 'on' | 'off' | 'turning_on' | 'turning_off';

type PeripheralDisconnected = {peripheral: string; status: 0};

type Props = {};

type State = {
  scanning: boolean;
  bleState: BLEState;
  blePermission: boolean;
  peripherals: {[id: string]: Peripheral};
  peripheralConnected: boolean;
  connectedPeripheralId: string;
};

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ServiceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const CharecteristicId = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

const MaxMTU = 512;

export default class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      peripherals: {},
      scanning: false,
      bleState: 'off',
      blePermission: false,
      peripheralConnected: false,
      connectedPeripheralId: '',
    };
  }

  unsubscribeListeners = () => {};

  requestPermissionIfNot = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then((result) => {
        if (result) {
          this.setState({blePermission: true});
          console.log('Ble Permission Already Granted');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then((result) => {
            if (result) {
              this.setState({blePermission: true});
              console.log('Ble Permission Granted');
            } else {
              this.setState({blePermission: false});
              console.log('Ble Permission Rejected');
            }
          });
        }
      });
    }
  };

  componentDidMount() {
    BleManager.enableBluetooth();
    /** Starting BLE Manager*/
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('Ble manager started');
      })
      .catch((err) => console.log(err));

    /** On Stop Scan */
    const onStopScan = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.onStopScan,
    );

    /** On BLE State change*/
    const onStateChange = bleManagerEmitter.addListener(
      'BleManagerDidUpdateState',
      this.onStateChange,
    );

    /** On Peripheral Disconnected */
    const onDisconnectPeripheral = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.onDisconnectPeripheral,
    );

    const onUpdateValueForCharacteristic = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.onUpdateValueForCharacteristic,
    );

    this.unsubscribeListeners = () => {
      onStopScan.remove();
      onStateChange.remove();
      onDisconnectPeripheral.remove();
      onUpdateValueForCharacteristic.remove();
    };

    /**Trigger State check */
    BleManager.checkState();

    /** Request BLE Permission */
    this.requestPermissionIfNot();
  }

  componentWillUnmount() {
    this.unsubscribeListeners();
  }

  onStartScan = () => {
    if (!this.state.scanning) {
      BleManager.scan([], 10, false).then((results) => {
        this.setState({scanning: true, peripherals: {}});
      });
    }
  };

  onStopScan = () => {
    BleManager.getDiscoveredPeripherals().then((ps) => {
      this.setState({
        scanning: false,
        peripherals: Object.assign({}, ...ps.map((p) => ({[p.id]: p}))),
      });
      console.log('Discovered', JSON.stringify(ps));
    });
  };

  onStateChange = (state: {state: BLEState}) => {
    this.setState({bleState: state.state});
  };

  onDisconnectPeripheral = (data: PeripheralDisconnected) => {
    console.log('Peripheral Disconnected', data);
    if (this.state.connectedPeripheralId === data.peripheral) {
      this.setState({peripheralConnected: false, connectedPeripheralId: ''});
    }
  };

  getPerpherals = () => {
    return Object.keys(this.state.peripherals).map(
      (id) => this.state.peripherals[id],
    );
  };

  connectPeripheral = (per: Peripheral) => {
    BleManager.connect(per.id)
      .then(async () => {
        console.log('Connected', per.name || per.id);
        const services = await BleManager.retrieveServices(per.id);
        console.log('Services', JSON.stringify(services));
        await BleManager.requestMTU(per.id, MaxMTU);
        await BleManager.startNotification(per.id, ServiceId, CharecteristicId);
        this.setState({
          peripheralConnected: true,
          connectedPeripheralId: per.id,
        });
      })
      .catch((err) => {
        console.log('Error connecting', err, per.name || per.id);
      });
  };

  disconnectPeripherals = () => {
    BleManager.getConnectedPeripherals([ServiceId]).then((peripherals) => {
      peripherals.forEach((peripheral) => {
        BleManager.disconnect(peripheral.id)
          .then(() => {
            this.setState({
              connectedPeripheralId: '',
              peripheralConnected: false,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };

  onUpdateValueForCharacteristic = (
    data: {
      value: any;
      peripheral: any;
      characteristic: any;
      service: any;
    },
    ...args: any[]
  ) => {
    console.log(
      'Receivedcharec',
      data.value,
      data.peripheral,
      data.service,
      data.characteristic,
      args,
    );
    // return BleManager.startNotification(
    //   data.peripheral,
    //   ServiceId,
    //   CharecteristicId,
    // ).then((d) => {
    //   console.log(d);
    //   return true;
    // });
  };

  getConnectedPeripherals = () => {
    BleManager.getConnectedPeripherals([ServiceId]).then((ps) => {
      console.log('Connected Per', JSON.stringify(ps));
    });
  };

  render() {
    return (
      <View>
        <Text>Bluetooth State:= {this.state.bleState}</Text>
        <Text>Bluetooth Permission:= {String(this.state.blePermission)}</Text>
        <Text>Bluetooth Scanning Status:= {String(this.state.scanning)}</Text>
        <Text>
          Connection Status:= {String(this.state.peripheralConnected)} and Id:
          {this.state.connectedPeripheralId} and Name:{' '}
          {this.state.peripherals[this.state.connectedPeripheralId]?.name}
        </Text>
        <Button onPress={this.onStartScan} title={'Trigger Scan'} />
        <Button
          onPress={this.getConnectedPeripherals}
          title={'Refresh Peripheral List'}
        />
        <Button onPress={this.disconnectPeripherals} title={'Disconnect'} />
        <FlatList
          data={this.getPerpherals()}
          renderItem={(per) => {
            return (
              <Button
                onPress={() => {
                  this.connectPeripheral(per.item);
                }}
                title={per.item.name || per.item.id}
              />
            );
          }}
        />
      </View>
    );
  }
}
