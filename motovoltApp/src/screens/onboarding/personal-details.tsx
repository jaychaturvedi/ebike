import React from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';
import ThumbsUp from '../../components/thumb-up';
import {ChangePassword} from '../../service/redux/actions/saga/authentication-actions';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {fetchCredentials} from '../../service/secure-storage';

type ReduxState = {
  changePassword: (params: ChangePassword) => void;
  onboarding: TStore['onboarding'];
};

type PersonalDetailsNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'PersonalDetails'
>;

interface Props extends ReduxState {
  navigation: PersonalDetailsNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'PersonalDetails'>;
}

type State = {
  name: string;
  email: string;
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
      name: '',
      password: '',
      success: false,
      mobileNumber: '',
      oldPassword: '',
    };
  }

  componentDidMount() {
    fetchCredentials().then((cred) => {
      if (cred) {
        this.setState({oldPassword: cred.password});
      }
    });
  }

  renderSuccess() {
    this.setState({success: true});
    setTimeout(() => {
      this.props.navigation.navigate('TurnOnBluetooth', {});
    }, 5000);
  }

  render() {
    const formDataValid =
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
          onChange={(text: string) => this.setState({name: text})}
          placeHolder="Full Name*"
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <Input
          onChange={(text: string) => this.setState({email: text})}
          placeHolder="Email*"
          marginVeritical={verticalScale(InputMarginVeritical)}
        />
        <Input
          onChange={(text: string) => this.setState({password: text})}
          placeHolder="Create a password*"
          marginVeritical={verticalScale(InputMarginVeritical)}
          secure
        />
        <Input
          onChange={(text: string) => this.setState({confirmPassword: text})}
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
              this.props.changePassword({
                type: 'ChangePassword',
                payload: {
                  mobileNumber: this.state.mobileNumber,
                  oldPassword: this.state.oldPassword,
                  newPassword: this.state.password,
                },
              });
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
