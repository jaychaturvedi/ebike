import React from 'react';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';
import Tile from '../../components/tile';
import { moderateScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';

type SupportNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'Support'
>;

interface ReduxState {
  bike: TStore['bike']
}

interface Props extends ReduxState {
  navigation: SupportNavigationProp,
  route: RouteProp<MenuStackParamList, 'Support'>
};

type State = {};

class Support extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          console.log('Can\'t handle url: ' + phoneNumber);
        } else {
          return Linking.openURL(phoneNumber)
            .then((data) => console.error("then", data))
            .catch((err) => { throw err; });
        }
      })
      .catch((err) => console.log('An error occurred', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          hasBackButton
          title={'Support'}
          hasSubtitle
          subtitle={this.props.bike.name}
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(20),
          }}>
          <View style={styles.header}>
            <Text style={{ fontSize: moderateScale(16) }}>Help with issues</Text>
            <Text
              style={{
                fontSize: moderateScale(13),
                color: Colors.LINK_BLUE,
                textDecorationLine: 'underline',
              }}
              onPress={() => console.log('View service')}>
              View service
            </Text>
          </View>
          <View style={styles.support}>
            <Tile
              feature="Call us"
              icon={require('../../assets/icons/icons1.5x/call.png')}
              onPress={() => this.dialCall()}
              height={moderateScale(110)}
            />
            <Tile
              feature="Video Call"
              icon={require('../../assets/icons/icons1.5x/video-call.png')}
              onPress={() => this.props.navigation.navigate('ComingSoon', {})}
              premium
              height={moderateScale(110)}
            />
            <Tile
              feature="Report an Issue"
              icon={require('../../assets/icons/icons1.5x/report-issue.png')}
              onPress={() => this.props.navigation.navigate('ReportIssue', {})}
              height={moderateScale(110)}
            />
            <Tile
              feature="Book a Service"
              icon={require('../../assets/icons/icons1.5x/book-service.png')}
              onPress={() => this.props.navigation.navigate('SupportService', {})}
              height={moderateScale(110)}
              premium
            />
            <Tile
              feature="Chat with us"
              icon={require('../../assets/icons/icons1.5x/chat.png')}
              onPress={() => this.props.navigation.navigate('ComingSoon', {})}
              height={moderateScale(110)}
              premium
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike']
    };
  },
)(Support);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
  header: {
    height: moderateScale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  support: {
    paddingVertical: moderateScale(20),
    flex: 1,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
