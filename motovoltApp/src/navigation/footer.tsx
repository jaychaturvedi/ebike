import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FooterNav, {TFooterItem} from '../screens/home/components/footer/index';
import HomeStack from './home';
import StatisticsStack from './statistics';
import MyCycleStack from './cycle';
import MenuStack from './menu';
import RateRide from '../screens/ride/rate-ride';
import RideOn from '../screens/ride/ride-on';
import {TStore} from '../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Notifications from '../screens/common/notifications';
import {Store_UpdateNotification} from 'src/service/redux/actions/store';
import {ReadChargingStatus} from 'src/service/redux/actions/saga/bike-actions';
import Charging from '../screens/charging';
import moment from 'moment';

type ReduxState = {
  bike: TStore['bike'];
  notifications: TStore['notifications'];
  updateNotifications: (params: Store_UpdateNotification) => void;
  readChargingStatus: (params: ReadChargingStatus) => void;
};

interface Props extends ReduxState {}

type State = {
  screen: TFooterItem;
  riding: boolean;
  hideFooter?: boolean;
  showChargingScreen: boolean;
};

class FooterNavigation extends React.PureComponent<Props, State> {
  batteryStatusInterval = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      screen: 'home',
      riding: false,
      showChargingScreen: false,
      hideFooter: undefined,
    };
  }

  startTimer() {
    this.batteryStatusInterval = setInterval(() => {
      this.props.readChargingStatus({
        type: 'ReadChargingStatus',
        payload: {
          bikeId: this.props.bike.id,
        },
      });
    }, 10000);
  }

  stopTimer() {
    clearInterval(this.batteryStatusInterval);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  updateNotification() {
    if (this.props.notifications.showNotifications) {
      console.log('Show notifications');
      this.props.updateNotifications({
        type: 'Store_UpdateNotification',
        payload: {
          showNotifications: false,
        },
      });
    }
  }

  renderScreen(screen: TFooterItem) {
    console.log('Entered stack renderer');
    switch (screen) {
      case 'home':
        return <HomeStack />;
      case 'cycle':
        return <MyCycleStack />;
      case 'chart':
        return <StatisticsStack />;
      case 'menu':
        return <MenuStack />;
      default:
        return <HomeStack />;
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.bike.batteryCharging && state.riding) {
      state.riding = false;
    }
    return state;
  }

  render() {
    const temp =
      ((100 - this.props.bike.batteryChargePer) *
        (this.props.bike.chargingEta * 60 * 60)) /
      100;

    if (this.state.showChargingScreen)
      return (
        <Charging
          chargeCycle={this.props.bike.batteryChargeCycle}
          chargePercentage={Math.round(this.props.bike.batteryChargePer)}
          kms={Math.round(
            (this.props.bike.chargingDistance / 100) *
              this.props.bike.batteryChargePer,
          )}
          onClose={() => {
            this.setState({
              showChargingScreen: false,
            });
          }}
          timeRemaining={moment.utc(temp * 1000).format('HH:mm:ss')}
        />
      );
    return (
      <View style={styles.container}>
        <View style={{...styles.screen}}>
          {this.props.notifications.showNotifications ? (
            <Notifications />
          ) : this.state.riding ? (
            <RideOn />
          ) : (
            this.renderScreen(this.state.screen)
          )}
        </View>
        {!this.state.hideFooter && (
          <FooterNav
            charging={this.props.bike.batteryCharging}
            chargePercentage={Math.round(this.props.bike.batteryChargePer)}
            riding={this.state.riding}
            onItemSelect={(item) => {
              this.updateNotification();
              this.setState({screen: item});
            }}
            onChargeClick={() => {
              this.setState({
                showChargingScreen: true,
              });
            }}
            onLockClick={() => {
              this.setState({
                riding: !this.state.riding,
              });
            }}
            selectedItem={this.state.screen}
            lockOnlyVisible={this.state.riding}
            // onLockVerified={(verified) =>
            //   this.setState({lockVerified: verified, hideFooter: !verified})
            // }
          />
        )}
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      notifications: store['notifications'],
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      updateNotifications: (params: Store_UpdateNotification) =>
        dispatch(params),
      readChargingStatus: (params: ReadChargingStatus) => dispatch(params),
    };
  },
)(FooterNavigation);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  screen: {
    flex: 1,
  },
});
