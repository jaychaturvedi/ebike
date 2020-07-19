import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { scale, verticalScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParamList } from '../../navigation/onboarding'

type IntroSwiperNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'TurnOnBluetooth'
>;

type Props = {
  navigation: IntroSwiperNavigationProp,
  route: RouteProp<OnboardingStackParamList, 'TurnOnBluetooth'>
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: verticalScale(40),
  },
  msg: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
    textAlign: 'center',
  },
  image: {
    marginVertical: verticalScale(16),
    height: verticalScale(200),
    width: '100%',
  },
});

export default function RegisterBike(props: Props) {
  return (
    <View style={styles.container}>
      <CTAHeader
        hasBackButton
        title="Bluetooth Pairing"
        onBackClick={() => props.navigation.goBack()}
      />
      <View style={{ paddingVertical: verticalScale(30), width: '100%' }}>
        <Text style={styles.msg}>Turn ON the cycle to initiate</Text>
        <Text style={styles.msg}>the bluetooth pairing</Text>
        <Image
          source={require('../../assets/images/cycle_with_headlight.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomContainer}>
        <CTAButton
          onPress={() => props.navigation.navigate('Discovering', {})}
          text={'Continue'}
          textColor={Colors.WHITE}
          backgroundColor={Colors.NAVY_BLUE}
        />
      </View>
    </View>
  );
}
