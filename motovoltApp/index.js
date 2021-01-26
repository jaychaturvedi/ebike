/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/service';
import { NavigationContainer } from '@react-navigation/native';
import { name as appName } from './app.json';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeContext } from './src/styles/theme/theme-context';
import themes from './src/styles/theme/themes';
import {MenuProvider} from "react-native-popup-menu";

class MotovoltApp extends React.Component {

  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
      console.log("toggle", this.state);
    };

    // State also contains the updater function so it will    
    // be passed down into the context provider  
    console.log(themes.dark);
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <ThemeContext.Provider value={this.state}>
              <MenuProvider>
                <App />
              </MenuProvider>
            </ThemeContext.Provider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => MotovoltApp);
