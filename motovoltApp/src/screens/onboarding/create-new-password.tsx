import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';
import ThumbsUp from '../../components/thumb-up';
import {CompleteForgotPassword} from '../../service/redux/actions/saga/authentication-actions';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Toast from 'react-native-simple-toast';
import {
  Store_UpdateOnboarding,
  Store_ResetOnboarding,
} from 'src/service/redux/actions/store';

type ReduxState = {
  completeForgotPassword: (params: CompleteForgotPassword) => void;
  updateOnboarding: (params: Store_UpdateOnboarding) => void;
  resetOnboarding: (params: Store_ResetOnboarding) => void;
  onboarding: TStore['onboarding'];
};

type CreateNewPasswordNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'CreateNewPassword'
>;

interface Props extends ReduxState {
  navigation: CreateNewPasswordNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'CreateNewPassword'>;
}

type State = {
  isValid: boolean;
  password: string;
  confirmPassword: string;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingHorizontal: scale(64),
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(32),
    justifyContent: 'flex-end',
  },
  warningContainer: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
  },
  warningLogo: {
    width: scale(18),
    height: scale(18),
  },
  warningText: {
    fontSize: 12,
  },
});

const InputMarginVeritical = 6;

class NewPassword extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmPassword: '',
      password: '',
      isValid: false,
    };
  }

  validatePassword = (password: string) => {
    return RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#()^])[A-Za-z\d@$!%*?&#()^]{8,}$/,
    ).test(password);
  };

  render() {
    if (this.props.onboarding.errorMessage) {
      Toast.show(this.props.onboarding.errorMessage);
      this.props.resetOnboarding({
        type: 'Store_ResetOnboarding',
        payload: {},
      });
      this.props.navigation.replace('ForgotPassword', {});
    }
    return this.props.onboarding.passwordResetSuccess ? (
      <ThumbsUp
        msg="Password Changed"
        buttonText="Proceed"
        onButtonPress={() => this.props.navigation.navigate('LoginPage', {})}
      />
    ) : (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <CTAHeader />
        <Text style={styles.title}>Create New Password</Text>
        <View style={{marginVertical: verticalScale(100)}}>
          <Input
            placeHolder="Enter New Password"
            marginVeritical={verticalScale(InputMarginVeritical)}
            secure
            onChange={(value: string) => {
              this.setState({
                password: value,
                isValid: this.validatePassword(value),
              });
            }}
          />
          {!this.state.isValid && (
            <View style={styles.warningContainer}>
              <Image
                style={styles.warningLogo}
                source={require('../../assets/icons/error_outline-grey.png')}
              />
              <View style={{paddingHorizontal: 4}}>
                <Text style={styles.warningText}>
                  Password must be alphanumeric with min 8 characters, 1 upper
                  case, 1 lower case and a special character.
                </Text>
              </View>
            </View>
          )}
          <Input
            placeHolder="Re-enter Password"
            marginVeritical={verticalScale(InputMarginVeritical)}
            onChange={(value: string) => {
              this.setState({confirmPassword: value});
            }}
            secure
          />
          {this.state.confirmPassword !== this.state.password &&
            this.state.confirmPassword !== "" && (
              <View style={styles.warningContainer}>
                <Image
                  style={styles.warningLogo}
                  source={require('../../assets/icons/error_outline-red.png')}
                />
                <View style={{paddingHorizontal: 4}}>
                  <Text
                    style={{...styles.warningText, color: Colors.ERROR_RED}}>
                    Password Mismatch
                  </Text>
                </View>
              </View>
            )}
        </View>
        <View style={styles.bottom}>
          <CTAButton
            disabled={
              !this.state.isValid ||
              this.state.confirmPassword !== this.state.password
            }
            text={'Save & Continue'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() => {
              if (
                this.state.isValid &&
                this.state.confirmPassword == this.state.password
              ) {
                this.props.completeForgotPassword({
                  type: 'CompleteForgotPassword',
                  payload: {
                    code: this.props.route.params.code,
                    mobileNumber: this.props.route.params.mobileNumber,
                    password: this.state.password,
                  },
                });
              }
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
      completeForgotPassword: (params: CompleteForgotPassword) =>
        dispatch(params),
      updateOnboarding: (params: Store_UpdateOnboarding) => dispatch(params),
      resetOnboarding: (params: Store_ResetOnboarding) => dispatch(params),
    };
  },
)(NewPassword);
