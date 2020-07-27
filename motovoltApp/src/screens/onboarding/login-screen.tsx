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
import Toast from 'react-native-simple-toast';

type ReduxState = {
  signIn: (params: SignIn) => void;
  onboarding: TStore['onboarding'];
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
  isValid: boolean;
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
      isValid: false,
    };
  }

  render() {
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
          placeHolder="Mobile No."
          keyboardNumericType
          marginVeritical={verticalScale(InputMarginVeritical)}
          onChange={(value: string) => {
            // const matches = value.match(/\d/g);
            this.setState({
              userName: value,
              isValid: true,
              // isValid: matches && matches.length === 10 ? true : false,
            });
          }}
        />
        <Input
          onChange={(value: string) => this.setState({password: value})}
          placeHolder="Password"
          secure
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <View style={{height: '5%', justifyContent: 'flex-end'}}>
          <Text
            onPress={() => this.props.navigation.navigate('ForgotPassword', {})}
            style={{
              marginVertical: verticalScale(InputMarginVeritical),
              color: Colors.HYPERLINK_BLUE,
            }}>
            Forgot Password?
          </Text>
        </View>
        <View style={styles.bottom}>
          <NextButton
            mode={
              this.state.userName && this.state.password && this.state.isValid
                ? 'Active'
                : 'Disabled'
            }
            onPress={() => {
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
    };
  },
)(Login);
