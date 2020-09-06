/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/service';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/integration/react';

function MotovoltApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => MotovoltApp);
