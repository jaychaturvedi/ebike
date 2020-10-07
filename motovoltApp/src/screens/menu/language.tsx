import React from 'react';
import {View, StyleSheet, Button, Text, TouchableOpacity} from 'react-native';
import Header from '../home/components/header/index';
import Colors from '../../styles/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../../navigation/menu';
import LanguageSelector from '../../translations';
import Bengali from '../../translations/bn.json';
import English from '../../translations/en.json';

type MoreMenuNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'Language'
>;

type Props = {
  navigation: MoreMenuNavigationProp;
  route: RouteProp<MenuStackParamList, 'Language'>;
};

export default class SelectLanguage extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  changeLanguage(language: string) {
    LanguageSelector.locale = language;
    this.props.navigation.replace('MenuScreen', {});
  }

  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Header
          title="Language"
          backgroundColor={Colors.HEADER_YELLOW}
          hasBackButton
          onBackClick={() => this.props.navigation.replace('MenuScreen', {})}
        />
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => this.changeLanguage('en')}
              style={styles.tile}>
              <Text style={{fontSize: 64}}>{English.A}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeLanguage('bn-IN')}
              style={styles.tile}>
              <Text style={{fontSize: 64}}>{Bengali.A}</Text>
            </TouchableOpacity>
            <View style={{width: '33%'}}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  tile: {
    width: '31%',
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 4, width: 2},
  },
});
