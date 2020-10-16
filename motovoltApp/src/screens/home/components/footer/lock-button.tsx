import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import Colors from '../../../../styles/colors';
import { ThemeContext } from '../../../../styles/theme/theme-context';

const styles = StyleSheet.create({
  lock: {
    backgroundColor: Colors.LOCK_PINK,
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
});

type Props = {
  onClick: () => void;
  locked: boolean;
  disabled: boolean;
};

export default class LockButton extends React.Component<Props, {}> {
  render() {
    let props = this.props
    let Theme = this.context.theme
    return (
      <Button
        style={styles.lock}
        onPress={props.onClick}
        disabled={props.disabled}>
        {props.locked && (
          <Image
            source={require('../../../../assets/icons/lock_icon.png')}
            style={{ height: '100%', width: '100%' }}
          />
        )}
        {!props.locked && (
          <Image
            source={require('../../../../assets/icons/unlock_icon.png')}
            style={{ height: '100%', width: '100%' }}
          />
        )}
      </Button>
    );
  }
}
LockButton.contextType = ThemeContext
