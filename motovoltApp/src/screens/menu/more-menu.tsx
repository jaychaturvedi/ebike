import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ProfileImage from '../../components/profile';
import RideMetric from '../../components/ride-metric';
import upgrade from '../../components/upgrade-premium';
import Upgrade from '../../components/upgrade-premium';
import Feature from '../../components/feature';
import Header from '../home/components/header/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../../navigation/menu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {SignOut} from '../../service/redux/actions/saga/authentication-actions';
import LanguageSelector from '../../translations';
import {ThemeContext} from '../../styles/theme/theme-context';

type MoreMenuNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'MenuScreen'
>;

interface ReduxState {
  user: TStore['user'];
  bike: TStore['bike'];
}

interface Props extends ReduxState {
  navigation: MoreMenuNavigationProp;
  route: RouteProp<MenuStackParamList, 'MenuScreen'>;
  logout: (params: SignOut) => void;
}

type State = {
  feature: {
    feature: string;
    icon: any;
    badge?: React.ReactNode;
    onPress: () => void;
    premium: boolean;
  }[];
};

class MoreMenu extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      feature: [
        // {
        //   feature: LanguageSelector.t('morePremium.batteryAnalytics'),
        //   icon: require('../../assets/icons/battery_analytics.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: true,
        // },
        // {
        //   feature: LanguageSelector.t('morePremium.geoFencing'),
        //   icon: require('../../assets/icons/geo_fencing_icon.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: true,
        // },
        // {
        //   feature: LanguageSelector.t('morePremium.nearby'),
        //   icon: require('../../assets/icons/nearby_icon.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: false,
        // },
        {
          feature: LanguageSelector.t('morePremium.faqs'),
          icon: require('../../assets/icons/faq_icon.png'),
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        // {
        //   feature: LanguageSelector.t('morePremium.community'),
        //   icon: require('../../assets/icons/comunity_icon.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: false,
        // },
        {
          feature: LanguageSelector.t('morePremium.support'),
          icon: require('../../assets/icons/support_icon.png'),
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        {
          feature: LanguageSelector.t('morePremium.language'),
          icon: require('../../assets/icons/languages_icon.png'),
          onPress: () => console.log('Feature pressed'),
          badge: (
            <Text
              style={{
                fontSize: 18,
              }}>
              {LanguageSelector.t('A')}
            </Text>
          ),
          premium: false,
        },
        {
          feature: LanguageSelector.t('morePremium.swap'),
          icon: require('../../assets/icons/swap.png'),
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        // {
        //   feature: LanguageSelector.t('morePremium.promotions'),
        //   icon: require('../../assets/icons/promotions_icon.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: false,
        // },
        // {
        //   feature: LanguageSelector.t('morePremium.sendInvite'),
        //   icon: require('../../assets/icons/send_invite_icon.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: false,
        // },
        // {
        //   feature: LanguageSelector.t('morePremium.insurance'),
        //   icon: require('../../assets/icons/insurance_icon.png'),
        //   onPress: () => console.log('Feature pressed'),
        //   premium: false,
        // },
        {
          feature: LanguageSelector.t('morePremium.logOut'),
          icon: require('../../assets/icons/logout_icon.png'),
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        // {
        //   feature: "Theme",
        //   icon: require('../../assets/icons/promotions_icon.png'),
        //   onPress: () => console.log('Theme pressed'),
        //   premium: false,
        // },
      ],
    };
  }

  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View style={{...styles.container, backgroundColor: Theme.BACKGROUND}}>
        <Header
          title={LanguageSelector.t('morePremium.more')}
          backgroundColor={Theme.HEADER_YELLOW} //change dark Theme
        />
        <ScrollView style={{width: '100%'}}>
          <View style={styles.profile}>
            <ProfileImage />
            <Text
              style={{
                fontSize: moderateScale(24),
                fontWeight: 'bold',
                paddingTop: moderateScale(10),
                textAlign: 'center',
                color: Theme.TEXT_WHITE,
              }}>
              {this.props.user.name}&nbsp;
              <Text
                style={{
                  fontSize: moderateScale(24),
                  fontWeight: 'bold',
                  paddingTop: moderateScale(10),
                  textAlign: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Profile', {})}>
                <Image
                  source={require('../../assets/icons/pencil-edit-button.png')}
                />
              </Text>
            </Text>
            <Text style={{textAlign: 'center', color: Theme.TEXT_WHITE}}>
              {this.props.bike.modal}
            </Text>
          </View>
          <View
            style={{
              ...styles.metric,
              // backgroundColor: 'white', //change dark theme
            }}>
            <RideMetric
              header1={LanguageSelector.t('morePremium.greenMiles')}
              header2={LanguageSelector.t('morePremium.calories')}
              unit1="Km"
              unit2=""
              icon1={require('../../assets/icons/green_miles_green_icon.png')}
              icon2={require('../../assets/icons/calories_red_icon.png')}
              value1={String(this.props.bike.greenMilesKm)}
              value2={String(this.props.bike.caloriesBurnt)}
            />
          </View>
          <TouchableOpacity
            style={styles.upgrade}
            onPress={() => this.props.navigation.navigate('Upgrade', {})}>
            <Upgrade />
          </TouchableOpacity>
          <View
            style={{
              ...styles.features,
              ...{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'center',
              },
            }}>
            {this.state.feature.map((feature, index: number) => {
              return (
                <View
                  style={{
                    width: '33.3%',
                    alignItems: 'center',
                  }}
                  key={index}>
                  <Feature
                    feature={feature.feature}
                    icon={feature.icon}
                    badge={feature.badge}
                    onPress={() => {
                      switch (feature.feature) {
                        case LanguageSelector.t('morePremium.support'):
                          this.props.navigation.navigate('Support', {});
                          break;
                        case LanguageSelector.t('morePremium.faqs'):
                          this.props.navigation.navigate('Faq', {});
                          break;
                        case LanguageSelector.t('morePremium.logOut'):
                          this.props.logout({type: 'SignOut', payload: {}});
                          break;
                        case LanguageSelector.t('morePremium.language'):
                          this.props.navigation.navigate('Language', {});
                          break;
                        // case "Theme":
                        //   this.props.navigation.navigate('Theme', {});
                        //   break;
                        default:
                          this.props.navigation.navigate('ComingSoon', {});
                          break;
                      }
                    }}
                    premium={feature.premium}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
MoreMenu.contextType = ThemeContext; //import theme in class as this.context

export default connect(
  (store: TStore) => {
    return {
      user: store['user'],
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      logout: (params: SignOut) => dispatch(params),
    };
  },
)(MoreMenu);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#282C52', //dark theme
    // padding: moderateScale(15)
  },
  profile: {
    height: moderateScale(160),
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
  metric: {
    // height: moderateScale(65),
    // backgroundColor: 'white',
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(0),
    paddingRight: moderateScale(0),
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
  },
  upgrade: {
    marginTop: moderateScale(15),
    height: moderateScale(90),
    borderRadius: moderateScale(20),
    backgroundColor: '#FFC40F',
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
  },
  features: {
    marginTop: moderateScale(15),
    flex: 1,
    width: '100%',
    paddingLeft: moderateScale(9),
    paddingRight: moderateScale(9),
  },
});
