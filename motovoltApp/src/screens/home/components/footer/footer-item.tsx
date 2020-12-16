import React from 'react';
import { Button, Icon, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../styles/theme/theme-context';

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
export default class FooterItem extends React.Component<Props, {}> {
  render() {
    let props = this.props
    let Theme = this.context.theme //load 
    return (
      <View style={{ ...styles.container }}>
        {props.visible && (
          <View
            style={{
              ...styles.topBorder,
              backgroundColor: props.selected ? Theme.TEXT_WHITE : 'transparent',
            }}
          />
        )}
        <Button
          style={{
            backgroundColor: Theme.WHITE,
            elevation: 0,
            flex:1
          }}
          onPress={props.onPress}>
          {props.visible && props.icon}
        </Button>
      </View>
    );
  }
}

FooterItem.contextType = ThemeContext