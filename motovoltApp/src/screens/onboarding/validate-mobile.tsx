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
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  SignIn,
  SignUp,
  ConfirmSignUp,
  ResendSignUp,
} from '../../service/redux/actions/saga/authentication-actions';
import {
  Store_UpdateOnboarding,
  Store_ResetOnboarding,
  Store_UpdateUser,
} from '../../service/redux/actions/store';
import Toast from 'react-native-simple-toast';
import OTP from './otp';

type ReduxState = {
  signUp: (params: SignUp) => void;
  signIn: (params: SignIn) => void;
  confirmSignUp: (params: ConfirmSignUp) => void;
  resendSignUp: (params: ResendSignUp) => void;
  updateOnboarding: (params: Store_UpdateOnboarding) => void;
  resetOnboarding: (params: Store_ResetOnboarding) => void;
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
  mobile: string;
  isValid: boolean;
  showOtp: boolean;
  signupSuccess: boolean;
};

class ValidateMobile extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mobile: '',
      isValid: true,
      showOtp: false,
      signupSuccess: false,
    };
  }

  componentDidMount() {
    this.props.resetOnboarding({
      type: 'Store_ResetOnboarding',
      payload: {},
    });
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
    this.props.confirmSignUp({
      type: 'ConfirmSignUp',
      payload: {
        mobileNumber: this.state.mobile,
        code: code,
      },
    });
  };

  onOtpResend = () => {
    this.props.resendSignUp({
      type: 'ResendSignUp',
      payload: {
        mobileNumber: this.state.mobile,
      },
    });
  };

  render() {
    console.log(this.state, this.props);
    if (this.props.onboarding.errorMessage) {
      Toast.show(this.props.onboarding.errorMessage);
      this.props.updateOnboarding({
        type: 'Store_UpdateOnboarding',
        payload: {
          errorMessage: '',
        },
      });
    }
    if (
      this.props.onboarding.confirmSignUpSuccess &&
      !this.state.signupSuccess
    ) {
      setTimeout(this.onSuccess, 1000);
    }
    return this.props.onboarding.signUpSuccess ? (
      <OTP
        onFilled={this.onOtpFilled}
        onResend={this.onOtpResend}
        success={Boolean(this.props.onboarding.confirmSignUpSuccess)}
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
            Validate Your Mobile Number
          </Text>
        </View>
        <View style={styles.input}>
          <Input
            showError={!this.state.isValid}
            placeHolder="Enter Registered Mobile No."
            keyboardNumericType
            onChange={this.onChange}
          />
        </View>
        <View style={styles.helpText}>
          <Text style={{fontSize: moderateScale(14, 0.1), textAlign: 'center'}}>
            <Text>By Signing up with Motovolt, you accept our </Text>
            <Text
              style={{color: '#0934F2'}}
              onPress={() => {
                console.log('T & C Pressed');
              }}>
              T & C
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
                Toast.show('Enter valid phone number with country code');
                this.setState({
                  isValid: false,
                });
                return;
              }
              this.props.signUp({
                type: 'SignUp',
                payload: {mobileNumber: this.state.mobile},
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
      signUp: (params: SignUp) => dispatch(params),
      signIn: (params: SignIn) => dispatch(params),
      confirmSignUp: (params: ConfirmSignUp) => dispatch(params),
      resendSignUp: (params: ResendSignUp) => dispatch(params),
      updateOnboarding: (params: Store_UpdateOnboarding) => dispatch(params),
      resetOnboarding: (params: Store_ResetOnboarding) => dispatch(params),
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
