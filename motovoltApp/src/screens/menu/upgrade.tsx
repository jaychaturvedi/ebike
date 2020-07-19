import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Tile from '../../components/tile';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';

type UpdgradeNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'Upgrade'
>;

type Props = {
  navigation: UpdgradeNavigationProp,
  route: RouteProp<MenuStackParamList, 'Upgrade'>
};

type State = {};

export default class Upgrade extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={{ height: '100%' }}>
        <Header
          hasBackButton
          title={'My Rides'}
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <Tile
            feature="Find My Bike"
            icon={require('../../assets/icons/icons2x/cycle.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
            unit={'25'}
          />
          <Tile
            feature="Theft Detection"
            icon={require('../../assets/icons/icons2x/theft.png')}
            onPress={() => console.log('Feature pressed')}
            unit={'75'}
            height={moderateScale(157)}
          />
          <Tile
            feature="Geo Fencing"
            icon={require('../../assets/icons/icons2x/geo-fencing.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
            unit={'50'}
          />
          <Tile
            feature="Ride Statistics"
            icon={require('../../assets/icons/icons2x/ride-statistics.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
            unit={'50'}
          />
          <Tile
            feature="Smart Inspection"
            icon={require('../../assets/icons/icons2x/smart-inspection.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
            unit={'35'}
          />
          <Tile
            feature="Remote Lock"
            icon={require('../../assets/icons/icons2x/lock.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
            unit={'40'}
          />
          <Tile
            feature="Battery Analytics"
            icon={require('../../assets/icons/icons2x/battery-analytics.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
            unit={'20'}
          />
          <Tile
            feature="Online Store"
            icon={require('../../assets/icons/icons2x/online-store.png')}
            onPress={() => console.log('Feature pressed')}
            height={moderateScale(157)}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(10),
    backgroundColor: '#F0F0F0',
  },
});
