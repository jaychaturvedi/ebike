import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { scale } from '../styles/size-matters';

type Props = {
  text: string;
  textColor: string;
  borderColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
};

export default (props: Props) => {
  return (
    <Button
      onPress={props.onPress}
      style={{
        width: scale(300),
        justifyContent: 'center',
        backgroundColor: props.backgroundColor ?? 'transparent',
        borderColor: props.borderColor ?? 'transparent',
        borderWidth: props.borderColor ? 1 : 0,
        borderRadius: 10,
      }}>
      <Text style={{ color: props.textColor, fontSize: 16 }}>{props.text}</Text>
    </Button>
  );
};
