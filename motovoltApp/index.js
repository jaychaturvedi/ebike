/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/service';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';

function MotovoltApp() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => MotovoltApp);
