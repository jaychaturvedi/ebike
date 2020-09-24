import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import Input from './components/input';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/onboarding';
import { InitiateForgotPassword } from '../../service/redux/actions/saga/authentication-actions';
import { Store_ResetOnboarding } from '../../service/redux/actions/store';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import OTP from './otp';
import Toast from 'react-native-simple-toast';

type ReduxState = {
  initiateForgotPassword: (params: InitiateForgotPassword) => void;
  resetOnboarding: (params: Store_ResetOnboarding) => void;
  onboarding: TStore['onboarding'];
};

type ForgotPAsswordNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ForgotPassword'
>;

interface Props extends ReduxState {
  navigation: ForgotPAsswordNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'ForgotPassword'>;
}

type State = {
  mobile: string;
  isValid: boolean;
  showOtp: boolean;
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

class ForgotPassword extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isValid: false,
      mobile: '',
      showOtp: false,
    };
  }

  onOtpFilled = (code: string) => {
    this.setState({ showOtp: false });
    this.props.navigation.replace('CreateNewPassword', {
      code,
      mobileNumber: this.state.mobile,
    });
  };

  onOtpResend = () => {
    this.props.initiateForgotPassword({
      type: 'InitiateForgotPassword',
      payload: {
        mobileNumber: this.state.mobile,
      },
    });
    Toast.show("OTP Sent")
  };

  render() {
    return this.state.showOtp ? (
      <OTP
        onFilled={this.onOtpFilled}
        onResend={this.onOtpResend}
        // onSuccess={() => { }}
        success={false}
        successMessage={''}
      />
    ) : (
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
                  // isValid: true,
                  isValid: matches && matches.length === 12 && text.length === 13 && text[0] === '+' ? true : false,
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
              onPress={() => {
                this.props.initiateForgotPassword({
                  type: 'InitiateForgotPassword',
                  payload: {
                    mobileNumber: this.state.mobile,
                  },
                });
                this.setState({ showOtp: true });
              }}
            />
          </View>
        </KeyboardAvoidingView>
      );
  }
}

export default connect(
  (store: TStore) => {
    return {
      onboarding: store['onboarding'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      initiateForgotPassword: (params: InitiateForgotPassword) =>
        dispatch(params),
      resetOnboarding: (params: Store_ResetOnboarding) => dispatch(params),
    };
  },
)(ForgotPassword);
