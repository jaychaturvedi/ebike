import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/colors';
import LanguageSelector from '../translations';
import {ThemeContext} from '../styles/theme/theme-context';

type Props = {
  title: string;
  time: string;
  serviceId: string;
  onView: () => void;
};
type State = {};

export default class ServiceTile extends React.PureComponent<Props, State> {
  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View
        style={{...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT}}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: moderateScale(16),
              fontWeight: '600',
              color: Theme.TEXT_WHITE,
            }}>
            {this.props.title}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: Colors.LINK_BLUE,
              textDecorationLine: 'underline',
            }}
            onPress={() => this.props.onView()}>
            {LanguageSelector.t('support.view')}
          </Text>
        </View>
        <View style={{paddingTop: moderateScale(10)}}>
          <Text
            style={{
              color: Theme.TEXT_GREY,
              fontSize: moderateScale(14),
            }}>
            {LanguageSelector.t('support.serviceId')}:{' '}
            <Text
              style={{
                color: Theme.TEXT_WHITE,
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}>
              {this.props.serviceId}
            </Text>
          </Text>
          <Text style={{color: Theme.TEXT_GREY, fontSize: moderateScale(12)}}>
            {this.props.time}
          </Text>
        </View>
      </View>
    );
  }
}

ServiceTile.contextType = ThemeContext;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: moderateScale(10),
    marginVertical: 2,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
    elevation: 3,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
