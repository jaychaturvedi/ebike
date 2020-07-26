/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Registration from './src/navigation/onboarding';
import FooterNavigation from './src/navigation/footer';

import {StyleSheet} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/service';
import {fetchCredentials} from './src/service/secure-storage';
import {signIn} from './src/service/authentication';

declare const global: {HermesInternal: null | {}};

const styles = StyleSheet.create({});

type State = {
  isLoggedIn: boolean;
};

class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    fetchCredentials().then(async (cred) => {
      if (cred) {
        const res = await signIn(cred.username, cred.password);
        if (res.success) {
          this.setState({isLoggedIn: true});
        }
      }
      SplashScreen.hide();
    });
  }

  componentDidCatch() {
    console.log('Catced err');
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {this.state.isLoggedIn ? <FooterNavigation /> : <Registration />}
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
