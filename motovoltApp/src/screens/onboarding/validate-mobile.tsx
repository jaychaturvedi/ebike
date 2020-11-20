import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import Button from '../../components/cta-button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';
import Input from '../onboarding/components/input';
import {
  confirmSignUp,
  resendSignUp,
  signUp,
} from '../../service/api/authentication';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Store_UpdateUser} from '../../service/redux/actions/store';
import Toast from 'react-native-simple-toast';
import OTP from './otp';
import {MaterialIndicator} from 'react-native-indicators';

type ReduxState = {
  updateUser: (params: Store_UpdateUser) => void;
  onboarding: TStore['onboarding'];
};

type ValidateMobileNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ValidateMobile'
>;

interface Props extends ReduxState {
  navigation: ValidateMobileNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'ValidateMobile'>;
}

type State = {
  loading: boolean;
  mobile: string;
  isValid: boolean;
  showOtp: boolean;
  signupSuccess: boolean;
  otpValidated: boolean;
};

class ValidateMobile extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      mobile: '',
      isValid: true,
      showOtp: false,
      signupSuccess: false,
      otpValidated: false,
    };
  }

  onSuccess = () => {
    this.props.updateUser({
      type: 'Store_UpdateUser',
      payload: {
        isLoggedIn: true,
        isPhoneValidated: true,
        isBikeRegistered: false,
      },
    });
  };

  isValidPhone(text: string) {
    const matches = text.match(/\d/g);
    return (
      matches && matches.length === 12 && text.length === 13 && text[0] === '+'
    );
  }

  onChange = (text: string) => {
    this.setState({
      mobile: text,
      isValid: true,
    });
  };

  onOtpFilled = (code: string) => {
    this.setState({
      loading: true,
    });
    confirmSignUp({
      type: 'ConfirmSignUp',
      payload: {
        mobileNumber: this.state.mobile,
        code: code,
      },
    }).then((response) => {
      if (!response.success) Toast.show(response.message || '');
      this.setState({
        loading: false,
        otpValidated: response.success,
      });
    });
  };

  onOtpResend = () => {
    this.setState({
      loading: true,
    });
    resendSignUp({
      type: 'ResendSignUp',
      payload: {
        mobileNumber: this.state.mobile,
      },
    }).then((response) => {
      if (!response.success) Toast.show(response.message || '');
      else Toast.show('We have sent the OTP to the mobile number provided.');
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    console.log(this.state, this.props);
    if (this.state.loading) {
      return <MaterialIndicator color="black" />;
    }
    if (this.state.otpValidated) {
      setTimeout(this.onSuccess, 1000);
    }
    return this.state.signupSuccess ? (
      <OTP
        onFilled={this.onOtpFilled}
        onResend={this.onOtpResend}
        success={Boolean(this.state.otpValidated)}
        errored={false}
        successMessage={'Mobile Verified'}
      />
    ) : (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: scale(20),
            }}>
            Enter Your Mobile Number
          </Text>
        </View>
        <View style={styles.input}>
          <Input
            showError={!this.state.isValid}
            placeHolder="Enter your mobile number"
            keyboardNumericType
            hasPrefix
            prefix="+91"
            onChange={this.onChange}
          />
        </View>
        <View style={styles.helpText}>
          <Text style={{fontSize: moderateScale(14, 0.1), textAlign: 'center'}}>
            <Text>By Signing up with Motovolt, you accept our{'\n'} </Text>
            <Text
              style={{color: '#0934F2'}}
              onPress={() => {
                console.log('T & C Pressed');
              }}>
              Terms and Condition
            </Text>
          </Text>
        </View>
        <View style={styles.verifyBtn}>
          <Button
            text="Verify"
            textColor="white"
            backgroundColor="#142F6A"
            onPress={() => {
              if (!this.isValidPhone(this.state.mobile)) {
                Toast.show('The mobile number entered may be wrong!');
                this.setState({
                  isValid: false,
                });
                return;
              }
              this.setState({
                loading: true,
              });
              signUp({
                type: 'SignUp',
                payload: {mobileNumber: this.state.mobile},
              }).then((response) => {
                if (!response.success) Toast.show(response.message || '');
                this.setState({
                  loading: false,
                  showOtp: response.success,
                  signupSuccess: response.success,
                });
              });
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
      updateUser: (params: Store_UpdateUser) => dispatch(params),
    };
  },
)(ValidateMobile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    padding: scale(30),
  },
  header: {
    height: '20%',
    justifyContent: 'center',
  },
  input: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    height: '40%',
    justifyContent: 'flex-start',
  },
  verifyBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
