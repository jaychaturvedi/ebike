import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {scale, verticalScale} from '../../../styles/size-matters';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  input: {
    width: scale(300),
    paddingHorizontal: scale(15),
    height: 44,
    borderColor: Colors.BORDER_GREY,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 12,
  },
});

type Props = {
  placeHolder?: string;
  maxLength?: number;
  secure?: boolean;
  marginVeritical?: number;
  value?: string;
  keyboardNumericType?: boolean;
  showError?: boolean;
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
      style={{
        ...{
          ...styles.input,
          marginVertical: props.marginVeritical,
        },
        ...(props.showError ? {borderColor: '#DE2929'} : {}),
      }}
      maxLength={props.maxLength || 100}
      placeholder={props.placeHolder}
      placeholderTextColor={Colors.BORDER_GREY}
      keyboardType={props.keyboardNumericType ? 'phone-pad' : undefined}
    />
  );
};
