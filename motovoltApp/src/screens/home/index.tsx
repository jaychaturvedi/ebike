import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Metrics from './components/metrics';
import RideStatSection from './components/ridestats';
import Footer from './components/footer';
import Header from './components/header';
import Colors from '../../styles/colors';
import { scale, verticalScale } from '../../styles/size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters'
import { Text } from 'native-base';

type Props = {};

type State = {};

export default class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          hasBluetoothNotification
          title="Hello Vinay"
          backgroundColor={Colors.HEADER_YELLOW}

        />
        <ScrollView style={styles.body}>
          <View style={{ marginVertical: verticalScale(20) }}>
            <Metrics
              batteryCharge="100"
              rangeAvailable="30"
              rangeCovered="10"
            />
          </View>
          <View style={{ height: moderateScale(200) }}>
            <Image
              source={require('../../assets/images/cycle.png')}
              resizeMethod="scale"
              style={styles.image}
              width={moderateScale(300)}
              height={moderateScale(200)}
            />
          </View>
          <RideStatSection
            co2Saving={'0'}
            avgRidescore={'0'}
            costRecovered={'0'}
            greenMiles={'0'}
            petrolSavings={'0'}
            totalDistance={'0'}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG_GREY,
    height: '100%',
  },
  body: { flex: 1 },
  image: { flex: 1, width: '80%' },
});
