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
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import IntroSwipper from './src/screens/intro-swiper'
import ValidateMobile from './src/screens/validate-mobile'
import OTP from './src/screens/otp'
import Scanner from './src/screens/scanner'
import GPS from './src/screens/gps-lui'
import RateRide from './src/screens/rate-ride'
import RideFeedBack from './src/screens/ride-feedback'
import MyRides from './src/screens/my-rides'
import IndividualRide from './src/screens/individual-ride'
import MyCycle from './src/screens/my-cycle'

declare const global: { HermesInternal: null | {} };

class App extends React.PureComponent<{}, {}>  {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        {/* <Intro /> */}
        {/* <IntroSwipper /> */}
        {/* <ValidateMobile /> */}
        {/* <OTP /> */}
        {/* <Scanner /> */}
        {/* <GPS /> */}
        {/* <RateRide /> */}
        {/* <RideFeedBack /> */}
        {/* <MyRides /> */}
        <IndividualRide />
        {/* <MyCycle /> */}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({

});

export default App;
