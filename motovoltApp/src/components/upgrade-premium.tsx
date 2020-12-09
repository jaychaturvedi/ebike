import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import LanguageSelector from '../translations';

type Props = {};
type State = {};

export default class Upgrade extends React.PureComponent<Props, State> {
  render() {
    return (
      <LinearGradient
        colors={['#FFC40F', '#F89406']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.container}
        locations={[0, 0.5]}>
        <View style={styles.icon}>
          <Image source={require('../assets/icons/cycle_blue_icon.png')} />
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={{fontSize: moderateScale(19), fontWeight: 'bold'}}>
              {LanguageSelector.t('morePremium.upgradeTitle')}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={{fontSize: moderateScale(12)}}>
              {LanguageSelector.t('morePremium.upgradeSubTitle')}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    padding: moderateScale(5),
    paddingRight: 10,
  },
  icon: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '70%',
  },
  header: {
    paddingTop: moderateScale(10),
  },
  description: {
    paddingTop: moderateScale(10),
  },
});
