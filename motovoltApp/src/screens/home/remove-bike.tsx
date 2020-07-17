import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Header} from 'native-base';
import {scale, verticalScale} from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import FontWeight from '../../styles/font-weight';

type Props = {
  onBackClick?: () => void;
  onContinue?: () => void;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.BG_GREY,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    marginVertical: verticalScale(24),
  },
  header: {
    fontSize: 20,
    fontWeight: FontWeight.BOLD,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: Colors.WHITE,
    padding: scale(16),
    borderRadius: 8,
    marginVertical: verticalScale(16),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardWarning: {
    width: scale(24),
    height: scale(24),
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: FontWeight.BOLD,
    color: Colors.WARNING_RED,
  },
  cardBody: {
    fontSize: 14,
    color: Colors.BLACK,
    marginVertical: verticalScale(16),
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.BLACK,
  },
  link: {
    fontSize: 12,
    color: Colors.LINK_BLUE,
    textDecorationLine: 'underline',
  },
});

export default function RegisterBike(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cycle A</Text>
      <View style={styles.body}>
        <Image
          source={require('../../assets/images/cycle.png')}
          style={{height: scale(240)}}
          width={scale(360)}
        />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={require('../../assets/icons/warning_red_icon.png')}
              style={styles.cardWarning}
            />
            <Text style={styles.cardTitle}>{'   '}Cycle Unavailable</Text>
          </View>
          <Text style={styles.cardBody}>
            Please remove this bike from your app by clicking on the button
            below.
          </Text>
          <Text>
            <Text style={styles.cardSubtitle}>
              For further assistance, please contact{' '}
            </Text>
            <Text style={styles.link}>customer support</Text>
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CTAButton
          onPress={props.onContinue}
          text={'Remove This Bike'}
          textColor={Colors.WHITE}
          backgroundColor={Colors.NAVY_BLUE}
        />
      </View>
    </View>
  );
}
