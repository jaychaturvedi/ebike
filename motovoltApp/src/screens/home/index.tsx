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

type ReduxState = {
  bikeStat: TStore['bikeStat'];
  bikeState: TStore['bikeState'];
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
        <Header
          title={`Hello ${this.props.user.name}`}
          backgroundColor={Colors.HEADER_YELLOW}
        />
        <ScrollView style={styles.body}>
          <View style={{marginVertical: verticalScale(20)}}>
            <Metrics
              batteryCharge={this.props.bikeState.batteryChargePer.toString()}
              rangeAvailable={this.props.bikeState.rangeAvailableKm.toString()}
              rangeCovered={this.props.bikeState.rangeCoveredKm.toString()}
            />
          </View>
          <View
            style={{
              height: 250,
              width: '100%',
              flexDirection: 'row',
            }}>
            <View
              style={{
                position: 'relative',
                right: scale(100),
                width: '70%',
              }}>
              <Image
                source={require('../../assets/images/cycle.png')}
                style={{height: '100%'}}
                width={scale(350)}
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
            co2Saving={this.props.bikeStat.co2SavingKg.toString()}
            avgRidescore={this.props.bikeStat.avgRideScore.toString()}
            costRecovered={this.props.bikeStat.costRecoveredPer.toString()}
            greenMiles={this.props.bikeStat.greenMilesKm.toString()}
            petrolSavings={this.props.bikeStat.petrolSavingsLtr.toString()}
            totalDistance={this.props.bikeStat.totalDistanceKm.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      bikeStat: store['bikeStat'],
      bikeState: store['bikeState'],
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
