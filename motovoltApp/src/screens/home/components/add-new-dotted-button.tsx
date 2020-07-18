import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import Colors from '../../../styles/colors';
import FontWeight from '../../../styles/font-weight';
import {scale, verticalScale} from '../../../styles/size-matters';
import {Button} from 'native-base';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: Colors.BORDER_GREY,
    backgroundColor: 'transparent',
    width: '100%',
    height: verticalScale(48),
  },
  plus: {
    width: scale(16),
    height: scale(16),
    opacity: 0.7,
  },
  title: {
    fontSize: 14,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.BORDER_GREY,
  },
});

type Props = {
  text: string;
  onPress: () => void;
};

export default function AddNewDottedButton(props: Props) {
  return (
    <Button style={styles.container} onPress={props.onPress}>
      <Image
        source={require('../../../assets/icons/plus.png')}
        style={styles.plus}
      />
      <Text style={styles.title}>
        {'      '}
        {props.text}
      </Text>
    </Button>
  );
}
