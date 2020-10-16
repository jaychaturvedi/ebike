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
        top: scale(8),
        right: scale(8),
        borderRadius: scale(50),
      }}
    />
  );
};
