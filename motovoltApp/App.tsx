/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
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
import Success from './src/components/thumb-up';
import EnterFrameNumber from './src/screens/onboarding/enter-frame-number';
import ValidateFrame from './src/screens/onboarding/register-bike';
import AccessRequest from './src/screens/onboarding/components/access-request-modal';
import FrameRegistered from './src/screens/onboarding/frame-registered';
import CTAHeader from './src/screens/onboarding/components/header';
import PersonalDetails from './src/screens/onboarding/personal-details';
import TurnOnBluetooth from './src/screens/onboarding/turn-on-bluetooth';
import BluetoothDevices from './src/screens/onboarding/bluetooth-devices';
import Discovering from './src/screens/onboarding/discover-bluetooth';
import Footer from './src/screens/home/components/footer';
import Header from './src/screens/home/components/header';
import Colors from './src/styles/colors';
import NextButton from './src/screens/onboarding/components/next-page-button';
import LoginPage from './src/screens/onboarding/login-screen';
import ForgotPassword from './src/screens/onboarding/forgot-password';
import CreateNewPassword from './src/screens/onboarding/create-new-password';
import {Form} from 'native-base';

import Home from './src/screens/home';

import BLE from './custom-ble-manager';
import SplashScreen from 'react-native-splash-screen';
import IntroSwipper from './src/screens/intro-swiper';
import ValidateMobile from './src/screens/validate-mobile';
import OTP from './src/screens/otp';
import Scanner from './src/screens/scanner';
import GPS from './src/screens/gps-lui';
import RateRide from './src/screens/rate-ride';
import RideFeedBack from './src/screens/ride-feedback';
import MyRides from './src/screens/my-rides';
import IndividualRide from './src/screens/individual-ride';
import MyCycle from './src/screens/my-cycle';
import Menu from './src/screens/more-menu';
import Charging from './src/screens/charging';

import Notifications from './src/screens/home/notifications';

import ComingSoon from './src/screens/common/coming-soon';

import Premium from './src/screens/common/premium';

import RemoveBike from './src/screens/home/remove-bike';

import Service from './src/screens/home/service';

import Input from './src/screens/onboarding/components/input';
import * as SecureStorage from './src/service/secure-storage';
import * as Authentication from './src/service/authentication';

import ObjectId from './src/service/object-id';

declare const global: {HermesInternal: null | {}};

const styles = StyleSheet.create({});

type State = {
  username: string;
  password: string;
  otp: string;
  user: any;
};

class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      password: '',
      username: '',
      otp: '',
      user: undefined,
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
      <SafeAreaView
        style={{
          height: '100%',
          backgroundColor: Colors.BG_GREY,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Input
          value={this.state.username}
          placeHolder={'Username'}
          onChange={(value) => this.setState({username: value})}></Input>
        <Input
          value={this.state.password}
          placeHolder={'Password'}
          onChange={(value) => this.setState({password: value})}></Input>
        <Input
          value={this.state.otp}
          placeHolder={'OTP'}
          onChange={(value) => this.setState({otp: value})}></Input>
        <Button
          title={'Store'}
          onPress={() => {
            SecureStorage.storeCredentials(
              this.state.username,
              this.state.password,
            );
          }}></Button>
        <Button
          title={'Reset'}
          onPress={() => {
            SecureStorage.resetCredentials();
          }}></Button>
        <Button
          title={'Fetch'}
          onPress={() => {
            SecureStorage.fetchCredentials().then((cred) => {
              if (cred) {
                this.setState({
                  username: cred.username,
                  password: cred.password,
                });
              }
            });
          }}></Button>
        <Button
          title={'Signup'}
          onPress={() => {
            Authentication.signup(this.state.username);
          }}></Button>
        <Button
          title={'Logout'}
          onPress={() => {
            Authentication.signout();
          }}></Button>
        <Button
          title={'Get OTP'}
          onPress={() => {
            Authentication.getVerificationOtp(this.state.username).then(
              (res) => {
                if (res.success) this.setState({user: res.user});
              },
            );
          }}></Button>
        <Button
          title={'Verify OTP'}
          onPress={() => {
            Authentication.validateOtp(this.state.user, this.state.otp);
          }}></Button>

        <Button
          title={'Get User'}
          onPress={() => {
            Authentication.getUser();
          }}></Button>

        {/* <Service /> */}
        {/* <RemoveBike /> */}
        {/* <Premium /> */}
        {/* <ComingSoon /> */}
        {/* <Notifications /> */}
        {/* <IntroSwipper /> */}
        {/* <Scanner /> */}
        {/* <OTP /> */}
        {/* <GPS /> */}
        {/* <RateRide /> */}
        {/* <RideFeedBack /> */}
        {/* <MyRides /> */}
        {/* <IndividualRide /> */}
        {/* <MyCycle /> */}
        {/* <ValidateMobile /> */}

        {/* <BLE /> */}
        {/* <Header
        title="Title"
        hasNotification
        backgroundColor={Colors.HEADER_YELLOW}
        hasBackButton
        hasSubtitle
        subtitle={'Subtitle'}
        /> */}
        {/* <Footer
          lockOnlyVisible={false}
          locked={true}
          onItemSelect={() => {}}
          onLockClick={() => {}}
          selectedItem="chart"
        /> */}
        {/* <CreateNewPassword /> */}
        {/* <LoginPage /> */}
        {/* <ForgotPassword /> */}
        {/* <NextButton mode={'Active'} />
        <NextButton mode={'Disabled'} /> */}
        {/* <Footer
        lockOnlyVisible={false}
        locked={false}
        onItemSelect={() => {}}
        onLockClick={() => {}}
        selectedItem={'chart'}
        /> */}
        {/* <Discovering /> */}
        {/* <PersonalDetails /> */}
        {/* <TurnOnBluetooth /> */}
        {/* <BluetoothDevices
        devices={[
          {
            deviceName: 'My Device',
            id: '13',
          },
          {
            deviceName: 'My Device',
            id: '12',
          },
        ]}
        /> */}
        {/* <FrameRegistered /> */}
        {/* <EnterFrameNumber
        onHelp={() => {
          console.log('Help');
        }}
      /> */}
        {/* <ValidateFrame /> */}
        {/* <Success
        msg="Mobile Verified"
        subMsg={`Bike A has been successfully removed\n\n\n${'something'}`}
        buttonText="omecnnc"
      /> */}
        {/* <Menu /> */}
        {/* <Charging
          chargingStatus="Charging"
          charge="80"
          remainingTime="01:05:00"
        /> */}
      </SafeAreaView>
    );
  }
}

export default App;
