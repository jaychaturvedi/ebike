import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from '../styles/size-matters';
import Colors from '../styles/colors';
import CTAButton from '../components/cta-button';

type Props = {
  msg: string;
  subMsg?: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    padding: scale(30),
    height: '100%',
    width: '100%',
    backgroundColor: Colors.NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(125),
    height: scale(125),
  },
  text: {
    fontSize: 24,
    paddingTop: verticalScale(18),
    lineHeight: 25,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: 16,
    lineHeight: 25,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});

export default function Success(props: Props) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/thumb_up.png')}
          style={styles.image}
        />
        <Text style={styles.text} numberOfLines={1}>
          {props.msg}
        </Text>
        <Text style={styles.textContent}>{props.subMsg}</Text>
      </View>
      {props.buttonText && (
        <CTAButton
          onPress={props.onButtonPress}
          text={props.buttonText}
          backgroundColor={Colors.WHITE}
          textColor={Colors.NAVY_BLUE}
        />
      )}
    </View>
  );
}
