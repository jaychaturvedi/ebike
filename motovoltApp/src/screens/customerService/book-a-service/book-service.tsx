import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../home/components/header';
import {ThemeContext} from '../../../styles/theme/theme-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon, Text} from 'native-base';
import {scale} from '../../../styles/size-matters';
import AddReport from '../../../assets/svg/add-report';
import ActiveIssueIcon from '../../../assets/svg/active-issue';
import PastServiceIcon from '../../../assets/svg/past-service';
import GestureRecognizer from 'react-native-swipe-gestures';
import Moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {CustomerServiceStackParamList} from '../../../navigation/customer-service';
import {TBookedServices, TStore} from '../../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  OnCancelService,
  GetBookedServices,
} from 'src/service/redux/actions/saga';
import RequestServiceIcon from '../../../assets/svg/service_stations';
import DragHandle from './components/drag-handle';
import ActiveService from './components/active-service';
import PastService from './components/past-service';

interface ReduxState {
  bookedServices: TStore['requestedServices']['bookedServices'];
  onServiceCancelledStatus: TStore['requestedServices']['onServiceCancelledStatus'];
  user: TStore['user'];
  onCancelService: (params: OnCancelService) => void;
  getBookedServices: (params: GetBookedServices) => void;
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'BookAService'>;
}
type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'BookAService'
>;

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var MAXIMUM_HEIGHT = deviceHeight - 250;
var MINUMUM_HEIGHT = 80;

type State = {
  expanded: boolean;
};

// function PastService(props: {service: TBookedServices}) {
//   console.warn(props);

//   return (
//     <View
//       style={{
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//       }}>
//       <Text style={{opacity: 0.6}}>{props.service.serviceTypeName}</Text>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{marginRight: 20}}>
//           {Moment(props.service.serviceDate)
//             .startOf('day')
//             .format('DD MMM YYYY')
//             .toString()}
//         </Text>
//         <PastServiceIcon />
//       </View>
//     </View>
//   );
// }

class BookService extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    this.props.getBookedServices({
      type: 'GetBookedServices',
      payload: {
        frameId: this.props.user.defaultBikeId,
      },
    });
  }

  onSwipe(gestureName: string, gestureState: any) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({expanded: true});
        break;
      case SWIPE_DOWN:
        this.setState({expanded: false});
        break;
      default:
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    let Theme = this.context.theme; //load theme context
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header
          hasBackButton
          title={'Book a Service'}
          backgroundColor={Theme.HEADER_YELLOW}
          hideNotification
          hideBluetooth
          hidePromo
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View
          style={{position: 'relative', backgroundColor: '#F6F6F6', flex: 1}}>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Menu style={{marginTop: scale(42)}}>
              <MenuTrigger>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text style={{marginRight: 8}}>
                    {this.props.user.defaultBikeId}
                  </Text>
                  <Icon
                    type="FontAwesome"
                    name="caret-down"
                    style={{fontSize: 20}}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{padding: 20}}>
                <MenuOption onSelect={() => {}}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', opacity: 0.67}}>
                    {this.props.user.defaultBikeId}
                  </Text>
                </MenuOption>
                {/* <View
                  style={{ borderWidth: 1, opacity: 0.1, marginVertical: 20 }}
                /> */}
              </MenuOptions>
            </Menu>
            <Image
              style={{
                marginTop: scale(77),
                marginBottom: 68,
                resizeMode: 'contain',
              }}
              height={scale(250)}
              source={require('../../../assets/images/report-a-service.png')}
            />
          </View>
          <AddReport
            onPress={() => this.props.navigation.replace('BookNewService', {})}
            style={{
              width: 68,
              height: 68,
              position: 'absolute',
              right: 20,
              bottom: 20,
            }}
          />
        </View>
        <View
          style={{
            bottom: 0,
            width: '100%',
            height: this.state.expanded ? '50%' : '30%',
            position: 'relative',
            zIndex: 1,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <GestureRecognizer
              onSwipeDown={() => this.setState({expanded: false})}
              onSwipeUp={() => this.setState({expanded: true})}
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              config={config}>
              <TouchableOpacity
                onPress={() => this.setState({expanded: !this.state.expanded})}>
                <DragHandle />
              </TouchableOpacity>
            </GestureRecognizer>
            <ScrollView style={{backgroundColor: '#E5E5E5'}}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#5372FF',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}>
                <Text style={{color: 'white', fontSize: 22}}>
                  Active Service Booking
                </Text>
                {this.props.bookedServices
                  // Completed
                  .filter((service) => service.status === 'A')
                  .map((service) => (
                    <View style={{marginTop: 22}} key={service.bookServiceId}>
                      <ActiveService
                        createDate={new Date(service.serviceDate)}
                        onCancel={() => {
                          this.props.onCancelService({
                            type: 'OnCancelService',
                            payload: {serviceId: service.bookServiceId},
                          });
                        }}
                        serviceCenterName={service.serviceProviderName}
                        slot={service.serviceDate}
                      />
                    </View>
                  ))}
              </View>
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  width: '100%',
                }}>
                <Text style={{fontSize: 22, marginBottom: 30}}>
                  Past Services
                </Text>
                {this.props.bookedServices
                  // Completed
                  .filter((service) => service.status === 'C')
                  .map((item: TBookedServices, i) => {
                    return (
                      <React.Fragment key={item.bookServiceId}>
                        <PastService
                          serviceDate={new Date(item.serviceDate)}
                          serviceType={item.serviceTypeName}
                        />
                        {i !== this.props.bookedServices.length && (
                          <View
                            style={{
                              borderWidth: 1,
                              opacity: 0.1,
                              marginVertical: 12,
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

BookService.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      bookedServices: store['requestedServices']['bookedServices'],
      onServiceCancelledStatus:
        store['requestedServices']['onServiceCancelledStatus'],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      onCancelService: (params: OnCancelService) => dispatch(params),
      getBookedServices: (params: GetBookedServices) => dispatch(params),
    };
  },
)(BookService);
