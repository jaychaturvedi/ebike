import React from 'react';
import { View, ScrollView } from 'react-native';
import Footer from '../home/components/footer';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import Timeline from '../home/components/timeline';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StartRide, EndRide, Speedometer, ReadNotifications } from '../../service/redux/actions/saga';
import { TStore } from 'src/service/redux/store';
import { Store_UpdateNotification } from 'src/service/redux/actions/store';

interface ReduxState {
  updateNotifications: (params: Store_UpdateNotification) => void,
  getNotifications: (params: ReadNotifications) => void
  notifications: TStore['notifications']
  user: TStore['user']
}

interface Props extends ReduxState { }

class Notifications extends React.PureComponent<Props, {}> {

  componentDidMount() {
    this.props.getNotifications({
      type: 'ReadNotifications',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10
      }
    })
  }

  componentWillUnmount() {
    this.props.updateNotifications({
      type: 'Store_UpdateNotification',
      payload: {
        showNotifications: false
      }
    })
  }

  render() {
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
          hasSubtitle
          title={'Notifications'}
          subtitle={this.props.user.defaultBikeId}
          onBackClick={() => {
            this.props.updateNotifications({
              type: 'Store_UpdateNotification',
              payload: {
                showNotifications: false
              }
            })
          }}
        />
        <ScrollView style={{ flex: 1, paddingVertical: 16 }}>
          <Timeline
            title={'13/04/2020 - Mon'}
            // data={[
            //   {
            //     time: '09:00',
            //     title: 'Archery Training',
            //     description:
            //       'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
            //     hasFollow: true,
            //     viewed: true,
            //   },
            //   {
            //     time: '10:45',
            //     title: 'Play Badminton',
            //     viewed: true,
            //     description:
            //       'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
            //   },
            //   {
            //     time: '12:00',
            //     title: 'Lunch',
            //     viewed: true,
            //   },
            //   {
            //     time: '14:00',
            //     title: 'Watch Soccer',
            //     description:
            //       'Team sport played between two teams of eleven players with a spherical ball. ',
            //   },
            //   {
            //     time: '16:30',
            //     title: 'Go to Fitness center',
            //     description:
            //       'Look out for the Best Gym & Fitness Centers around me :)',
            //   },
            // ]}
            data={Object.keys(this.props.notifications.data).map(notification => {
              return {
                description: this.props.notifications.data[notification].body,
                hasFollow: true,
                time: this.props.notifications.data[notification].time,
                title: this.props.notifications.data[notification].title,
                viewed: this.props.notifications.data[notification].isStale
              }
            })}
          />
          {/* <Timeline
            title={'15/04/2020 - Wed'}
            data={[
              {
                time: '09:00',
                title: 'Archery Training',
                description:
                  'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                hasFollow: true,
                viewed: true,
              },
            ]}
          /> */}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      notifications: store['notifications'],
      user: store['user']
    };
  }, (dispatch: Dispatch) => {
    return {
      updateNotifications: (params: Store_UpdateNotification) => dispatch(params),
      getNotifications: (params: ReadNotifications) => dispatch(params)
    };
  }
)(Notifications);

