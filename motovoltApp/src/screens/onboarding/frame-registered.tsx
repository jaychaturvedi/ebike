import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';
import Input from './components/input';
import input from './components/input';

type Props = {};

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
    height: scale(70),
    width: scale(70),
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
        <CTAHeader hasBackButton title="Bike Registered Successfully" />
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
          />
        </View>
      </View>
    );
  }
}
