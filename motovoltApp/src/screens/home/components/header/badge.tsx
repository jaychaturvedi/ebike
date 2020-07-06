import React from 'react';
import {View} from 'react-native';
import {scale} from '../../../../styles/size-matters';

export default () => {
  return (
    <View
      style={{
        width: scale(10),
        height: scale(10),
        zIndex: 1,
        position: 'absolute',
        top: scale(10),
        right: scale(12),
        backgroundColor: 'red',
        borderRadius: scale(50),
      }}
    />
  );
};
