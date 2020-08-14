import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import RideCard from '../../components/ride-details';
import RideDatePicker from '../../components/date-picker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StatisticsStackParamList } from '../../navigation/statistics';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import Moment from 'moment';
import { Dispatch } from 'redux';
import { ReadRideHistory, ReadRideData } from '../../service/redux/actions/saga/rides';

type ReduxState = {
  rides: TStore['rides'];
  user: TStore['user'];
  bike: TStore['bike'];
  readRideHistory: (params: ReadRideHistory) => void;
  getIndividualRide: (params: ReadRideData) => void;
};

type MyRidesNavigationProp = StackNavigationProp<
  StatisticsStackParamList,
  'MyRides'
>;

interface Props extends ReduxState {
  navigation: MyRidesNavigationProp;
  route: RouteProp<StatisticsStackParamList, 'MyRides'>;
}

type State = {
  focusDate: Date;
};

class MyRides extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      focusDate: new Date(),
    };
  }

  componentDidMount() {
    this.props.readRideHistory({
      type: 'ReadRideHistory',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10,
        startTime: Moment.utc().startOf('day').toString(),
        endTime: Moment.utc().startOf('day').toString()
      }
    })
  }

  setNewDate = (date: Date) => {
    if (date.getTime() <= new Date().getTime())
      this.setState({
        focusDate: date,
      });
    this.props.readRideHistory({
      type: 'ReadRideHistory',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10,
        startTime: Moment.utc(date).startOf('day').toString(),
        endTime: Moment.utc(date).startOf('day').toString()
      }
    })
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={'My Rides'}
          backgroundColor={Colors.HEADER_YELLOW}
          subtitle={this.props.bike.name}
          hasSubtitle
          hasTabs
        />
        <ScrollView style={styles.container}>
          <View style={styles.date}>
            <TouchableOpacity
              onPress={() =>
                this.setNewDate(
                  Moment(this.state.focusDate).add(-1, 'days').toDate(),
                )
              }>
              <Icon
                type="FontAwesome"
                name="chevron-left"
                style={styles.icon}></Icon>
            </TouchableOpacity>
            <View style={styles.datePicker}>
              <RideDatePicker
                date={this.state.focusDate}
                onDateChange={(date) => this.setNewDate(date)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setNewDate(
                  Moment(this.state.focusDate).add(1, 'days').toDate(),
                );
              }}>
              <Icon
                type="FontAwesome"
                name="chevron-right"
                style={styles.icon}></Icon>
            </TouchableOpacity>
          </View>
          <RideMetric
            header1="CO2e Savings"
            header2="Green miles"
            unit1="Kg"
            unit2="Km"
            icon1={require('../../assets/icons/CO2e_savings.png')}
            icon2={require('../../assets/icons/green_miles_icon.png')}
            value1={String(this.props.bike.co2SavingKg)}
            value2={String(this.props.bike.greenMilesKm)}
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
          {/* <RideCard
            key={'12'}
            fromAddress="HsR layout, Near yelahanka Bangalore 21"
            toAddress="HsR layout, Near yelahanka Bangalore 21"
            progress={30}
            fromTime={new Date()}
            toTime={new Date()}
            distance={'12'}
            rating={`12/10`}
            speed={'12'}
            onItemSelect={() =>
              this.props.navigation.navigate('IndividualRide', {})
            }
          /> */}
          {
            Object.keys(this.props.rides).map((key, index) => (
              <RideCard
                key={index}
                fromAddress={this.props.rides[key].from}
                toAddress={this.props.rides[key].to}
                progress={30}
                fromTime={new Date()}
                toTime={new Date()}
                distance={this.props.rides[key].totalDistanceKm.toString()}
                rating={`${this.props.rides[key].score.toString()}/10`}
                speed={this.props.rides[key].avgSpeedKmph.toString()}
                onItemSelect={() => {
                  this.props.getIndividualRide({
                    type: 'ReadRideData',
                    payload: {
                      bikeId: this.props.user.defaultBikeId,
                      rideId: key,
                      startTime: this.props.rides[key].startTime,
                      endTime: this.props.rides[key].endTime
                    }
                  })
                  this.props.navigation.navigate('IndividualRide', {})
                }
                }
              />
            ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      rides: store['rides'],
      bike: store['bike'],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      readRideHistory: (params: ReadRideHistory) => dispatch(params),
      getIndividualRide: (params: ReadRideData) => dispatch(params)
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
  date: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    height: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  datePicker: {
    width: '50%',
    alignSelf: 'center',
  },
  icon: {
    fontSize: moderateScale(12),
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
