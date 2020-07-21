/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Registration from './src/navigation/onboarding';
import FooterNavigation from './src/navigation/footer';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Picker,
  Button,
  useWindowDimensions,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

//Login
import LoginPage from './src/screens/onboarding/login-screen';

import EnterFrmeNumber from './src/screens/onboarding/enter-frame-number';

// Forgot Passord
import ForgotPassword from './src/screens/onboarding/forgot-password';
// import OTP from './src/screens/onboarding/otp';
import CreateNewPassword from './src/screens/onboarding/create-new-password';
// Show model for success
import { Form } from 'native-base';

// Home
import Home from './src/screens/home';
// import Notifications from './src/screens/home/notifications';
import GPS from './src/screens/home/gps-lui';

// Statistics
import MyRides from './src/screens/statistics/my-rides';
import IndividualRide from './src/screens/statistics/individual-ride';

// LockButton
import Speedometer from './src/screens/ride/ride-on';
import RateRide from './src/screens/ride/rate-ride';
import RideFeedBack from './src/screens/ride/ride-feedback';
// import Success from './src/components/thumb-up';

// Cycle
import MyCycle from './src/screens/cycle/my-cycle';

// Menu
import Menu from './src/screens/menu/more-menu';
import Profile from './src/screens/menu/profile';
import Upgrade from './src/screens/menu/upgrade';
import ComingSoon from './src/screens/common/coming-soon';
import Support from './src/screens/menu/support';
import SupportSrevice from './src/screens/menu/support-service';
import ReportIssue from './src/screens/menu/report-issue';
import Premium from './src/screens/common/premium';

// Common
import Charging from './src/screens/charging';
import BLE from './custom-ble-manager';
import RemoveBike from './src/screens/menu/remove-bike';

import * as SecureStorage from './src/service/secure-storage';
import * as Authentication from './src/service/authentication';

import ObjectId from './src/service/object-id';
import Colors from './src/styles/colors';

import { Provider } from 'react-redux';
import { store } from './src/service';

declare const global: { HermesInternal: null | {} };

const styles = StyleSheet.create({});

type State = {};

class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentDidCatch() {
    console.log('Catced err');
  }

  render() {
    return (

      <Provider store={store}>
        <NavigationContainer>
          {/* <Registration /> */}
          <FooterNavigation />
          {/* <Charging
            chargingStatus="21"
            charge="212"
            remainingTime="232"
          /> */}
          {/* <RemoveBike /> */}
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
