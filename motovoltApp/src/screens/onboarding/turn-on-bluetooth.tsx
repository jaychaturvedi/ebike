import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import CTAHeader from './components/header';

type Props = {
  onBackClick?: () => void;
  onContinue?: () => void;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
        onBackClick={props.onBackClick}
      />
      <View style={{paddingVertical: verticalScale(30), width: '100%'}}>
        <Text style={styles.msg}>Turn ON the cycle to initiate</Text>
        <Text style={styles.msg}>the bluetooth pairing</Text>
        <Image
          source={require('../../assets/images/cycle_with_headlight.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomContainer}>
        <CTAButton
          onPress={props.onContinue}
          text={'Continue'}
          textColor={Colors.WHITE}
          backgroundColor={Colors.NAVY_BLUE}
        />
      </View>
    </View>
  );
}
