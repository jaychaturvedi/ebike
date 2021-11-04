import React from 'react';
import {View} from 'react-native';

export default function DragHandle() {
  return (
    <View
      style={{
        width: '100%',
        height: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.37)',
          width: 48,
        }}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.37)',
          width: 48,
        }}
      />
    </View>
  );
}
