import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Left, Text, FooterTab, Button, Icon} from 'native-base';
import {scale, moderateScale} from 'react-native-size-matters';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';

type Props = {};
type State = {};

export default class GPSLui extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Header title={'GPS'} hasBackButton backgroundColor={Colors.WHITE} />
        <View style={styles.mapView}></View>
        <View style={styles.footerView}>
          <View style={styles.footerDescription}>
            <View style={{width: '20%'}}>
              {/* Marker Image */}
              <View style={styles.markerImage}>
                <Image
                  source={require('../../assets/icons/location_pin.png')}></Image>
              </View>
            </View>
            <View style={{width: '60%'}}>
              {/* description */}
              <Text style={{fontSize: moderateScale(16)}}>Final Position</Text>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  lineHeight: moderateScale(30),
                }}>
                04:21pm 20-04-20
              </Text>
              <Text></Text>
            </View>
            <View style={{width: '20%', alignItems: 'center'}}>
              {/* Refresh */}
              <TouchableOpacity onPress={() => console.log('Reresh pressed')}>
                <Image
                  source={require('../../assets/icons/refresh_icon.png')}
                />
              </TouchableOpacity>
              <Text style={{fontSize: moderateScale(12)}}>Refresh</Text>
            </View>
          </View>
          <View style={styles.footerAddress}>
            <View style={{width: '80%'}}>
              <Text style={{fontSize: scale(12)}}>
                Unnamed road, HSR Layout
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{fontSize: scale(12)}}>5 min ago</Text>
            </View>
          </View>
        </View>
        <Footer
          lockOnlyVisible={false}
          locked
          onItemSelect={() => {}}
          onLockClick={() => {}}
          selectedItem={'home'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  mapView: {
    flex: 1,
    backgroundColor: 'red',
  },
  footerView: {
    height: '20%',
    padding: moderateScale(20),
    backgroundColor: '#FFFFFF',
  },
  markerImage: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  footerDescription: {
    height: '70%',
    flexDirection: 'row',
  },
  footerAddress: {
    height: '30%',
    flexDirection: 'row',
    paddingTop: moderateScale(10),
    flex: 1,
  },
});
