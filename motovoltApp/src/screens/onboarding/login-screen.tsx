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
import Toast from 'react-native-simple-toast';
import {signIn} from '../../service/api/authentication';
import {MaterialIndicator} from 'react-native-indicators';
import {Icon} from 'native-base';

type ReduxState = {
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
  isValidPhone: boolean;
  isValidPassword: boolean;
  loading: boolean;
  showPassword: boolean;
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
      loading: false,
      showPassword: false
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
    if (this.state.loading) {
      return <MaterialIndicator color="black" />;
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
          hasPrefix
          prefix="+91"
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
          secure={!this.state.showPassword}
          marginVeritical={verticalScale(InputMarginVeritical)}
        >
          <Icon active name={this.state.showPassword ? "eye" : "eye-off"} 
            onPress={() => {
              this.setState({ showPassword: !this.state.showPassword })
          }} />
        </Input>
        <View style={{ height: '5%', justifyContent: 'flex-end' }}>
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
                Toast.show('The mobile number entered may be wrong!');
                this.setState({
                  isValidPhone: false,
                });
                return;
              }
              if (!this.state.password || this.state.password.length < 6) {
                Toast.show('Password should be entered in the required format');
                this.setState({
                  isValidPassword: false,
                });
                return;
              }
              this.setState({loading: true});
              signIn({
                type: 'SignIn',
                payload: {
                  mobileNumber: this.state.userName,
                  password: this.state.password,
                },
              }).then((response) => {
                if (!response.success) {
                  this.setState({loading: false});
                  Toast.show(response.message!);
                }
              });
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect((store: TStore) => {
  return {
    onboarding: store['onboarding'],
  };
})(Login);
