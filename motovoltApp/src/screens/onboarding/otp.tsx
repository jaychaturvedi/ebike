import React from 'react';
import { StyleSheet, View } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Text } from 'native-base';
import { scale, moderateScale } from 'react-native-size-matters';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/onboarding';
import ThumbsUp from '../../components/thumb-up';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import { ConfirmSignUp, ResendSignUp } from '../../service/redux/actions/saga/authentication-actions'
import Toast from 'react-native-simple-toast';

type ReduxState = {
  confirmSignUp: (params: ConfirmSignUp) => void;
  resendSignUp: (params: ResendSignUp) => void;
  onboarding: TStore["onboarding"]
}

type OTPNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OTP'>;

interface Props extends ReduxState {
  navigation: OTPNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'OTP'>;
};

type State = {
  success: boolean,
  isThumbVisible: boolean,
  timerStart: boolean,
  code: string
};

class OTPInput extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      success: false,
      isThumbVisible: false,
      timerStart: false,
      code: ""
    }
  }

  navigate() {
    switch (this.props.route.params.onSuccessScreen) {
      case 'ValidateFrame':
        this.props.navigation.navigate('ValidateFrame', {});
        break;
      case 'CreateNewPassword':
        this.props.navigation.navigate('CreateNewPassword', {});
        break;
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.onboarding.confirmSignUpSuccess === true) {
      Toast.show("OTP Verified")
      prevState.success = true
      prevState.isThumbVisible = true
    }
    return prevState
  }

  render() {
    if (this.state.success === true && !this.state.timerStart) {
      setTimeout(() => { this.navigate(), this.setState({ isThumbVisible: false }) },
        5000)
      this.setState({ timerStart: true })
    }
    return (
      this.state.isThumbVisible ? <ThumbsUp
        msg="Mobile Verified"
      /> :
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>OTP Authentication</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.helpText}>
              Please enter the 6-digit OTP (One Time Password){' '}
            </Text>
            <Text style={styles.helpText}>sent to your registered mobile no</Text>
          </View>
          <View style={styles.otp}>
            <OTPInputView
              style={{ width: '100%' }}
              pinCount={6}
              code={this.state.code.length === 6 ? "" : this.state.code}
              autoFocusOnLoad
              onCodeChanged={(code: string) => this.setState({ code: code })}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
                switch (this.props.route.params.onSuccessScreen) {
                  case 'ValidateFrame':
                    this.props.confirmSignUp({
                      type: 'ConfirmSignUp', payload: {
                        mobileNumber: this.props.route.params.mobileNumber,
                        code: code
                      }
                    })
                    break;
                  case 'CreateNewPassword':
                    break;
                }
                // this.setState({ code: "" })
              }}
            />
          </View>
          <View style={styles.footer}>
            <Text style={{ textAlign: 'center' }}>
              <Text style={styles.footerText}>
                Haven't received the 6-digit OTP?{' '}
              </Text>
              <Text
                style={styles.resendOTP}
                onPress={() => {
                  console.log('Resend OTP')
                  this.props.resendSignUp({
                    type: 'ResendSignUp', payload:
                      { mobileNumber: this.props.route.params.mobileNumber }
                  })
                }}>
                Resend OTP
            </Text>
            </Text>
          </View>
        </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      onboarding: store["onboarding"]
    };
  },
  (dispatch: Dispatch) => {
    return {
      confirmSignUp: (params: ConfirmSignUp) => dispatch(params),
      resendSignUp: (params: ResendSignUp) => dispatch(params)
    };
  },
)(OTPInput);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: moderateScale(20),
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: '20%',
    paddingTop: moderateScale(40),
  },
  headerText: {
    color: 'black',
    fontSize: scale(20),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    height: '10%',
  },
  helpText: {
    fontSize: scale(12),
    fontWeight: 'normal',
    textAlign: 'center',
  },
  otp: {
    height: '20%',
    padding: moderateScale(40),
  },
  footer: {
    height: '50%',
  },
  footerText: {
    fontSize: scale(12),
    textAlign: 'center',
  },
  resendOTP: {
    fontSize: scale(12),
    color: '#0889F7',
  },
  borderStyleHighLighted: {
    borderColor: 'black',
  },
  underlineStyleBase: {
    width: scale(30),
    // height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    borderColor: 'black',
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
    color: 'black',
  },
});
