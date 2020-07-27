import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Content, Item} from 'native-base';
import Button from '../../components/cta-button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';
import Colors from '../../styles/colors';
import Input from '../onboarding/components/input';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  SignUp,
  ConfirmSignUp,
  ResendSignUp,
} from '../../service/redux/actions/saga/authentication-actions';
import {Store_UpdateOnboarding} from '../../service/redux/actions/store';
import Toast from 'react-native-simple-toast';
import OTP from './otp';

type ReduxState = {
  signUp: (params: SignUp) => void;
  confirmSignUp: (params: ConfirmSignUp) => void;
  resendSignUp: (params: ResendSignUp) => void;
  updateOnboarding: (params: Store_UpdateOnboarding) => void;
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
};

class ValidateMobile extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mobile: '',
      isValid: false,
      showOtp: false,
    };
  }

  componentDidMount() {
    this.props.updateOnboarding({
      type: 'Store_UpdateOnboarding',
      payload: {
        confirmSignUpSuccess: null,
        signUpSuccess: null,
      },
    });
  }

  onChange = (text: string) => {
    const matches = text.match(/^[+]\d/g);
    this.setState({
      mobile: text,
      // isValid: matches && matches.length === 13 ? true : false,
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

  onOtpSuccessComplete = () => {
    this.props.navigation.replace('ValidateFrame', {});
  };

  render() {
    if (this.props.onboarding.signUpSuccess === false) {
      Toast.show('Error Occurred');
    }
    return this.props.onboarding.signUpSuccess ? (
      <OTP
        onFilled={this.onOtpFilled}
        onResend={this.onOtpResend}
        onSuccess={this.onOtpSuccessComplete}
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
            disabled={!this.state.isValid}
            text="Verify"
            textColor="white"
            backgroundColor="#142F6A"
            onPress={() =>
              this.props.signUp({
                type: 'SignUp',
                payload: {mobileNumber: this.state.mobile},
              })
            }
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
      confirmSignUp: (params: ConfirmSignUp) => dispatch(params),
      resendSignUp: (params: ResendSignUp) => dispatch(params),
      updateOnboarding: (params: Store_UpdateOnboarding) => dispatch(params),
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
