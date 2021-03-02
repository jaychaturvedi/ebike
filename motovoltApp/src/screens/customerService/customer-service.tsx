import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Feature from '../../components/feature';
import Header from '../home/components/header/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {CustomerServiceStackParamList} from '../../navigation/customer-service';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {SignOut} from '../../service/redux/actions/saga/authentication-actions';
import LanguageSelector from '../../translations';
import {ThemeContext} from '../../styles/theme/theme-context';
import ReportAnIssueIcon from '../../assets/svg/report_an_issue';
import RequestServiceIcon from '../../assets/svg/service_stations';
import RoadsideAssistanceIcon from '../../assets/svg/roadside_assistance';
import SupportIcon from '../../assets/svg/support_icon';
import {mYellowMessengerModule} from '../../components/yellow-messenger';

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'CustomerServices'
>;

interface ReduxState {
  user: TStore['user'];
  bike: TStore['bike'];
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'CustomerServices'>;
  logout: (params: SignOut) => void;
}

type State = {
  feature: {
    id: string;
    feature: string;
    icon: any;
    badge?: React.ReactNode;
    secondLine?: string;
    onPress: () => void;
    premium: boolean;
  }[];
};

class CustomerServices extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      feature: [
        {
          id:"REPORT_ISSUE",
          feature: 'Report an',
          secondLine: 'Issue',
          icon: ReportAnIssueIcon,
          onPress: () => console.log('Feature pressed'),
          premium: false,
          // numberOfLines: 2,
        },
        {
          id:LanguageSelector.t('morePremium.support'),
          feature: "Chat with us",
          icon: SupportIcon,
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        {
          id: 'REQUEST_SERVICE',
          feature: 'Book a',
          secondLine: 'Service',
          icon: RequestServiceIcon,
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
        {
          id: 'ROADSIDE_ASSISTANCE',
          feature: 'Roadside',
          secondLine: 'Assistance',
          icon: RoadsideAssistanceIcon,
          onPress: () => console.log('Feature pressed'),
          premium: false,
        },
      ],
    };
  }

  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View style={{...styles.container, backgroundColor: Theme.BACKGROUND}}>
        <Header
          hideNotification
          hasBackButton
          title={LanguageSelector.t('morePremium.support')}
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            ...styles.features,
            ...{
              flexDirection: 'row',
              flexWrap: 'wrap',
              // alignContent: 'center',
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
                  secondLine={feature.secondLine}
                  icon={feature.icon}
                  badge={feature.badge}
                  onPress={() => {
                    switch (feature.id) {
                      case LanguageSelector.t('morePremium.support'):
                        // if (Platform.OS === 'android') {
                        mYellowMessengerModule.invokeChatBot();
                        // } else this.props.navigation.navigate('Support', {});
                        break;
                      case "REPORT_ISSUE":
                        this.props.navigation.navigate('ReportAnIssue', {});
                        break;
                      case 'REQUEST_SERVICE':
                        this.props.navigation.navigate('BookAService', {});
                        break;
                      case 'ROADSIDE_ASSISTANCE':
                        this.props.navigation.navigate(
                          'RoadAssistanceLanding',
                          {},
                        );
                        break;
                      default:
                        // this.props.navigation.navigate('CustomerServices', {});
                        break;
                    }
                  }}
                  premium={feature.premium}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
CustomerServices.contextType = ThemeContext; //import theme in class as this.context

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
)(CustomerServices);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#282C52', //dark theme
    // padding: moderateScale(15)
  },
  features: {
    marginTop: moderateScale(15),
    flex: 1,
    width: '100%',
    paddingLeft: moderateScale(9),
    paddingRight: moderateScale(9),
  },
});
