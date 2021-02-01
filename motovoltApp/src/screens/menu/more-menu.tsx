import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Dimensions,
  Platform,
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
import {mYellowMessengerModule} from '../../components/yellow-messenger';
import GreenMilesIcon from '../../assets/svg/green_miles_green_icon';
import CaloriesRedIcon from '../../assets/svg/calories_red_icon';
import FAQIcon from '../../assets/svg/faq_icon';
import SupportIcon from '../../assets/svg/support_icon';
import LanguageIcon from '../../assets/svg/languages_icon';
import SwapIcon from '../../assets/svg/swap';
import RoadSide from '../../assets/svg/roadside_assistance';
import LogoutIcon from '../../assets/svg/logout_icon';
import PencilEditIcon from '../../assets/svg/pencil-edit-button';
import ServiceStations from '../../assets/svg/service_stations';
import SmartInspect from '../../assets/svg/smart_inspect';
import VersionNumber from 'react-native-version-number';

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
    numberOfLines?: number;
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
          icon: FAQIcon,
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
          icon: SupportIcon,
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        {
          feature: LanguageSelector.t('morePremium.language'),
          icon: LanguageIcon,
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
          feature: LanguageSelector.t('morePremium.serviceStation'),
          icon: ServiceStations,
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
          feature: LanguageSelector.t('morePremium.smartInspect'),
          icon: SmartInspect,
          onPress: () => console.log('Smart pressed'),
          premium: false,
        },
        {
          feature: "Customer Service",
          icon: RoadSide,
          onPress: () => console.log('Feature pressed'),
          premium: false,
          numberOfLines:2
        },
        {
          feature: LanguageSelector.t('morePremium.logOut'),
          icon: LogoutIcon,
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
                {/* <Image
                  source={require('../../assets/icons/pencil-edit-button.png')}
                /> */}
                <PencilEditIcon />
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
              icon1={GreenMilesIcon}
              icon2={CaloriesRedIcon}
              value1={String(this.props.bike.greenMilesKm)}
              value2={String(this.props.bike.caloriesBurnt)}
            />
          </View>
          <View
            style={styles.upgrade}
            // onPress={() => this.props.navigation.navigate('Upgrade', {})}>
          >
            <Upgrade />
          </View>
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
                          // if (Platform.OS === 'android') {
                          mYellowMessengerModule.invokeChatBot();
                          // } else this.props.navigation.navigate('Support', {});
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
                        case LanguageSelector.t('morePremium.serviceStation'):
                          this.props.navigation.navigate('ServiceStation', {});
                          return;
                        // case "Theme":
                        //   this.props.navigation.navigate('Theme', {});
                        //   break;
                        case LanguageSelector.t('morePremium.smartInspect'):
                          this.props.navigation.navigate(
                            'SmartInspectStack',
                            {},
                          );
                          return;
                        case "Customer Service":
                          this.props.navigation.navigate('CustomerServiceStack', {});
                          return;
                        default:
                          this.props.navigation.navigate('ComingSoon', {});
                          break;
                      }
                    }}
                    premium={feature.premium}
                    numberOfLines={feature.numberOfLines}
                  />
                </View>
              );
            })}
          </View>
          <View>
            <Text style={styles.copyrightText}>
              V{VersionNumber.appVersion} | © Copyright{' '}
              {new Date().getFullYear()} | Motovolt Mobility Pvt Ltd.
            </Text>
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
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
    marginTop: 40,
    marginBottom: 10,
  },
});
