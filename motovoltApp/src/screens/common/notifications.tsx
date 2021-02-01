import Header from '../home/components/header';
import Colors from '../../styles/colors';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ReadNotifications} from '../../service/redux/actions/saga';
import {TStore, TNotification} from 'src/service/redux/store';
import {Store_UpdateNotification} from 'src/service/redux/actions/store';
import LanguageSelector from '../../translations';
import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Messaging from '../../assets/svg/message';
import Promo from '../../assets/svg/promo';
import Warning from '../../assets/svg/warning';
import Card from '../../screens/common/components/card';
import {ClearNotifications} from 'src/service/redux/actions/saga/notification-actions';
import Moment from 'moment';
import EmptyNotification from '../../assets/svg/empty_notification';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  day: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
  },
});

interface ReduxState {
  updateNotifications: (params: Store_UpdateNotification) => void;
  clearNotifications: (params: ClearNotifications) => void;
  getNotifications: (params: ReadNotifications) => void;
  notifications: TStore['notifications'];
  user: TStore['user'];
  bike: TStore['bike'];
}

interface Props extends ReduxState {}

function getHeaderIcon(type: TNotification['type']) {
  switch (type) {
    case 'E':
      return <Warning style={{marginRight: 6}} />;
    case 'N':
      return <Messaging style={{marginRight: 6}} />;
    case 'P':
      return <Promo style={{marginRight: 6}} />;
    default:
      return;
  }
}

class Notification extends React.PureComponent<Props, {}> {
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

  render() {
    const dayWise: {[date: string]: TNotification[]} = {};
    Object.keys(this.props.notifications.data).forEach((item) => {
      dayWise[this.props.notifications.data[item].date] = [
        ...(dayWise[this.props.notifications.data[item].date] ?? []),
        this.props.notifications.data[item],
      ];
    });
    const isEmpty = Object.keys(dayWise).length === 0;
    const today = Moment().format('MM-DD-YYYY');
    const yesterday = Moment().add(-1, 'day').format('MM-DD-YYYY');
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#F6F6F6',
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
          hideNotification
        />
        {isEmpty ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <EmptyNotification style={{marginBottom: 54}} />
            <Text style={{fontSize: 23, fontWeight: '500'}}>
              {LanguageSelector.t('noNotifications')}
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 12,
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
            }}>
            {Object.keys(dayWise).map((date, dateIndex) => {
              return (
                <View style={{marginBottom: 10, width: '100%'}}>
                  <View style={styles.day}>
                    <Text style={{color: 'rgba(0,0,0,0.4)'}}>
                      {date === today
                        ? 'Today'
                        : date === yesterday
                        ? 'Yesterday'
                        : date}
                    </Text>
                    {dateIndex === 0 ? (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.clearNotifications({
                            type: 'ClearNotifications',
                            payload: {},
                          })
                        }>
                        <Text>Clear all</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View style={styles.container}>
                    {dayWise[date].map((data, index) => {
                      return (
                        <React.Fragment key={index.toString()}>
                          <Card
                            title={data.title}
                            description={data.message}
                            time={data.time}
                            headerIcon={getHeaderIcon(data.type)}
                            headerImage={
                              data.titleImgUrl ? (
                                <Image
                                  width={48}
                                  height={48}
                                  style={{
                                    resizeMode: 'contain',
                                  }}
                                  source={{
                                    height: 48,
                                    width: 48,
                                    uri: data.titleImgUrl,
                                  }}
                                />
                              ) : undefined
                            }
                            headerMedia={
                              undefined
                              // data.mediaUrl ? (
                              //   <VideoPlayer
                              //     video={{
                              //       uri: data.mediaUrl,
                              //     }}
                              //     thumbnail={{
                              //       uri: data.titleImgUrl,
                              //     }}
                              //   />
                              // ) : null
                              // <Image
                              //   width={48}
                              //   height={48}
                              //   style={{
                              //     resizeMode: 'contain',
                              //   }}
                              //   source={{
                              //     height: 48,
                              //     width: 48,
                              //     uri:
                              //       'https://motovolt.s3.us-east-2.amazonaws.com/cycle_images/ice.png',
                              //   }}
                              // />
                            }
                            bodyImage={
                              data.bodyImgUrl ? (
                                <Image
                                  height={width / 3}
                                  style={{
                                    resizeMode: 'contain',
                                  }}
                                  source={{
                                    height: width / 3,
                                    uri: data.bodyImgUrl,
                                  }}
                                />
                              ) : undefined
                            }
                          />
                          {index < dayWise[date].length - 1 ? (
                            <View
                              style={{borderWidth: 1, borderColor: '#E5E5E5'}}
                            />
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </View>
                </View>
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
      clearNotifications: (params: ClearNotifications) => dispatch(params),
      getNotifications: (params: ReadNotifications) => dispatch(params),
    };
  },
)(Notification);
