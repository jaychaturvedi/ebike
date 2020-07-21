import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import RideCard from '../../components/ride-details';
import RideDatePicker from '../../components/date-picker';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {StatisticsStackParamList} from '../../navigation/statistics';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';

type ReduxState = {
  rides: TStore['rides'];
};

type MyRidesNavigationProp = StackNavigationProp<
  StatisticsStackParamList,
  'MyRides'
>;

interface Props extends ReduxState {
  navigation: MyRidesNavigationProp;
  route: RouteProp<StatisticsStackParamList, 'MyRides'>;
}

type State = {};

class MyRides extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={'My Rides'} backgroundColor={Colors.HEADER_YELLOW} />
        <ScrollView style={styles.container}>
          <View style={styles.datePicker}>
            <RideDatePicker />
          </View>
          <RideMetric
            header1="CO2e Savings"
            header2="Green miles"
            unit1="Kg"
            unit2="Km"
            icon1={require('../../assets/icons/CO2e_savings.png')}
            icon2={require('../../assets/icons/green_miles_icon.png')}
            value1={String(250)}
            value2={String(5)}
          />
          <View style={styles.chart}></View>
          <View style={styles.ridesText}>
            <Text
              style={{
                fontSize: scale(16),
                fontWeight: 'bold',
                color: '#212121',
              }}>
              YOUR RIDES
            </Text>
          </View>
          <RideCard
            key={"12"}
            fromAddress="HsR layout, Near yelahanka Bangalore 21"
            toAddress="HsR layout, Near yelahanka Bangalore 21"
            progress={30}
            fromTime={new Date()}
            toTime={new Date()}
            distance={"12"}
            rating={`12/10`}
            speed={"12"}
            onItemSelect={() =>
              this.props.navigation.navigate('IndividualRide', {})
            }
          />
          {Object.keys(this.props.rides).map((key, index) => (
            <RideCard
              key={index}
              fromAddress="HsR layout, Near yelahanka Bangalore 21"
              toAddress="HsR layout, Near yelahanka Bangalore 21"
              progress={30}
              fromTime={new Date()}
              toTime={new Date()}
              distance={this.props.rides[key].totalDistanceKm.toString()}
              rating={`${this.props.rides[key].score.toString()}/10`}
              speed={this.props.rides[key].avgSpeedKmph.toString()}
              onItemSelect={() =>
                this.props.navigation.navigate('IndividualRide', {})
              }
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      rides: store['rides'],
    };
  },
)(MyRides);

const styles = StyleSheet.create({
  container: {
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    backgroundColor: '#F0F0F0',
    width: '100%',
    // paddingTop: 20
  },
  datePicker: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    width: '50%',
    alignSelf: 'center',
    height: verticalScale(40),
  },
  chart: {
    height: verticalScale(280),
    backgroundColor: 'white',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
    borderRadius: scale(10),
    width: '100%',
    display: 'flex',
  },
  ridesText: {
    marginTop: verticalScale(10),
  },
});
