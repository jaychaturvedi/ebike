import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
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
import {Icon} from 'native-base';
import Moment from 'moment';
import {Dispatch} from 'redux';
import {
  ReadRideHistory,
  ReadRideData,
} from '../../service/redux/actions/saga/rides';
import {
  Store_Reset,
  Store_ResetRide,
  Store_ResetStats,
} from '../../service/redux/actions/store';
import Graph from './graph';
import LanguageSelector from '../../translations';
import {ThemeContext} from '../../styles/theme/theme-context';
import GreenMilesIcon from '../../assets/svg/green_miles_icon';
import CO2SavingIcon from '../../assets/svg/CO2e_savings';
import DatePickerLeftIcon from '../../assets/svg/date-picker-left-arrow';
import DatePickerRightIcon from '../../assets/svg/date-picker-right-arrow';

type ReduxState = {
  rides: TStore['rides'];
  user: TStore['user'];
  bike: TStore['bike'];
  graph: TStore['graph'];
  resetRide: (params: Store_ResetRide) => void;
  readRideHistory: (params: ReadRideHistory) => void;
  resetRideHistory: (params: Store_ResetStats) => void;
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
  refreshing: boolean;
};

class MyRides extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      focusDate: new Date(),
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.resetRideHistory({
      type: 'Store_ResetStats',
      payload: {},
    });
    this.props.readRideHistory({
      type: 'ReadRideHistory',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10,
        startTime: Moment()
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss')
          .toString(),
        endTime: Moment().endOf('day').format('YYYY-MM-DD HH:mm:ss').toString(),
      },
    });
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.resetRideHistory({
      type: 'Store_ResetStats',
      payload: {},
    });
    this.props.readRideHistory({
      type: 'ReadRideHistory',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10,
        startTime: Moment(this.state.focusDate)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endTime: Moment(this.state.focusDate)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
    });
    this.setState({refreshing: false});
  }

  setNewDate = (date: Date) => {
    if (date.getTime() <= new Date().getTime())
      this.setState({
        focusDate: date,
      });
    this.props.resetRideHistory({
      type: 'Store_ResetStats',
      payload: {},
    });
    this.props.readRideHistory({
      type: 'ReadRideHistory',
      payload: {
        bikeId: this.props.user.defaultBikeId,
        pageNumber: 1,
        pageSize: 10,
        startTime: Moment(date)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss')
          .toString(),
        endTime: Moment(date)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss')
          .toString(),
      },
    });
  };

  render() {
    let Theme = this.context.theme; //load theme context
    const invalidNextDate =
      Moment(this.state.focusDate).add(1, 'days').toDate().getTime() >
      new Date().getTime();
    const graphData = Object.keys(this.props.graph.data).map(
      (graph) => this.props.graph.data[graph],
    );
    let graphRange = '';
    if (graphData.length) {
      if (
        Moment(graphData[0].date).format('MMMM') ===
        Moment(graphData[graphData.length - 1].date).format('MMMM')
      ) {
        graphRange = `${Moment(graphData[0].date).date()} - ${Moment(
          graphData[graphData.length - 1].date,
        ).date()} ${Moment(graphData[0].date).format('MMMM')}`;
      } else {
        graphRange = `${Moment(graphData[0].date).date()}-${Moment(
          graphData[0].date,
        ).format('MMM')} to ${Moment(
          graphData[graphData.length - 1].date,
        ).date()}-${Moment(graphData[graphData.length - 1].date).format(
          'MMM',
        )}`;
      }
    }
    return (
      <View style={{flex: 1}}>
        <Header
          title={LanguageSelector.t('myRides.myRides')}
          backgroundColor={Colors.HEADER_YELLOW}
          subtitle={this.props.bike.name}
          hasSubtitle
          hasTabs
        />
        <ScrollView
          style={{...styles.container, backgroundColor: Theme.BACKGROUND}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
            />
          }>
          <View style={styles.date}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingRight: 4,
                borderRadius: 20,
                shadowOpacity: 0.25,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { height: 1, width: 1 },
                elevation: 3,
              }}
              onPress={() =>
                this.setNewDate(
                  Moment(this.state.focusDate).add(-1, 'days').toDate(),
                )
              }>
              <DatePickerLeftIcon stroke={"#152F6A"}/>
            </TouchableOpacity>
            <View style={styles.datePicker}>
              <RideDatePicker
                date={this.state.focusDate}
                onDateChange={(date) => this.setNewDate(date)}
              />
            </View>
            <TouchableOpacity
              disabled={invalidNextDate}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 4,
                backgroundColor: invalidNextDate ? '#E5E5E5' : 'white',
                borderRadius: 20,
                shadowOpacity: 0.25,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { height: 1, width: 1 },
                elevation: 3,
              }}
              onPress={() => {
                this.setNewDate(
                  Moment(this.state.focusDate).add(1, 'days').toDate(),
                );
              }}>
              <DatePickerRightIcon stroke={invalidNextDate ? '#868686' : '#152F6A'}/>
            </TouchableOpacity>
          </View>
          {/* <RideMetric
            header1={LanguageSelector.t('myRides.co2eSavings')}
            header2={LanguageSelector.t('myRides.greenMiles')}
            unit1="Kg"
            unit2="Km"
            icon1={CO2SavingIcon}
            icon2={GreenMilesIcon}
            value1={String(this.props.graph.co2SavingKg ?? 0)}
            value2={String(this.props.graph.greenMilesKm ?? 0)}
          /> */}
          <View style={styles.ridesText}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: Colors.TEXT_BROWN,
              }}>
              {LanguageSelector.t('myRides.rideSummary')}
            </Text>
          </View>
          <View
            style={{...styles.chart, backgroundColor: Theme.BACKGROUND_LIGHT}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: moderateScale(20),
                marginVertical: moderateScale(20),
              }}>
              <View>
                <Text style={{ 
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight:"400" }}>
                  {LanguageSelector.t('myRides.avgDistance')}&nbsp;
                </Text>
                <Text style={{
                  textAlign: 'center',
                  fontWeight:"bold",
                  fontSize: 12}}>
                  {Object.keys(this.props.graph.data).length > 0
                    ? this.props.graph.avgKmph
                    : '--'}{' '}
                  Km/Day
                </Text>
              </View>

              <View style={styles.verticalDivider}/>

              <View>
              <Text style={{
                  textAlign: 'center', 
                  fontSize:20, 
                  fontWeight:"bold"}}>
                {Object.keys(this.props.graph.data).length > 0
                  ? this.props.graph.distance
                  : '--'}{' '}
                Km
              </Text>
              </View>

              <View style={styles.verticalDivider}/>
              <View>
              <Text style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight:"400" }}>
                    {LanguageSelector.t('myRides.avgSpeed')}&nbsp;
                </Text>
                <Text style={{
                  textAlign: 'center',
                  fontWeight:"bold",
                  fontSize: 12}}>
                  {Object.keys(this.props.graph.data).length > 0
                    ? this.props.graph.avgSpeed
                    : '--'}{' '}
                Kmph
              </Text>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Graph data={graphData} loading={this.props.graph.isStale} />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{textAlign: 'center', fontSize: 12}}>
                {graphRange}
              </Text>
            </View>
          </View>
          <View style={styles.ridesText}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: Colors.TEXT_BROWN,
              }}>
              {LanguageSelector.t('myRides.yourRides') + " " +  Moment(this.state.focusDate)
          .startOf('day')
          .format('DD MMM YYYY')
          .toString()}
            </Text>
          </View>
          {Object.keys(this.props.rides).map((key, index) => {
            return (
              <RideCard
                key={index}
                fromAddress={this.props.rides[key].from}
                toAddress={this.props.rides[key].to}
                // todo
                progress={{
                  powerMode: this.props.rides[key].powerMode,
                  pedalAssistMode: this.props.rides[key].pedalAssistMode,
                  ecoMode: this.props.rides[key].ecoMode,
                }}
                fromTime={this.props.rides[key].startTime as any}
                toTime={this.props.rides[key].endTime as any}
                distance={this.props.rides[key].totalDistanceKm.toString()}
                rating={`${this.props.rides[key].score.toString()}/10`}
                speed={this.props.rides[key].avgSpeedKmph.toString()}
                onItemSelect={() => {
                  this.props.resetRide({
                    type: 'Store_ResetRide',
                    payload: {},
                  });
                  this.props.getIndividualRide({
                    type: 'ReadRideData',
                    payload: {
                      bikeId: this.props.user.defaultBikeId,
                      rideId: key,
                      startTime: this.props.rides[key].startTime,
                      endTime: this.props.rides[key].endTime,
                    },
                  });
                  this.props.navigation.navigate('IndividualRide', {});
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
MyRides.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      rides: store['rides'],
      bike: store['bike'],
      user: store['user'],
      graph: store['graph'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      resetRide: (params: Store_ResetRide) => dispatch(params),
      readRideHistory: (params: ReadRideHistory) => dispatch(params),
      resetRideHistory: (params: Store_ResetStats) => dispatch(params),
      getIndividualRide: (params: ReadRideData) => dispatch(params),
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
    marginBottom: verticalScale(20),
    height: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  datePicker: {
    width: '50%',
    height: 40,
    alignSelf: 'center',
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
  },
  icon: {
    fontSize: moderateScale(16),
  },
  chart: {
    // height: 300,
    flex:1,
    backgroundColor: 'white',
    paddingBottom: 10,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
    borderRadius: scale(10),
    width: '100%',
    display: 'flex',
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
  },
  ridesText: {
    marginVertical: verticalScale(10),
  },
  verticalDivider:{
    width:1, 
    height:"85%",
    borderWidth:1, 
    borderColor:"rgba(0, 0, 0, 0.1)",
    marginVertical:moderateScale(5)
  }
});
