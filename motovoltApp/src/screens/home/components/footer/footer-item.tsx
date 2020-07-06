import React from 'react';
import {Button, Icon, View} from 'native-base';
import {StyleSheet} from 'react-native';

type Props = {
  visible: boolean;
  icon: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topBorder: {
    height: 3,
    backgroundColor: 'black',
    width: 35,
    borderRadius: 50,
  },
});

export default function FooterItem(props: Props) {
  return (
    <View style={styles.container}>
      {props.visible && (
        <View
          style={{
            ...styles.topBorder,
            backgroundColor: props.selected ? '#000' : '#fff',
          }}
        />
      )}
      <Button
        style={{
          backgroundColor: '#fff',
          elevation: 0,
        }}
        onPress={props.onPress}>
        {props.visible && props.icon}
      </Button>
    </View>
  );
}
