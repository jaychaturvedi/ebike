import React from 'react';
import {Modal, View} from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default (props: Props) => {
  return (
    <Modal visible transparent animationType={'fade'}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: 'rgba(100,100,100, 0.5)',
        }}>
        {props.children}
      </View>
    </Modal>
  );
};
