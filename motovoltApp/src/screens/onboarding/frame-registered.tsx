import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import input from './components/input';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {OnboardingStackParamList} from '../../navigation/onboarding';

type FrameRegisteredNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'FrameRegistered'
>;

type Props = {
  navigation: FrameRegisteredNavigationProp;
  route: RouteProp<OnboardingStackParamList, 'FrameRegistered'>;
};

type State = {};

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: scale(72),
  },
  helperText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginVertical: scale(8),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  optional: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginVertical: scale(8),
    color: Colors.BORDER_GREY,
  },
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: verticalScale(40),
  },
  msg: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  logo: {
    marginTop: verticalScale(16),
    resizeMode: 'contain',
  },
  image: {
    marginBottom: verticalScale(16),
    height: verticalScale(200),
    width: '100%',
  },
});

export default class RegisterBike extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <CTAHeader
          hasBackButton
          title="Bike Registered Successfully"
          onBackClick={() => this.props.navigation.goBack()}
        />
        <Image
          source={require('../../assets/images/motovolt_logo_medium.png')}
          style={styles.logo}
        />
        <Image
          source={require('../../assets/images/cycle_with_headlight.png')}
          style={styles.image}
        />
        <Text style={styles.msg}>Welcome to the MotoVolt family!</Text>
        <Text style={styles.msg}>Happy e-cycling to you…</Text>
        <View style={styles.bottomContainer}>
          <View style={inputStyles.container}>
            <Text style={inputStyles.helperText}>
              Give a custom name for your bike
            </Text>
            <Input placeHolder={'This name will be displayed on the screen'} />
            <Text style={inputStyles.optional}>(Optional)</Text>
          </View>
          <CTAButton
            text={'Continue'}
            textColor={Colors.WHITE}
            backgroundColor={Colors.NAVY_BLUE}
            onPress={() =>
              this.props.navigation.navigate('PersonalDetails', {})
            }
          />
        </View>
      </View>
    );
  }
}
