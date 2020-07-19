import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import Input from './components/input';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding'

type IntroSwiperNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ForgotPassword'
>;

type Props = {
  navigation: IntroSwiperNavigationProp,
  route: RouteProp<OnboardingStackParamList, 'ForgotPassword'>
};


type State = {
  mobile: string
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    alignItems: 'center',
  },
  body: {
    marginVertical: verticalScale(40),
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: verticalScale(40),
  },
});

export default class ForgotPassword extends React.PureComponent<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      mobile: "",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CTAHeader />
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.body}>
          <Input 
            placeHolder="Enter Registered Mobile No" 
            onChange={(text: string) => this.setState({mobile: text})} 
          />
        </View>
        <View style={styles.footer}>
          <CTAButton
            disabled={!this.state.mobile}
            text={'Verify'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() => this.props.navigation.navigate('OTP', { onSuccessScreen: 'CreateNewPassword' })}
          />
        </View>
      </View>
    );
  }
}
