import React from 'react';
import {scale} from '../../../styles/size-matters';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../../styles/colors';

type Props = {
  mode: 'Disabled' | 'Active';
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

const width = scale(32);
const height = scale(24);

export default function (props: Props) {
  return (
    <TouchableOpacity
      disabled={props.mode === "Disabled"}
      onPress={props.onPress}
      style={{
        ...styles.container,
        backgroundColor:
          props.mode === 'Active' ? Colors.NAVY_BLUE : Colors.DISABLED_GREY,
      }}>
      {props.mode === 'Active' ? (
        <Image
          source={require('../../../assets/icons/next-white.png')}
          style={styles.img}
          width={width}
          height={height}
        />
      ) : (
        <Image
          source={require('../../../assets/icons/next-disabled.png')}
          style={styles.img}
          width={width}
          height={height}
        />
      )}
    </TouchableOpacity>
  );
}
