import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import Input from './components/input';
import CTAHeader from './components/header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';

type ForgotPAsswordNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ForgotPassword'
>;

type Props = {
  navigation: ForgotPAsswordNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'ForgotPassword'>;
};

type State = {
  mobile: string;
  isValid: boolean;
};

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
  constructor(props: Props) {
    super(props);
    this.state = {
      isValid: false,
      mobile: '',
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <CTAHeader />
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.body}>
          <Input
            keyboardNumericType
            placeHolder="Enter Registered Mobile No"
            onChange={(text: string) => {
              const matches = text.match(/\d/g);
              this.setState({
                mobile: text,
                isValid: matches && matches.length === 10 ? true : false,
              });
            }}
          />
        </View>
        <View style={styles.footer}>
          <CTAButton
            disabled={!this.state.isValid}
            text={'Verify'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() =>
              this.props.navigation.navigate('OTP', {
                onSuccessScreen: 'CreateNewPassword',
              })
            }
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
