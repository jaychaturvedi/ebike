import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
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

type ReduxState = {
  bike: TStore['bike'];
};

type MyCycleNavigationProp = StackNavigationProp<
  MyCycleStackParamList,
  'MyCycleScreen'
>;

interface Props extends ReduxState {
  navigation: MyCycleNavigationProp;
  route: RouteProp<MyCycleStackParamList, 'MyCycleScreen'>;
}

type State = {};

class MyCycle extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <Header
          title={'My Cycle'}
          hasSubtitle
          subtitle={this.props.bike.name}
          hasTabs
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => console.log('To be handled')}
        />
        <ScrollView style={{ paddingHorizontal: moderateScale(15), flex: 1 }}>
          <View style={styles.cycle}>
            <Image
              source={require('../../assets/images/cycle.png')}
              style={{ height: '80%', width: '100%' }}
              height={scale(200)}
              width={scale(300)}
            />
          </View>
          <View style={styles.cycleName}>
            <Text style={{ fontSize: scale(16), fontWeight: 'bold' }} numberOfLines={1}>
              {this.props.bike.name}
            </Text>
          </View>
          <View style={styles.metrics}>
            <RideMetric
              header1="Health"
              header2="Service Date"
              icon1={require('../../assets/icons/health_green.png')}
              icon2={require('../../assets/icons/calendar_green.png')}
              value1={`${this.props.bike.healthPer} %`}
              value2={`${moment(this.props.bike.serviceDate).format('DD/MM/YY')}`}
              unit1=""
              unit2=""
            />
            <RideMetric
              header1="Motor"
              header2="Battery"
              icon1={require('../../assets/icons/motor_icon.png')}
              icon2={require('../../assets/icons/battery_green_icon.png')}
              value1={`${this.props.bike.motorPer} %`}
              value2={`${this.props.bike.batteryPer} %`}
              unit1=""
              unit2=""
            />
            <VehicleInfo
              header1="Vehicle ID"
              header2="Battery ID"
              value1={[this.props.bike.id]}
              value2={Object.keys(this.props.bike.batteries)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect((store: TStore) => {
  return {
    bike: store['bike'],
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
  },
  metrics: {
    flex: 1,
    marginTop: moderateScale(20),
  },
});
