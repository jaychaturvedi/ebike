import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import Footer from '../home/components/footer';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import Timeline from '../home/components/timeline';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  StartRide,
  EndRide,
  Speedometer,
  ReadNotifications,
} from '../../service/redux/actions/saga';
import {TStore, TNotification} from 'src/service/redux/store';
import {Store_UpdateNotification} from 'src/service/redux/actions/store';
import LanguageSelector from '../../translations';
import Moment from 'moment';
import {Text} from 'native-base';

interface ReduxState {
  updateNotifications: (params: Store_UpdateNotification) => void;
  getNotifications: (params: ReadNotifications) => void;
  notifications: TStore['notifications'];
  user: TStore['user'];
  bike: TStore['bike'];
}

interface Props extends ReduxState {}

class Notifications extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.getNotifications({
      type: 'ReadNotifications',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10,
      },
    });
  }

  componentWillUnmount() {
    this.props.updateNotifications({
      type: 'Store_UpdateNotification',
      payload: {
        showNotifications: false,
      },
    });
  }

  getDay(day: number) {
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return 'Invalid';
    }
  }

  render() {
    const dayWise: {[date: string]: TNotification[]} = {};
    Object.keys(this.props.notifications.data).forEach((item) => {
      dayWise[this.props.notifications.data[item].date] = [
        ...(dayWise[this.props.notifications.data[item].date] ?? []),
        this.props.notifications.data[item],
      ];
    });
    const isEmpty = !Object.keys(this.props.notifications.data).length;
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: Colors.BG_GREY,
        }}>
        <Header
          backgroundColor={Colors.HEADER_YELLOW}
          hasBackButton
          hasSubtitle={false}
          title={LanguageSelector.t('notifications')}
          // subtitle={this.props.bike.name}
          onBackClick={() => {
            this.props.updateNotifications({
              type: 'Store_UpdateNotification',
              payload: {
                showNotifications: false,
              },
            });
          }}
        />
        {isEmpty ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Image
              source={require('../../assets/images/empty_notifications.png')}
              style={{width: '100%', height: '100%', marginBottom: 54}}
              width={82}
              height={82}
            />
            <Text style={{fontSize: 23, fontWeight: "500"}}>
              No notifications
            </Text>
          </View>
        ) : (
          <ScrollView style={{flex: 1, paddingVertical: 16}}>
            {Object.keys(dayWise).map((day) => {
              return (
                <Timeline
                  title={`${Moment(day).format('DD-MM-YYYY')} ${this.getDay(
                    new Date(day).getDay(),
                  )}`}
                  data={dayWise[day].map((notification) => {
                    return {
                      description: notification.body,
                      hasFollow: false,
                      time: notification.time,
                      title: notification.title,
                      viewed: notification.isStale,
                    };
                  })}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      notifications: store['notifications'],
      user: store['user'],
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      updateNotifications: (params: Store_UpdateNotification) =>
        dispatch(params),
      getNotifications: (params: ReadNotifications) => dispatch(params),
    };
  },
)(Notifications);
