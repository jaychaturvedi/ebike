import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {Left, Text, FooterTab, Button, Icon} from 'native-base';
import {scale, moderateScale} from 'react-native-size-matters';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigation/home';
import Map from '../../components/map';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ReadBikeLocation} from 'src/service/redux/actions/saga';
import Moment from 'moment';
import LanguageSelector from '../../translations';

type HomeNavigationProp = StackNavigationProp<HomeStackParamList, 'Gps'>;

interface ReduxState {
  bike: TStore['bike'];
  readBikeLocation: (params: ReadBikeLocation) => void;
}

interface Props extends ReduxState {
  navigation: HomeNavigationProp;
  route: RouteProp<HomeStackParamList, 'Gps'>;
}

type State = {
  spinAnim: any;
};

class GPSLui extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {spinAnim: new Animated.Value(0)};
  }

  componentDidMount() {
    this.props.readBikeLocation({
      type: 'ReadBikeLocation',
      payload: {
        bikeId: this.props.bike.id,
      },
    });
  }

  render() {
    console.log('Props', this.props.bike);
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <Header
          title={LanguageSelector.t('gps.gps')}
          hasBackButton
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View style={styles.mapView}>
          <Map
            location={[
              {
                latitude: this.props.bike.lat,
                longitude: this.props.bike.long,
              }
            ]}
          />
        </View>
        <View style={styles.footerView}>
          <View style={styles.footerDescription}>
            <View style={{width: '20%'}}>
              {/* Marker Image */}
              <View style={styles.markerImage}>
                <Image
                  source={require('../../assets/icons/location_pin.png')}></Image>
              </View>
            </View>
            <View style={{width: '60%'}}>
              {/* description */}
              <Text style={{fontSize: moderateScale(16)}}>
                {LanguageSelector.t('gps.finalPosition')}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  lineHeight: moderateScale(30),
                }}>
                {this.props.bike.lastLocationKnownTime}
              </Text>
              <Text></Text>
            </View>
            <View style={{width: '20%', alignItems: 'center'}}>
              {/* Refresh */}
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(this.state.spinAnim, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.circle,
                    useNativeDriver: true,
                  }).start();
                  this.props.readBikeLocation({
                    type: 'ReadBikeLocation',
                    payload: {
                      bikeId: this.props.bike.id,
                    },
                  });
                  setTimeout(
                    () => this.setState({spinAnim: new Animated.Value(0)}),
                    1000,
                  );
                }}>
                <Animated.Image
                  style={{transform: [{rotate: spin}]}}
                  source={require('../../assets/icons/refresh_icon.png')}
                />
              </TouchableOpacity>
              <Text style={{fontSize: moderateScale(12)}}>
                {LanguageSelector.t('gps.refresh')}
              </Text>
            </View>
          </View>
          <View style={styles.footerAddress}>
            <View style={{width: '80%'}}>
              <Text style={{fontSize: scale(12)}}>
                {this.props.bike.address}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{fontSize: scale(12)}}>
                {Moment(this.props.bike.lastLocationKnownTime).fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      readBikeLocation: (params: ReadBikeLocation) => dispatch(params),
    };
  },
)(GPSLui);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  mapView: {
    flex: 1,
    backgroundColor: 'red',
  },
  footerView: {
    height: '20%',
    padding: moderateScale(20),
    backgroundColor: '#FFFFFF',
  },
  markerImage: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  footerDescription: {
    height: '70%',
    flexDirection: 'row',
  },
  footerAddress: {
    height: '30%',
    flexDirection: 'row',
    paddingTop: moderateScale(10),
    flex: 1,
  },
});
