import React from 'react';
import {StyleSheet, View, Image, Text, RefreshControl} from 'react-native';
import Metrics from './components/metrics';
import RideStatSection from './components/ridestats';
import Header from './components/header';
import Colors from '../../styles/colors';
import {scale, verticalScale} from '../../styles/size-matters';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Background from '../../components/background';
import {ReadBikeStat} from '../../service/redux/actions/saga/bike-actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigation/home';
import Map from '../../components/map';
import GPSIcon from '../../assets/svg/GPS_tracker';
import LanguageSelector from '../../translations';
import {downloadFirmware} from '../../service/firmware/update';

type HomeNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type ReduxState = {
  readBikeStat: (params: ReadBikeStat) => void;
  bike: TStore['bike'];
  user: TStore['user'];
};

interface Props extends ReduxState {
  navigation: HomeNavigationProp;
  route: RouteProp<HomeStackParamList, 'Home'>;
}

type State = {
  refreshing: boolean;
};

class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.readBikeStat({
      type: 'ReadBikeStat',
      payload: {
        bikeId: this.props.user.defaultBikeId,
      },
    });
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.readBikeStat({
      type: 'ReadBikeStat',
      payload: {
        bikeId: this.props.user.defaultBikeId,
      },
    });
    this.setState({refreshing: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Background />
        <Header
          title={`${LanguageSelector.t('home.hello')} ${
            this.props.user.name || ''
          }`}
          backgroundColor={Colors.HEADER_YELLOW}
          hasTabs
          onPromotionClick={() => {}}
        />
        <ScrollView
          style={styles.body}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
            />
          }>
          <View
            style={{
              marginTop: verticalScale(20),
              paddingHorizontal: scale(20),
            }}>
            <Metrics
              batteryCharge={String(this.props.bike.batteryChargePer)}
              rangeAvailable={String(this.props.bike.rangeAvailableKm)}
              rangeCovered={String(this.props.bike.rangeCoveredKm)}
            />
          </View>
          <View
            style={{
              position: 'relative',
              top: 0,
              height: 300,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: scale(10),
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/new-bike.png')}
                style={{height: '100%', width: '100%', aspectRatio: 1}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                right: 15,
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: 15,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                numberOfLines={1}>
                {this.props.bike.name}
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                numberOfLines={1}>
                {this.props.bike.isOn
                  ? LanguageSelector.t('home.on')
                  : LanguageSelector.t('home.off')}
              </Text>
              {this.props.bike.type === 'CELLULAR' ? (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Gps', {})}>
                  <GPSIcon />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <RideStatSection
            co2Saving={this.props.bike.co2SavingKg.toString()}
            avgRidescore={this.props.bike.avgRideScore.toString()}
            costRecovered={this.props.bike.costRecoveredPer.toString()}
            greenMiles={this.props.bike.greenMilesKm.toString()}
            petrolInLitre={this.props.bike.petrolInLitre.toString()}
            petrolSavings={Math.floor(
              this.props.bike.petrolSavingsLtr,
            ).toString()}
            totalDistance={this.props.bike.totalDistanceKm.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      readBikeStat: (params: ReadBikeStat) => dispatch(params),
    };
  },
)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG_GREY,
    height: '100%',
  },
  body: {flex: 1},
});
