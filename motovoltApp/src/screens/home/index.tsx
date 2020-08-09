import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Metrics from './components/metrics';
import RideStatSection from './components/ridestats';
import Header from './components/header';
import Colors from '../../styles/colors';
import {scale, verticalScale} from '../../styles/size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import Background from '../../components/background';

type ReduxState = {
  bike: TStore['bike'];
  user: TStore['user'];
};

interface Props extends ReduxState {}

type State = {};

class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Background />
        <Header
          title={`Hello ${this.props.user.name}`}
          backgroundColor={Colors.HEADER_YELLOW}
          hasTabs
        />
        <ScrollView style={styles.body}>
          <View style={{marginVertical: verticalScale(20)}}>
            <Metrics
              batteryCharge={this.props.bike.batteryChargePer.toString()}
              rangeAvailable={this.props.bike.rangeAvailableKm.toString()}
              rangeCovered={this.props.bike.rangeCoveredKm.toString()}
            />
          </View>
          <View
            style={{
              height: 250,
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: scale(10),
            }}>
            <View
              style={{
                right: scale(100),
                width: '70%',
              }}>
              <Image
                source={require('../../assets/images/cycle.png')}
                style={{height: '100%', aspectRatio: 1.8}}
              />
            </View>
            <View
              style={{
                width: '30%',
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: 10,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold'}}
                numberOfLines={1}>
                Cycle A
              </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>ON{'\n'}</Text>
              <Image
                source={require('../../assets/icons/GPS_tracker.png')}></Image>
            </View>
          </View>
          <RideStatSection
            co2Saving={this.props.bike.co2SavingKg.toString()}
            avgRidescore={this.props.bike.avgRideScore.toString()}
            costRecovered={this.props.bike.costRecoveredPer.toString()}
            greenMiles={this.props.bike.greenMilesKm.toString()}
            petrolSavings={this.props.bike.petrolSavingsLtr.toString()}
            totalDistance={this.props.bike.totalDistanceKm.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      bike: store['bike'],
      user: store['user'],
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
