import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import RideStat from './ridestat-tile';
import {scale, verticalScale} from '../../../styles/size-matters';
import LanguageSelector from '../../../translations';
import {ThemeContext} from '../../../styles/theme/theme-context';
import TotalDistanceIcon from '../../../assets/svg/total_distance_icon';
import StarIcon from '../../../assets/svg/star_icon';
import GreenMilesIcon from '../../../assets/svg/green_miles_icon';
import PetrolSavingsIcon from '../../../assets/svg/petrol_savings_icon';
import INRIcon from '../../../assets/svg/inr_icon';
import CO2SavingIcon from '../../../assets/svg/CO2e_savings';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(28),
    width: '100%',
    paddingHorizontal: scale(20),
  },
  title: {fontSize: 18},
  row: {
    marginVertical: verticalScale(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  petrolInLitre: string;
};

export default class RidestatSection extends React.Component<Props, {}> {
  render() {
    let props = this.props;
    let Theme = this.context.theme; //load theme from context
    return (
      <View style={styles.container}>
        <Text
          style={{
            ...styles.title,
            color: Theme.TEXT_WHITE, //change dark theme
          }}>
          {LanguageSelector.t('home.rideStatistics')}
        </Text>
        <View>
          <View style={styles.row}>
            <RideStat
              icon={
                <CO2SavingIcon
                  width={styles.icon.width}
                  height={styles.icon.height}
                />
              }
              value={props.co2Saving}
              unit="Kg"
              descriptionLine1={LanguageSelector.t('home.co2eSavings')}
            />
            <RideStat
              icon={
                <TotalDistanceIcon
                  width={styles.icon.width}
                  height={styles.icon.height}
                />
              }
              value={props.totalDistance}
              unit="Km"
              descriptionLine1={LanguageSelector.t('home.totalDistance')}
            />
            <RideStat
              icon={
                <StarIcon
                  width={styles.icon.width}
                  height={styles.icon.height}
                />
              }
              value={props.avgRidescore}
              unit="/10"
              descriptionLine1={LanguageSelector.t('home.avgRideScore')}
            />
          </View>
          <View style={styles.row}>
            <RideStat
              icon={
                <GreenMilesIcon
                  width={styles.icon.width}
                  height={styles.icon.height}
                />
              }
              value={props.greenMiles}
              unit="Km"
              descriptionLine1={LanguageSelector.t('home.greenMiles')}
            />
            <RideStat
              icon={
                <PetrolSavingsIcon
                  width={styles.icon.width}
                  height={styles.icon.height}
                />
              }
              value={props.petrolSavings}
              unit={`(${props.petrolInLitre}L)`}
              descriptionLine1={LanguageSelector.t('home.petrolSavings')}
            />
            <RideStat
              icon={
                <INRIcon
                  width={styles.icon.width}
                  height={styles.icon.height}
                />
              }
              value={props.costRecovered}
              unit="%"
              descriptionLine1={LanguageSelector.t('home.costRecovered')}
            />
          </View>
        </View>
      </View>
    );
  }
}

RidestatSection.contextType = ThemeContext; //attach theme context in class as this.context
