import React from 'react';
import {scale, verticalScale} from '../../styles/size-matters';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../../styles/colors';
import Input from './components/input';
import CTAHeader from './components/header';
import NextButton from './components/next-page-button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {SignIn} from '../../service/redux/actions/saga/authentication-actions';
import {
  Store_UpdateOnboarding,
  Store_ResetOnboarding,
} from '../../service/redux/actions/store';
import Toast from 'react-native-simple-toast';

type ReduxState = {
  signIn: (params: SignIn) => void;
  onboarding: TStore['onboarding'];
  updateOnboarding: (params: Store_UpdateOnboarding) => void;
  resetOnboarding: (params: Store_ResetOnboarding) => void;
};

type LoginNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'LoginPage'
>;

interface Props extends ReduxState {
  navigation: LoginNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'LoginPage'>;
}

type State = {
  userName: string;
  password: string;
  isValidPhone: boolean;
  isValidPassword: boolean;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: scale(32),
    marginBottom: verticalScale(32),
    justifyContent: 'flex-end',
  },
});

const InputMarginVeritical = 6;

class Login extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isValidPhone: true,
      isValidPassword: true,
    };
  }

  isValidPhone(value: string) {
    const matches = value.match(/\d/g);
    return (
      matches &&
      matches.length === 12 &&
      value.length === 13 &&
      value[0] === '+'
    );
  }

  render() {
    if (this.props.onboarding.errorMessage) {
      Toast.show(this.props.onboarding.errorMessage);
      this.props.resetOnboarding({
        type: 'Store_ResetOnboarding',
        payload: {},
      });
    }
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <CTAHeader
          hasBackButton
          onBackClick={() => {
            this.props.navigation.goBack();
          }}
        />
        <View
          style={{
            height: '10%',
            justifyContent: 'flex-start',
          }}>
          <Text style={styles.title}>Log In</Text>
        </View>
        <Input
          showError={!this.state.isValidPhone}
          placeHolder="Mobile No."
          keyboardNumericType
          marginVeritical={verticalScale(InputMarginVeritical)}
          onChange={(value: string) => {
            this.setState({
              userName: value,
              isValidPhone: true,
            });
          }}
        />
        <Input
          showError={!this.state.isValidPassword}
          onChange={(value: string) =>
            this.setState({password: value, isValidPassword: true})
          }
          placeHolder="Password"
          secure
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <View style={{height: '5%', justifyContent: 'flex-end'}}>
          <Text
            onPress={() => this.props.navigation.replace('ForgotPassword', {})}
            style={{
              marginVertical: verticalScale(InputMarginVeritical),
              color: Colors.HYPERLINK_BLUE,
            }}>
            Forgot Password?
          </Text>
        </View>
        <View style={styles.bottom}>
          <NextButton
            mode={'Active'}
            onPress={() => {
              if (
                !this.state.userName ||
                !this.isValidPhone(this.state.userName)
              ) {
                Toast.show('Enter valid mobile number with country code');
                this.setState({
                  isValidPhone: false,
                });
                return;
              }
              if (!this.state.password || this.state.password.length <= 8) {
                Toast.show('Enter valid password');
                this.setState({
                  isValidPassword: false,
                });
                return;
              }
              this.props.signIn({
                type: 'SignIn',
                payload: {
                  mobileNumber: this.state.userName,
                  password: this.state.password,
                },
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
      signIn: (params: SignIn) => dispatch(params),
      updateOnboarding: (params: Store_UpdateOnboarding) => dispatch(params),
      resetOnboarding: (params: Store_ResetOnboarding) => dispatch(params),
    };
  },
)(Login);
