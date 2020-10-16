import React from 'react';
import { View, Image, Text } from 'react-native';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import FontWeight from '../../styles/font-weight';
import { scale } from '../../styles/size-matters';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import LanguageSelector from '../../translations';
import { ThemeContext } from '../../styles/theme/theme-context';


type ComingSoonNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'ComingSoon'
>;

type Props = {
  navigation: ComingSoonNavigationProp,
  route: RouteProp<MenuStackParamList, 'ComingSoon'>
};

export default class ComingSoon extends React.PureComponent<Props, {}> {
  render() {
    let Theme = this.context.theme;
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Header backgroundColor={Theme.HEADER_YELLOW} title={LanguageSelector.t("comingSoonTitle")} hasBackButton onBackClick={() => this.props.navigation.goBack()} />
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.BG_GREY,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/coming-soon.png')}
            style={{ width: '100%', height: '100%', }}
            width={scale(200)}
            height={scale(200)}
          />
          <View style={{ width: '80%' }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.BLACK,
                fontSize: 28,
                fontWeight: FontWeight.BOLD,
              }}>
              {LanguageSelector.t("comingSoonTitle")}
            </Text>
            <Text>{'\n\n'}</Text>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.BLACK,
                fontSize: 16,
              }}>
              {LanguageSelector.t("comingSoonSubTitle")}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ComingSoon.contextType = ThemeContext
