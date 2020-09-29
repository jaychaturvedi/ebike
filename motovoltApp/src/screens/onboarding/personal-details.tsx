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
import {
  Store_UpdateOnboarding,
  Store_UpdateUser,
} from 'src/service/redux/actions/store';
import { UpdateUser } from 'src/service/redux/actions/saga/user';
import RNPickerSelect from 'react-native-picker-select';

type ReduxState = {
  changePassword: (params: ChangePassword) => void;
  onboarding: TStore['onboarding'];
  bike: TStore['bike'];
  updateUser: (params: Store_UpdateUser) => void;
  updateOnboarding: (params: Store_UpdateOnboarding) => void;
  updatePersonalDetails: (params: UpdateUser) => void;
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
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidName: boolean;
  password: string;
  confirmPassword: string;
  success: boolean;
  mobileNumber: string;
  oldPassword: string;
  age: string,
  gender: string
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    width: 120,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 120,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const InputMarginVeritical = 6;

let ages: number[] = [];
for (let i = 12; i <= 55; i++)
  ages.push(i)

class PersonalDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmPassword: '',
      email: '',
      isValidEmail: true,
      isValidPassword: true,
      isValidName: true,
      name: '',
      password: '',
      success: false,
      mobileNumber: '',
      oldPassword: '',
      age: "23",
      gender: "Male"
    };
  }

  validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword = (password: string) => {
    return RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ).test(password);
  };

  componentDidMount() {
    fetchCredentials().then((cred) => {
      if (cred) {
        this.setState({
          oldPassword: cred.password,
          mobileNumber: cred.username,
        });
      }
    });
  }

  renderSuccess() {
    this.setState({ success: true });
    setTimeout(() => {
      if (this.props.bike.type === 'BLE')
        this.props.navigation.navigate('TurnOnBluetooth', {});
      else
        this.props.updateUser({
          type: 'Store_UpdateUser',
          payload: {
            isBikeRegistered: true,
          },
        });
    }, 1000);
  }

  render() {
    const formDataValid =
      this.state.email &&
      this.validateEmail(this.state.email) &&
      this.state.name &&
      this.state.password &&
      this.state.password === this.state.confirmPassword;
    if (!this.state.success && this.props.onboarding.passwordResetSuccess) {
      this.renderSuccess();
    }
    if (this.props.onboarding.errorMessage) {
      Toast.show(this.props.onboarding.errorMessage);
      this.props.updateOnboarding({
        type: 'Store_UpdateOnboarding',
        payload: {
          errorMessage: '',
        },
      });
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
            onChange={(text: string) => this.setState({ email: text })}
            placeHolder="Email*"
            marginVeritical={verticalScale(InputMarginVeritical)}
          />
          <View style={{
            width: '100%', display: 'flex',
            flexDirection: 'row', paddingHorizontal: 40,
            justifyContent: 'space-evenly'
          }}>
            <View style={{ width: '50%', }}>
              <RNPickerSelect
                style={{
                  ...pickerSelectStyles,
                }}
                onValueChange={(value) => this.setState({ gender: value })}
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ]}
                value={this.state.gender}
              />
            </View>
            <View style={{
              width: '50%', display: 'flex',
              justifyContent: 'center', flexDirection: 'row'
            }}>
              <View>
                <RNPickerSelect
                  style={{
                    ...pickerSelectStyles,
                  }}
                  value={this.state.age}
                  onValueChange={(value) => this.setState({ age: value })}
                  items={ages.map(age => {
                    return { label: `${age}`, value: `${age}` }
                  })}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text>Years</Text>
              </View>

            </View>
          </View>
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
                console.log(this.validatePassword(this.state.password));
                if (!this.validatePassword(this.state.password)) {
                  Toast.show(
                    'Password should be 8 characters containing atleast 1 uppercase, 1 lowercase, 1 digit and a special character',
                  );
                  return;
                }
                if (this.validateEmail(this.state.email)) {
                  this.props.changePassword({
                    type: 'ChangePassword',
                    payload: {
                      mobileNumber: this.state.mobileNumber,
                      oldPassword: this.state.oldPassword,
                      newPassword: this.state.password,
                    },
                  });
                  this.props.updatePersonalDetails({
                    type: 'UpdateUser',
                    payload: {
                      email: this.state.email,
                      name: this.state.name,
                    },
                  });
                } else {
                  Toast.show('Enter a valid email');
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
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      changePassword: (params: ChangePassword) => dispatch(params),
      updateUser: (params: Store_UpdateUser) => dispatch(params),
      updateOnboarding: (params: Store_UpdateOnboarding) => dispatch(params),
      updatePersonalDetails: (params: UpdateUser) => dispatch(params),
    };
  },
)(PersonalDetails);
