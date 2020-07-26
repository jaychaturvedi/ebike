import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroSwipper from '../screens/onboarding/intro-swiper';
import ValidateMobile from '../screens/onboarding/validate-mobile';
import OTP from '../screens/onboarding/otp';
import ValidateFrame from '../screens/onboarding/register-bike';
import EnterFrameNumber from '../screens/onboarding/enter-frame-number';
import Scanner from '../screens/onboarding/scanner';
import FrameRegistered from '../screens/onboarding/frame-registered';
import PersonalDetails from '../screens/onboarding/personal-details';
import TurnOnBluetooth from '../screens/onboarding/turn-on-bluetooth';
import Discovering from '../screens/onboarding/discover-bluetooth';
import BluetoothDevices from '../screens/onboarding/bluetooth-devices';
import LoginPage from '../screens/onboarding/login-screen';
import ForgotPassword from '../screens/onboarding/forgot-password';
import CreateNewPassword from '../screens/onboarding/create-new-password';

/**
 * All props definiton goes here
 */
export type OnboardingStackParamList = {
  IntroSwiper: {};
  ValidateMobile: {};
  ValidateFrame: {};
  EnterFrameNumber: {};
  Scanner: {};
  FrameRegistered: {};
  PersonalDetails: {};
  TurnOnBluetooth: {};
  Discovering: {};
  BluetoothDevices: {};
  LoginPage: {};
  ForgotPassword: {};
  CreateNewPassword: {code: string; mobileNumber: string};
};

const Onboarding = createStackNavigator<OnboardingStackParamList>();

//Define all your stack here
export default function OnboardingStack(props: {}) {
  return (
    <Onboarding.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // mode="modal"
    >
      <Onboarding.Screen
        name="IntroSwiper"
        component={IntroSwipper}
        initialParams={{}}
      />
      <Onboarding.Screen name="ValidateMobile" component={ValidateMobile} />
      <Onboarding.Screen name="ValidateFrame" component={ValidateFrame} />
      <Onboarding.Screen name="EnterFrameNumber" component={EnterFrameNumber} />
      <Onboarding.Screen name="Scanner" component={Scanner} />
      <Onboarding.Screen name="FrameRegistered" component={FrameRegistered} />
      <Onboarding.Screen name="PersonalDetails" component={PersonalDetails} />
      <Onboarding.Screen name="TurnOnBluetooth" component={TurnOnBluetooth} />
      <Onboarding.Screen name="Discovering" component={Discovering} />
      <Onboarding.Screen name="BluetoothDevices" component={BluetoothDevices} />
      <Onboarding.Screen name="LoginPage" component={LoginPage} />
      <Onboarding.Screen name="ForgotPassword" component={ForgotPassword} />
      <Onboarding.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
      />
    </Onboarding.Navigator>
  );
}