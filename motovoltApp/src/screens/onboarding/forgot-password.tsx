import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import Input from './components/input';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding'

type IntroSwiperNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ForgotPassword'
>;

type Props = {
  navigation: IntroSwiperNavigationProp,
  route: RouteProp<OnboardingStackParamList, 'ForgotPassword'>
};


type State = {};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    alignItems: 'center',
  },
  body: {
    marginVertical: verticalScale(40),
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: verticalScale(40),
  },
});

export default class ForgotPassword extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <CTAHeader />
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.body}>
          <Input placeHolder="Enter Registered Mobile No" />
        </View>
        <View style={styles.footer}>
          <CTAButton
            text={'Verify'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() => this.props.navigation.navigate('OTP', { onSuccessScreen: 'CreateNewPassword' })}
          />
        </View>
      </View>
    );
  }
}
