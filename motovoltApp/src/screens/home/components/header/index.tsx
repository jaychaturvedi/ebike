import React from 'react';
import Badge from './badge';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Button, Subtitle, Title} from 'native-base';
import {scale} from '../../../../styles/size-matters';
import Colors from '../../../../styles/colors';
import {verticalScale} from 'react-native-size-matters';

type Props = {
  hasPromoNotification?: boolean;
  isBluetoothOn?: boolean;
  hasNotification?: boolean;
  title: string;
  subtitle?: string;
  backgroundColor: string;
  hasSubtitle?: boolean;
  hasTabs?: boolean;
  hasBackButton?: boolean;
  hidePromo?: boolean;
  hideBluetooth?: boolean;
  hideNotification?: boolean;
  onBackClick?: () => void;
  onPromotionClick?: () => void;
  onBluetoothClick?: () => void;
  onNotificationClick?: () => void;
};

export default class CHeader extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Header
        style={{
          backgroundColor: this.props.backgroundColor,
        }}
        noShadow
        hasSubtitle
        hasTabs={this.props.hasTabs}
        androidStatusBarColor={this.props.backgroundColor}>
        <View style={styles.container}>
          <Left style={styles.left}>
            {this.props.hasBackButton && (
              <TouchableOpacity onPress={this.props.onBackClick}>
                <Image
                  source={require('../../../../assets/icons/back.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            <View style={{alignItems: 'flex-start'}}>
              <Title style={styles.title}>{this.props.title}</Title>
              {this.props.hasSubtitle && (
                <Subtitle style={styles.subtitle}>
                  {this.props.subtitle}
                </Subtitle>
              )}
            </View>
          </Left>
          <Right>
            {!this.props.hidePromo && (
              <Button transparent onPress={this.props.onPromotionClick}>
                {this.props.hasPromoNotification && <Badge />}
                <Image
                  source={require('../../../../assets/icons/promos.png')}
                  style={styles.rightIcon}
                />
              </Button>
            )}
            {!this.props.hideBluetooth && (
              <Button transparent onPress={this.props.onBluetoothClick}>
                <Image
                  source={require('../../../../assets/icons/bluetooth.png')}
                  style={{
                    ...styles.rightIcon,
                    height: verticalScale(24),
                    opacity: this.props.isBluetoothOn ? 1 : 0.3,
                  }}
                />
              </Button>
            )}
            {!this.props.hideNotification && (
              <Button transparent onPress={this.props.onNotificationClick}>
                {this.props.hasNotification && <Badge />}
                <Image
                  source={require('../../../../assets/icons/notification.png')}
                  style={styles.rightIcon}
                />
              </Button>
            )}
          </Right>
        </View>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginLeft: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(18),
  },
  title: {fontSize: 20, fontWeight: 'bold', color: Colors.BLACK},
  subtitle: {fontSize: 12, fontWeight: 'normal', color: Colors.BLACK},
  rightIcon: {width: scale(26), height: verticalScale(26)},
});
