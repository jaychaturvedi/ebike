import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Rating from '../../components/rating';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Button from '../../components/cta-button';
import RideMetric from '../../components/ride-metric';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';

type ReduxState = {
  ride: TStore['ride'];
};

interface Props extends ReduxState {}

type State = {
  rating: number;
};

class RateRide extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}></View>
        <View style={styles.usageDetails}>
          <RideMetric
            header1="Distance"
            header2="Duration"
            icon1={require('../../assets/icons/total_distance_icon.png')}
            icon2={require('../../assets/icons/charge_time_remaining.png')}
            value1={this.props.ride.totalDistanceKm.toString()}
            value2={this.props.ride.durationSec.toString()}
            unit1="Km"
            unit2=""
          />
          <RideMetric
            header1="Avg. speed"
            header2="Max. speed"
            icon1={require('../../assets/icons/total_distance_icon.png')}
            icon2={require('../../assets/icons/total_distance_icon.png')}
            value1={this.props.ride.avgSpeedKmph.toString()}
            value2={this.props.ride.maxSpeedKmph.toString()}
            unit1="Kmph"
            unit2="Kmph"
          />
          <RideMetric
            header1="Green Miles"
            header2="Calories Burnt"
            icon1={require('../../assets/icons/green_miles_icon.png')}
            icon2={require('../../assets/icons/calories_icon_blue.png')}
            value1={this.props.ride.greenMilesKm.toString()}
            value2={this.props.ride.caloriesBurnt.toString()}
            unit1="Km"
            unit2=""
          />
          <RideMetric
            header1="Petrol Savings"
            header2="Petrol Savings"
            icon1={require('../../assets/icons/inr_icon.png')}
            icon2={require('../../assets/icons/petrol_savings_icon.png')}
            value1={this.props.ride.petrolSavingsInr.toString()}
            value2={this.props.ride.petrolSavingsLtr.toString()}
            unit1="INR"
            unit2="L"
          />
        </View>
        <View style={styles.rating}>
          <View>
            <Text style={{textAlign: 'center', fontSize: moderateScale(16)}}>
              Rate your ride
            </Text>
          </View>
          <View style={{padding: moderateScale(20)}}>
            <Rating
              defaultRating={0}
              maxRating={5}
              ratingCompleted={(rating: number) => this.setState({rating})}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            textColor={this.state.rating > 0 ? 'white' : '#333333'}
            text="Submit"
            backgroundColor={this.state.rating > 0 ? '#142F6A' : '#B7B7B7'}
            onPress={() => {
              this.state.rating > 0
                ? console.log('Some function called')
                : console.log('Disabled');
            }}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      ride: store['ride'],
    };
  },
)(RateRide);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  map: {
    height: moderateScale(200),
    width: '100%',
    backgroundColor: 'white',
  },
  usageDetails: {
    height: moderateScale(350),
    padding: moderateScale(20),
  },
  rating: {
    height: moderateScale(100),
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
