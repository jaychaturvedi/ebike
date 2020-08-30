import React from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RegistartionStackParamList } from '../../navigation/registration';
import ThumbsUp from '../../components/thumb-up';
import { ChangePassword } from '../../service/redux/actions/saga/authentication-actions';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchCredentials } from '../../service/secure-storage';
import Toast from 'react-native-simple-toast';

type ReduxState = {
  changePassword: (params: ChangePassword) => void;
  onboarding: TStore['onboarding'];
};

type PersonalDetailsNavigationProp = StackNavigationProp<
  RegistartionStackParamList,
  'PersonalDetails'
>;

interface Props extends ReduxState {
  navigation: PersonalDetailsNavigationProp;
  route: RouteProp<RegistartionStackParamList, 'PersonalDetails'>;
}

type State = {
  name: string;
  email: string;
  isValidEmail: boolean,
  password: string;
  confirmPassword: string;
  success: boolean;
  mobileNumber: string;
  oldPassword: string;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(40),
    justifyContent: 'flex-end',
  },
  image: {
    width: '150%',
    height: '70%',
    position: 'absolute',
    right: '0%',
    resizeMode: 'stretch',
    opacity: 0.5,
  },
});

const InputMarginVeritical = 6;

class PersonalDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmPassword: '',
      email: '',
      isValidEmail: false,
      name: '',
      password: '',
      success: false,
      mobileNumber: '',
      oldPassword: '',
    };
  }

  validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  componentDidMount() {
    fetchCredentials().then((cred) => {
      if (cred) {
        this.setState({ oldPassword: cred.password, mobileNumber: cred.username });
      }
    });
  }

  renderSuccess() {
    this.setState({ success: true });
    setTimeout(() => {
      this.props.navigation.navigate('TurnOnBluetooth', {});
    }, 5000);
  }

  render() {
    const formDataValid =
      this.state.isValidEmail &&
      this.state.email &&
      this.state.name &&
      this.state.password &&
      this.state.password === this.state.confirmPassword;
    if (!this.state.success && this.props.onboarding.passwordResetSuccess) {
      this.renderSuccess();
    }
    return this.props.onboarding.passwordResetSuccess ? (
      <ThumbsUp msg="Account Created" />
    ) : (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
          }}>
          <CTAHeader
            hasBackButton
            onBackClick={() => this.props.navigation.goBack()}
          />
          <Text style={styles.title}>Please enter your details</Text>
          <Input
            onChange={(text: string) => this.setState({ name: text })}
            placeHolder="Full Name*"
            marginVeritical={verticalScale(InputMarginVeritical)}
          />
          <Input
            onChange={(text: string) => {
              const matches = text.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
              this.setState({
                email: text,
                isValidEmail: matches && matches.length ? true : false
              });
            }}
            placeHolder="Email*"
            marginVeritical={verticalScale(InputMarginVeritical)}
          />
          <Input
            onChange={(text: string) => this.setState({ password: text })}
            placeHolder="Create a password*"
            marginVeritical={verticalScale(InputMarginVeritical)}
            secure
          />
          <Input
            onChange={(text: string) => this.setState({ confirmPassword: text })}
            placeHolder="Re-enter your password*"
            marginVeritical={verticalScale(InputMarginVeritical)}
            secure
          />
          <View
            style={{
              width: '100%',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/cycle_with_headlight.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.bottom}>
            <CTAButton
              disabled={!formDataValid}
              onPress={() => {
                if (this.validateEmail(this.state.email)) {
                  this.props.changePassword({
                    type: 'ChangePassword',
                    payload: {
                      mobileNumber: this.state.mobileNumber,
                      oldPassword: this.state.oldPassword,
                      newPassword: this.state.password,
                    },
                  });
                } else {
                  Toast.show("Enter a valid email");
                }
                // this.props.navigation.navigate('TurnOnBluetooth', {});
                // this.renderSuccess();
              }}
              text={'Create my account'}
              textColor={Colors.WHITE}
              backgroundColor={Colors.NAVY_BLUE}
            />
          </View>
        </View>
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
      changePassword: (params: ChangePassword) => dispatch(params),
    };
  },
)(PersonalDetails);
