import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import RideCard from '../../components/ride-details';
import RideDatePicker from '../../components/date-picker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';

type State = {};
type Props = {};

export default class MyRides extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          hasBackButton
          title={'My Rides'}
          backgroundColor={Colors.WHITE}
        />
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
          {[1, 2, 3, 4, 5].map((item, index) => (
            <RideCard
              key={index}
              fromAddress="HsR layout, Near yelahanka Bangalore 21"
              toAddress="HsR layout, Near yelahanka Bangalore 21"
              progress={30}
              fromTime={new Date()}
              toTime={new Date()}
              distance="15"
              rating="8/10"
              speed="16.5"
            />
          ))}
        </ScrollView>
        <Footer
          lockOnlyVisible={false}
          locked
          onItemSelect={() => { }}
          onLockClick={() => { }}
          selectedItem={'home'}
        />
      </View>
    );
  }
}

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
