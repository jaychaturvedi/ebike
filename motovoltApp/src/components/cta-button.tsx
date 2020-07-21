import React from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';
import {scale} from '../styles/size-matters';
import Colors from '../styles/colors';

type Props = {
  text: string;
  textColor: string;
  borderColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  onPress?: () => void;
};

export default (props: Props) => {
  return (
    <Button
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        width: scale(300),
        justifyContent: 'center',
        backgroundColor: props.disabled
          ? Colors.BORDER_GREY
          : props.backgroundColor ?? Colors.BG_GREY,
        borderColor: props.borderColor ?? 'transparent',
        borderWidth: props.borderColor ? 1 : 0,
        borderRadius: 10,
      }}>
      <Text style={{color: props.textColor, fontSize: 16, fontWeight: 'bold'}}>
        {props.text}
      </Text>
    </Button>
  );
};
