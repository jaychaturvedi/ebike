import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Icon} from 'native-base';
import RideStat from './ridestat-tile';
import {scale, verticalScale} from '../../../styles/size-matters';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(28),
    width: '100%',
  },
  title: {fontSize: 18, marginLeft: scale(20)},
  row: {
    marginVertical: verticalScale(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {width: scale(28), height: scale(28)},
});

type Props = {
  co2Saving: string;
  totalDistance: string;
  avgRidescore: string;
  greenMiles: string;
  petrolSavings: string;
  costRecovered: string;
};

export default function RidestatSection(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Statistics</Text>
      <View>
        <View style={styles.row}>
          <RideStat
            icon={
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/CO2e_savings.png')}
              />
            }
            value={props.co2Saving}
            unit="Kg"
            descriptionLine1="CO2e Savings"
          />
          <RideStat
            icon={
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/total_distance.png')}
              />
            }
            value={props.totalDistance}
            unit="Km"
            descriptionLine1="Total Distance"
          />
          <RideStat
            icon={
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/star.png')}
              />
            }
            value={props.avgRidescore}
            unit="/10"
            descriptionLine1="Avg Ridescore"
          />
        </View>
        <View style={styles.row}>
          <RideStat
            icon={
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/green_miles.png')}
              />
            }
            value={props.greenMiles}
            unit="Km"
            descriptionLine1="Green Miles"
          />
          <RideStat
            icon={
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/petrol_savings.png')}
              />
            }
            value={props.petrolSavings}
            unit="(20L)"
            descriptionLine1="Petrol Savings"
          />
          <RideStat
            icon={
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/inr.png')}
              />
            }
            value={props.costRecovered}
            unit="%"
            descriptionLine1="Cost Recovered"
          />
        </View>
      </View>
    </View>
  );
}
