import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import VehicleInfo from '../../components/vehicle-info-battery';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MyCycleStackParamList } from '../../navigation/cycle';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import Background from '../../components/background'
import moment from 'moment';
import { Dispatch } from 'redux';
import { ReadBikeStat } from '../../service/redux/actions/saga/bike-actions';
import LanguageSelector from '../../translations'
import { ThemeContext } from '../../styles/theme/theme-context'
type ReduxState = {
  bike: TStore['bike'];
  readBikeStat: (params: ReadBikeStat) => void
};

type MyCycleNavigationProp = StackNavigationProp<
  MyCycleStackParamList,
  'MyCycleScreen'
>;

interface Props extends ReduxState {
  navigation: MyCycleNavigationProp;
  route: RouteProp<MyCycleStackParamList, 'MyCycleScreen'>;
}

type State = {
  refreshing: boolean
};

class MyCycle extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }


  onRefresh() {
    this.setState({ refreshing: true });
    this.props.readBikeStat({
      type: 'ReadBikeStat',
      payload: {
        bikeId: this.props.bike.id
      }
    })
    this.setState({ refreshing: false });
  }

  render() {
    let Theme = this.context.theme //load theme context
    return (
      <View style={styles.container}>
        <Background />
        <Header
          title={LanguageSelector.t("myBike.myCycle")}
          hasSubtitle
          subtitle={this.props.bike.name}
          hasTabs
          backgroundColor={Colors.HEADER_YELLOW}
        />
        <ScrollView style={{ paddingHorizontal: moderateScale(15), flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
            />
          }
        >
          <View style={styles.cycle}>
            <Image
              source={require('../../assets/images/cycle.png')}
              style={{ height: '80%', width: '100%' }}
              height={scale(200)}
              width={scale(300)}
            />
          </View>
          <View style={{
            ...styles.cycleName, backgroundColor: Theme.BACKGROUND_LIGHT,//change dark theme

          }}>
            <Text style={{ fontSize: scale(16), fontWeight: 'bold', color: Theme.TEXT_WHITE }} numberOfLines={1}>
              {this.props.bike.name}
            </Text>
          </View>
          <View style={styles.metrics}>
            <RideMetric
              header1={LanguageSelector.t("myBike.health")}
              header2={LanguageSelector.t("myBike.serviceDate")}
              icon1={require('../../assets/icons/health_green.png')}
              icon2={require('../../assets/icons/calendar_green.png')}
              value1={`${this.props.bike.healthPer} %`}
              value2={`${moment(this.props.bike.serviceDate).format('DD/MM/YY')}`}
              unit1=""
              unit2=""
            />
            <RideMetric
              header1={LanguageSelector.t("myBike.motor")}
              header2={LanguageSelector.t("myBike.battery")}
              icon1={require('../../assets/icons/motor_icon.png')}
              icon2={require('../../assets/icons/battery_green_icon.png')}
              value1={`${this.props.bike.motorPer} %`}
              value2={`${this.props.bike.batteryChargePer} %`}
              unit1=""
              unit2=""
            />
            <VehicleInfo
              header1={LanguageSelector.t("myBike.vechileId")}
              header2={LanguageSelector.t("myBike.batteryId")}
              value1={[this.props.bike.id]}
              value2={Object.keys(this.props.bike.batteries)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

MyCycle.contextType = ThemeContext

export default connect((store: TStore) => {
  return {
    bike: store['bike'],
  };
},
  (dispatch: Dispatch) => {
    return {
      readBikeStat: (params: ReadBikeStat) => dispatch(params)
    };
  })(MyCycle);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
    // padding: moderateScale(15),
  },
  cycle: {
    height: moderateScale(300),
    padding: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleName: {
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 4, width: 2},    
  },
  metrics: {
    flex: 1,
    marginTop: moderateScale(20),
  },
});
