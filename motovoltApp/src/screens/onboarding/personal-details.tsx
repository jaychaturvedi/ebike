import React from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/onboarding';
import ThumbsUp from '../../components/thumb-up'

type PersonalDetailsNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'PersonalDetails'
>;

type Props = {
  navigation: PersonalDetailsNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'PersonalDetails'>;
};

type State = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  success: boolean
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

export default class PersonalDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
      success: false
    };
  }

  renderSuccess() {
    this.setState({ success: true })
    setTimeout(() => {
      this.props.navigation.navigate('TurnOnBluetooth', {});
      this.setState({ success: false })
    }, 5000)
  }

  render() {
    const formDataValid =
      this.state.email &&
      this.state.name &&
      this.state.password &&
      this.state.password === this.state.confirmPassword;
    return (
      this.state.success ? <ThumbsUp
        msg="Account Created"
      /> :
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
                // this.props.navigation.navigate('TurnOnBluetooth', {});
                this.renderSuccess()
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
