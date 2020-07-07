import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {scale, verticalScale} from '../../../styles/size-matters';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  input: {
    width: scale(300),
    paddingHorizontal: scale(15),
    height: verticalScale(40),
    borderColor: Colors.BORDER_GREY,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: verticalScale(12),
  },
});

type Props = {
  placeHolder?: string;
  maxLength?: number;
  secure?: boolean;
  marginVeritical?: number;
  value?: string;
  onChange?: (text: string) => void;
};

export default (props: Props) => {
  return (
    <TextInput
      allowFontScaling
      value={props.value}
      blurOnSubmit
      numberOfLines={1}
      onChangeText={props.onChange}
      secureTextEntry={props.secure}
      style={{...styles.input, marginVertical: props.marginVeritical}}
      maxLength={props.maxLength || 100}
      placeholder={props.placeHolder}
      placeholderTextColor={Colors.BORDER_GREY}
    />
  );
};
