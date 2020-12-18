import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import Colors from '../../../../styles/colors';
import {ThemeContext} from '../../../../styles/theme/theme-context';
import ChargingStatusCharging from '../../../../assets/svg/charging-status-charging-small';
import ChargingStatusCharged from '../../../../assets/svg/charging-status-charged-small';
import StartIcon from '../../../../assets/svg/start';
import StopIcon from '../../../../assets/svg/stop';

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
  onChargeClick: () => void;
  charging: boolean;
  chargePercentage: number;
  riding: boolean;
  disabled: boolean;
};

export default class LockButton extends React.Component<Props, {}> {
  render() {
    let props = this.props;
    let Theme = this.context.theme;
    if (props.charging) {
      return (
        <Button
          style={styles.lock}
          onPress={props.onChargeClick}
          disabled={props.disabled}>
          {props.chargePercentage !== 100 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ChargingStatusCharging height={32} />
              <Text
                style={{
                  marginTop: 4,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {props.chargePercentage}
                {'%'}
              </Text>
            </View>
          )}
          {props.chargePercentage === 100 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ChargingStatusCharged height={32} />
              <Text
                style={{
                  marginTop: 4,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {props.chargePercentage}
                {'%'}
              </Text>
            </View>
          )}
        </Button>
      );
    }
    return (
      <Button
        style={styles.lock}
        onPress={props.onClick}
        disabled={props.disabled}>
        {props.riding && <StopIcon height={54} />}
        {!props.riding && <StartIcon height={54} />}
      </Button>
    );
  }
}
LockButton.contextType = ThemeContext;
