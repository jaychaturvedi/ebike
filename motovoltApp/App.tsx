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
import Registration from './src/navigation/registartion'
import { createStackNavigator } from '@react-navigation/stack';

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

// Forgot Passord
import ForgotPassword from './src/screens/onboarding/forgot-password';
// import OTP from './src/screens/onboarding/otp';
import CreateNewPassword from './src/screens/onboarding/create-new-password';
// Show model for success
import { Form } from 'native-base';

// Home
import Home from './src/screens/home';
import Notifications from './src/screens/home/notifications';
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

declare const global: { HermesInternal: null | {} };

const styles = StyleSheet.create({});

type State = {
  isUserLoggedIn: boolean
}



class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isUserLoggedIn: false
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentDidCatch() {
    console.log('Catced err');
  }


  render() {
    return (
      // <SafeAreaView
      //   style={{
      //     height: '100%',
      //     // backgroundColor: Colors.BG_GREY,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     width: '100%',
      //   }}>

      /** Login */
      /* <LoginPage /> */
      /* <ForgotPassword /> */
      /* <OTP/> */
      /* <CreateNewPassword/> */
      /* // Show model for success */
      /* <Home /> */
      /* <Notifications /> */
      /* <GPS /> */

      /* <MyRides /> */
      /* <IndividualRide/> */

      /* <Speedometer /> */
      /* <RateRide /> */
      /* <RideFeedBack /> */
      /* <Success
            msg={'Thanks you'}
            subMsg={"We really appreciate you're feedback"}
          /> */

      /* <MyCycle /> */

      /* <Menu /> */
      /* <Profile /> */
      /* <Upgrade /> */
      /* <ComingSoon /> */
      /* <Support /> */
      /* <SupportSrevice /> */
      /* <ReportIssue /> */
      /* <Premium /> */






      /* <Charging
            chargingStatus="Charging"
            charge="80"
            remainingTime="01:05:00"
          /> */
      // </SafeAreaView>
      <NavigationContainer>
        <Registration />
      </NavigationContainer>
    );
  }
}

export default App;
