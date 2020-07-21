import {
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import BleManager, { Peripheral } from 'react-native-ble-manager';

export type BLEState = 'on' | 'off' | 'turning_on' | 'turning_off';
export type PeripheralDisconnected = { peripheral: string; status: 0 };
export type Characteristic = {
    value: any;
    peripheral: any;
    characteristic: any;
    service: any;
}
export type TPeripheral = Peripheral;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ServiceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const CharecteristicId = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

const MaxMTU = 512;

export type TBleListeners = {
    onStopScan: (peripherals: TPeripheral[]) => void;
    onStateChange: (state: BLEState) => void;
    onDisconnectPeripheral: (data: PeripheralDisconnected) => void;
    onUpdateValueForCharacteristic: (data: Characteristic) => void;
}

async function requestPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
        return PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then((result) => {
            if (result) {
                console.log('Ble Permission Already Granted');
                return { success: true };
            } else {
                return PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ).then((result) => {
                    if (result) {
                        console.log('Ble Permission Granted');
                        return { success: true };
                    } else {
                        console.log('Ble Permission Rejected');
                        return { success: false };
                    }
                });
            }
        });
    }
    return { success: false };
};

export async function enableBluetooth() {
    try {
        await BleManager.enableBluetooth();
        /** Starting BLE Manager*/
        await BleManager.start({ showAlert: false });
        const granted = await requestPermission();
        console.log("Granted", granted)
        if (!granted.success)
            throw new Error("Permission not granted");
        return { success: true }
    } catch (error) {
        return { success: false };
    }
}

export function initialiseListeners(listeners: TBleListeners) {

    try {
        /** On Stop Scan */
        const onStopScan = bleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                BleManager.getDiscoveredPeripherals()
                    .then((peripherals: Peripheral[]) => {
                        console.log("peri", JSON.stringify(peripherals))
                        listeners.onStopScan(peripherals);
                    })
                    .catch(err => {
                        console.log(err)
                        listeners.onStopScan([]);
                    })
            },
        );

        /** On BLE State change*/
        const onStateChange = bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            (state: { state: BLEState }) => {
                listeners.onStateChange(state.state);
            },
        );

        /** On Peripheral Disconnected */
        const onDisconnectPeripheral = bleManagerEmitter.addListener(
            'BleManagerDisconnectPeripheral',
            (data: PeripheralDisconnected) => {
                listeners.onDisconnectPeripheral(data);
            },
        );

        const onUpdateValueForCharacteristic = bleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            (data: Characteristic) => {
                console.log("Data", data)
                listeners.onUpdateValueForCharacteristic(data);
            },
        );
        BleManager.checkState();
        const unsubscriber = () => {
            onStopScan.remove();
            onStateChange.remove();
            onDisconnectPeripheral.remove();
            onUpdateValueForCharacteristic.remove();
        };
        return { success: true, unsubscriber };
    } catch (error) {
        return { success: false, unsubscriber: () => { } };
    }
}

export function startScan(timeSecs: number) {
    return BleManager.scan([], timeSecs, false)
        .then((results) => {
            return { success: true };
        }).catch(err => {
            console.log(err)
            return { success: false };
        });
}

export function getConnectedPeripherals() {
    return BleManager.getConnectedPeripherals([ServiceId]).then((ps) => {
        return { peripherals: ps, success: true }
    }).catch(err => {
        console.log(err);
        return { peripherals: [], success: false }
    });
}

export function connectPeripheral(id: string) {
    return BleManager.connect(id)
        .then(async () => {
            const services = await BleManager.retrieveServices(id);
            console.log('Services', JSON.stringify(services));
            await BleManager.requestMTU(id, MaxMTU);
            await BleManager.startNotification(id, ServiceId, CharecteristicId);
            return { success: true }
        })
        .catch((err) => {
            console.log('Error connecting', err);
            return { success: false }
        });
}

export function disconnectPeripherals() {
    return BleManager.getConnectedPeripherals([ServiceId])
        .then(async (peripherals) => {
            const response = await Promise.all(
                peripherals.map((peripheral) => {
                    return BleManager.disconnect(peripheral.id)
                        .then(() => {
                            return { success: true }
                        })
                        .catch((err) => {
                            console.log(err);
                            return { success: true }
                        });
                }))
            return { success: response.every(e => e.success) }
        });
}