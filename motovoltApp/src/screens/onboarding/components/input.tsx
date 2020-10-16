import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {scale, verticalScale} from '../../../styles/size-matters';
import Colors from '../../../styles/colors';

const styles = StyleSheet.create({
  input: {
    width: scale(300),
    paddingHorizontal: scale(15),
    height: 44,
    flexDirection: 'row',
    borderColor: Colors.BORDER_GREY,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 12,
    alignItems: 'center',
  },
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
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
  hasPrefix?: boolean;
  prefix?: string;
  onChange?: (text: string) => void;
};

export default (props: Props) => {
  return (
    <View
      style={{
        ...styles.input,
        ...{
          marginVertical: props.marginVeritical,
        },
        ...(props.showError ? {borderColor: '#DE2929'} : {}),
      }}>
      {props.hasPrefix ? (
        <Text style={styles.prefix}>{props.prefix}</Text>
      ) : null}
      <TextInput
        allowFontScaling
        value={props.value}
        blurOnSubmit
        numberOfLines={1}
        onChangeText={(text: string) => {
          if (props.onChange) {
            if (props.hasPrefix) return props.onChange(props.prefix + text);
            return props.onChange(text);
          }
        }}
        secureTextEntry={props.secure}
        style={{
          width: '100%',
          flex: 1,
        }}
        maxLength={props.maxLength || 100}
        placeholder={props.placeHolder}
        placeholderTextColor={Colors.BORDER_GREY}
        keyboardType={props.keyboardNumericType ? 'phone-pad' : undefined}
      />
    </View>
  );
};
