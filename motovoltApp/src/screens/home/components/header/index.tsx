import React from 'react';
import Badge from './badge';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Button, Subtitle, Title} from 'native-base';
import {scale} from '../../../../styles/size-matters';
import Colors from '../../../../styles/colors';
import {verticalScale} from 'react-native-size-matters';
import {TStore} from '../../../../service/redux/store';
import {connect} from 'react-redux';
const objectid = require('react-native-bson/lib/bson/objectid');
import {Dispatch} from 'redux';
import {Store_UpdateNotification} from 'src/service/redux/actions/store';
import {ThemeContext} from '../../../../styles/theme/theme-context';
import Notification from '../../../../assets/svg/notification';
interface ReduxState {
  notifications: TStore['notifications'];
  bike: TStore['bike'];
  showNotifications: (params: Store_UpdateNotification) => void;
}

interface Props extends ReduxState {
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
}

class CHeader extends React.PureComponent<Props, {}> {
  render() {
    let Theme = this.context.theme; //load theme context
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
          <View style={styles.left}>
            {this.props.hasBackButton && (
              <TouchableOpacity onPress={this.props.onBackClick}>
                <Image
                  source={require('../../../../assets/icons/back.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            <View style={{alignItems: 'flex-start'}}>
              <Title
                style={{
                  ...styles.title,
                  color: Theme.TEXT_WHITE, //change theme
                }}>
                {this.props.title}
              </Title>
              {this.props.hasSubtitle && (
                <Subtitle
                  style={{
                    ...styles.subtitle,
                    color: Theme.TEXT_WHITE, //change theme
                  }}>
                  {this.props.subtitle}
                </Subtitle>
              )}
            </View>
          </View>
          <View
            style={{
              width: '30%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {/* {!this.props.hidePromo && (
              <Button transparent onPress={this.props.onPromotionClick}>
                {this.props.hasPromoNotification && <Badge />}
                <Image
                  source={require('../../../../assets/icons/promos.png')}
                  style={styles.rightIcon}
                />
              </Button>
            )} */}
            {this.props.bike.type === 'BLE' && (
              <Button transparent onPress={this.props.onBluetoothClick}>
                <Image
                  source={require('../../../../assets/icons/bluetooth.png')}
                  style={{
                    ...styles.rightIcon,
                    height: scale(24),
                    opacity: this.props.isBluetoothOn ? 1 : 0.3,
                  }}
                />
              </Button>
            )}
            {!this.props.hideNotification && (
              <Button
                transparent
                onPress={() =>
                  // this.props.onNotificationClick
                  this.props.showNotifications({
                    type: 'Store_UpdateNotification',
                    payload: {
                      showNotifications: true,
                    },
                  })
                }>
                {this.props.notifications.isPresent && <Badge />}
                {/* <Image
                  source={require('../../../../assets/icons/notification.png')}
                  style={styles.rightIcon}
                /> */}
                <Notification style={styles.rightIcon}/>
              </Button>
            )}
          </View>
        </View>
      </Header>
    );
  }
}
CHeader.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      notifications: store['notifications'],
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      showNotifications: (params: Store_UpdateNotification) => dispatch(params),
    };
  },
)(CHeader);

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
    flex: 1,
  },
  icon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(18),
  },
  title: {fontSize: 20, fontWeight: 'bold', color: Colors.BLACK},
  subtitle: {fontSize: 12, fontWeight: 'normal', color: Colors.BLACK},
  rightIcon: {width: scale(26), height: scale(26), position: 'relative'},
});
