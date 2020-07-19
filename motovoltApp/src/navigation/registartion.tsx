import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Register
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
export type RegistrationStackParamList = {
  IntroSwiper: {},
  ValidateMobile: {},
  OTP: { onSuccessScreen: 'CreateNewPassword' | 'ValidateFrame' },
  ValidateFrame: {},
  EnterFrameNumber: {},
  Scanner: {},
  FrameRegistered: {},
  PersonalDetails: {},
  TurnOnBluetooth: {},
  Discovering: {},
  BluetoothDevices: {},
  LoginPage: {},
  ForgotPassword: {},
  CreateNewPassword: {}
}

const Registration = createStackNavigator<RegistrationStackParamList>();

//Define all your stack here
export default function RegistrationStack() {
  return (
    <Registration.Navigator screenOptions={{
      headerShown: false,
    }}
    // mode="modal"
    >
      <Registration.Screen name="IntroSwiper" component={IntroSwipper} initialParams={{}} />
      <Registration.Screen name="ValidateMobile" component={ValidateMobile} />
      <Registration.Screen name="OTP" component={OTP} />
      <Registration.Screen name="ValidateFrame" component={ValidateFrame} />
      <Registration.Screen name="EnterFrameNumber" component={EnterFrameNumber} />
      <Registration.Screen name="Scanner" component={Scanner} />
      <Registration.Screen name="FrameRegistered" component={FrameRegistered} />
      <Registration.Screen name="PersonalDetails" component={PersonalDetails} />
      <Registration.Screen name="TurnOnBluetooth" component={TurnOnBluetooth} />
      <Registration.Screen name="Discovering" component={Discovering} />
      <Registration.Screen name="BluetoothDevices" component={BluetoothDevices} />
      <Registration.Screen name="LoginPage" component={LoginPage} />
      <Registration.Screen name="ForgotPassword" component={ForgotPassword} />
      <Registration.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Registration.Navigator>
  );
}  