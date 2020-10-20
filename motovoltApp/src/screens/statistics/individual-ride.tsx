import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import TipCard from '../../components/tip-card';
import Swiper from 'react-native-swiper';
import RideMetric from '../../components/ride-metric';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {StatisticsStackParamList} from '../../navigation/statistics';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import Map from '../../components/map';
import LanguageSelector from '../../translations';
import {ThemeContext} from '../../styles/theme/theme-context';

type ReduxState = {
  ride: TStore['ride'];
};

type IndividualRideNavigationProp = StackNavigationProp<
  StatisticsStackParamList,
  'IndividualRide'
>;

interface Props extends ReduxState {
  navigation: IndividualRideNavigationProp;
  route: RouteProp<StatisticsStackParamList, 'IndividualRide'>;
}

type State = {};

class IndividualRide extends React.PureComponent<Props, State> {
  render() {
    let Theme = this.context.theme as any;
    return (
      <View style={{...styles.container, backgroundColor: Theme.BACKGROUND}}>
        <Header
          hasBackButton
          title={LanguageSelector.t('myRides.myRides')}
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.map}>
            {this.props.ride.path.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text>
                  {LanguageSelector.t('gps.noDataAvailable')}
                </Text>
              </View>
            ) : (
              <Map
                location={this.props.ride.path.map((point) => {
                  return {
                    latitude: point.lat,
                    longitude: point.long,
                  };
                })}
              />
            )}
          </View>
          <View style={styles.tip}>
            <Swiper
              loop={true}
              dot={<View />}
              activeDot={<View />}
              index={0}
              autoplay
              automaticallyAdjustContentInsets
              ref="mySwiper">
              <View style={styles.slide}>
                <TipCard
                  header={LanguageSelector.t('myRides.tipToImproveRide')}
                  tip="Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut"
                />
              </View>
              <View style={styles.slide}>
                <TipCard
                  header={LanguageSelector.t('myRides.tipToImproveRide')}
                  tip="Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod tempor invidunt ut"
                />
              </View>
            </Swiper>
          </View>
          <View style={styles.metrics}>
            <RideMetric
              header1={LanguageSelector.t('myRides.distance')}
              header2={LanguageSelector.t('myRides.duration')}
              icon1={require('../../assets/icons/total_distance_icon.png')}
              icon2={require('../../assets/icons/charge_time_remaining.png')}
              value1={String(this.props.ride.totalDistanceKm)}
              value2={String(this.props.ride.durationSec)}
              unit1="Km"
              unit2=""
            />
            <RideMetric
              header1={LanguageSelector.t('myRides.avgSpeed')}
              header2={LanguageSelector.t('myRides.maxSpeed')}
              icon1={require('../../assets/icons/average_speed_icon.png')}
              icon2={require('../../assets/icons/max_speed_icon.png')}
              value1={String(this.props.ride.avgSpeedKmph)}
              value2={String(this.props.ride.maxSpeedKmph)}
              unit1="Kmph"
              unit2="Kmph"
            />
            <RideMetric
              header1={LanguageSelector.t('myRides.greenMiles')}
              header2={LanguageSelector.t('myRides.caloriesBurnt')}
              icon1={require('../../assets/icons/green_miles_icon.png')}
              icon2={require('../../assets/icons/calories_icon_blue.png')}
              value1={String(this.props.ride.greenMilesKm)}
              value2={String(this.props.ride.caloriesBurnt)}
              unit1="Km"
              unit2=""
            />
            <RideMetric
              header1={LanguageSelector.t('myRides.petrolSavings')}
              header2={LanguageSelector.t('myRides.rideScore')}
              icon1={require('../../assets/icons/inr_icon.png')}
              icon2={require('../../assets/icons/star_icon_large.png')}
              value1={String(this.props.ride.petrolSavingsInr)}
              value2={String(this.props.ride.score)}
              unit1="INR"
              unit2="/10"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

IndividualRide.contextType = ThemeContext;

export default connect(
  (store: TStore): ReduxState => {
    return {
      ride: store['ride'],
    };
  },
)(IndividualRide);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  map: {
    height: moderateScale(200),
    backgroundColor: 'white',
    borderRadius: moderateScale(15),
    margin: moderateScale(15),
  },
  slide: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  tip: {
    height: moderateScale(100),
  },
  metrics: {
    flex: 1,
    padding: moderateScale(15),
  },
});
