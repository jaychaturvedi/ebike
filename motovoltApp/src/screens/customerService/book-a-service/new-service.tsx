import React from 'react';
import {
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Header from '../../home/components/header';
import {ThemeContext} from '../../../styles/theme/theme-context';
import {Icon, Text, Button, DatePicker} from 'native-base';
import DateIcon from '../../../assets/svg/date';
import SearchIcon from '../../../assets/svg/search-icon';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {CustomerServiceStackParamList} from '../../../navigation/customer-service';
import {
  TNearbyServiceProviders,
  TStore,
  TAvailableServiceSlot,
} from '../../../service/redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  GetNearbyServiceProviders,
  GetBookingTimeSlot,
  OnBookingService,
  GetBookedServices,
} from 'src/service/redux/actions/saga';
import Geolocation from '@react-native-community/geolocation';
import { config, yantraRequest } from '../../../service/redux/saga/utils';

interface ReduxState {
  avilableServiceSlot: TStore['requestedServices']['avilableServiceSlot'];
  nearbyServiceProviders: TStore['requestedServices']['nearbyServiceProviders'];
  serviceBookedStatus: TStore['requestedServices']['serviceBookedStatus'];
  defaultBikeId: TStore['user']['defaultBikeId'];
  getBookingTimeSlot: (params: GetBookingTimeSlot) => void;
  getNearbyServiceProviders: (params: GetNearbyServiceProviders) => void;
  getBookedServices: (params: GetBookedServices) => void;
}
interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'BookNewService'>;
}

type State = {
  showDatePicker: boolean;
  date: string;
  timeSlot: string;
  openStationDropdown: boolean;
  serviceStationSelected: boolean;
  selectedServiceId: number;
  selectedProviderId: number;
  selectedProviderName: string;
  selectedProviderTypeId: number;
  locationFetchedStatus: 'SUCCESS' | 'FAILURE' | 'PENDING';
  loading: boolean;
};

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'BookNewService'
>;

class NewService extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDatePicker: false,
      date: '',
      timeSlot: '',
      serviceStationSelected: false,
      openStationDropdown: false,
      selectedServiceId: -1,
      selectedProviderId: -1,
      selectedProviderName: '',
      selectedProviderTypeId: -1,
      locationFetchedStatus: 'PENDING',
      loading: true,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (location) => {
        this.props.getNearbyServiceProviders({
          type: 'GetNearbyServiceProviders',
          payload: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            // lat: 12.8923272,
            // lon: 77.5963663,
            type: 'SW',
            dist: 4,
          },
        });
      },
      (error) => {
        this.setState({
          locationFetchedStatus: 'FAILURE',
          loading: false,
        });
      },
    );
  }

  getTimeSlot() {
    this.props.getBookingTimeSlot({
      type: 'GetBookingTimeSlot',
      payload: {
        slotGroupId: this.state.selectedProviderId,
      },
    });
  }

  onDatePick = (date: Date) => {
    this.setState({
      showDatePicker: false,
      date: Moment(date).format('DD MMM YYYY'),
    });
  };

  onDatePickerClose = () => {
    this.setState({
      showDatePicker: false,
    });
  };

  onConfirmBooking = () => {
    return new Promise((resolve, reject) => {
      yantraRequest(`${config.yantraBaseUrl}/yantra/bookservice`,
      "POST",
      {
        "frame_id": this.props.defaultBikeId,
        "service_provider_id": this.state.selectedProviderId,
        "service_type_id": 18,
        "service_date":`${Moment(this.state.date).format('YYYY-MM-DD')}`
      })
        .then((dataResponse) => {
          if (dataResponse.success) {
            const data = dataResponse.response?.body
            if (data.status === "OK") {
              resolve("success")
            }
            else {
              reject("fail")
            }
          } else reject("fail")
        }).catch((e) => {
          reject("fail")
        });
    });
  }

  renderStationOptions = (
    id: number,
    serviceProvider: TNearbyServiceProviders,
  ) => {
    if(serviceProvider.st=="false"){
      return <Text>No service station available</Text>
    }
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          marginVertical: 10,
        }}
        onPress={() => {
          this.setState(
            {
              selectedServiceId: id,
              openStationDropdown: false,
              serviceStationSelected: true,
              selectedProviderId: serviceProvider.serviceProviderId,
              selectedProviderName: serviceProvider.stationName,
              selectedProviderTypeId: serviceProvider.locMasterId,
            },
            () => {
              this.getTimeSlot();
            },
          );
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 5,
            marginRight: 12,
          }}>
          <Image
            source={require('../../../assets/icons/service_location_pin.png')}
          />
        </View>
        <View
          style={{
            flex: 3,
            display: 'flex',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                ...styles.address,
                color: 'black',
                opacity: 0.7
              }}
              numberOfLines={1}>
              {serviceProvider.stationName}
            </Text>
            <Text
              style={{color: 'grey', fontSize: 14, marginTop: 5}}
              numberOfLines={1}>
              {`${serviceProvider.dist} km. ${serviceProvider.status}`}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                opacity: 0.7,
                marginTop: 6}}
              numberOfLines={1}>
              {`${serviceProvider.addressLine1}, ${serviceProvider.addressLine2}, ${serviceProvider.addressLine3}`}
            </Text>
          </View>
        </View>
        <View style={styles.icons}>
          <Icon
            type="FontAwesome"
            name="check-circle"
            style={{
              fontSize: 40,
              color:
                this.state.selectedServiceId === id
                  ? '#40A81B'
                  : 'rgba(0, 0, 0, 0.1)',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
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
          onBackClick={() => this.props.navigation.replace('BookAService', {})}
        />
        <View style={{backgroundColor: '#F6F6F6', flex: 1}}>
          <View
            style={{
              width: '100%',
              marginTop: 47,
              backgroundColor: 'white',
              paddingHorizontal: 25,
              elevation: 3,
              shadowOpacity: 0.25,
              shadowRadius: 1,
              shadowColor: 'black',
              shadowOffset: {height: 1, width: 1},
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({showDatePicker: !this.state.showDatePicker});
              }}>
              <View
                style={{
                  width: '100%',
                  height: 80,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {this.state.date.length ? (
                  <Text style={{fontSize: 18, opacity: 0.6}}>{this.state.date}</Text>
                ) : (
                  <Text style={{fontSize: 18, opacity: 0.6}}>Choose Date</Text>
                )}
                <DateIcon />
              </View>
            </TouchableOpacity>
            <View style={{borderWidth: 0.5, opacity: 0.1}}></View>
            <View style={{width: '100%', height: 80}}>
              <View
                style={{
                  width: '100%',
                  height: 80,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  {this.state.selectedServiceId !== -1 ? (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 3,
                        // width: 150
                      }}>
                      <Image
                        style={{marginRight: 10}}
                        source={require('../../../assets/icons/service_location_pin.png')}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          maxWidth: '50%',
                          fontSize: 18,
                          color: 'black',
                          textAlign: 'left',
                          opacity: 0.6
                        }}>
                        {this.state.selectedProviderName}
                      </Text>
                    </View>
                  ) : (
                    <Text style={{
                      fontSize: 18,
                      opacity: 0.6}}>
                        Choose Service Station
                      </Text>
                  )}
                </View>
                {this.state.serviceStationSelected && (
                  <View style={{marginRight: 16}}>
                    <Menu style={{}}>
                      <MenuTrigger>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              marginRight: 8,
                              opacity: 0.6
                            }}>
                            {this.state.timeSlot.length
                              ? this.state.timeSlot
                              : 'Choose Slot'}
                          </Text>
                          <Icon
                            type="FontAwesome"
                            name="caret-down"
                            style={{fontSize: 20}}
                          />
                        </View>
                      </MenuTrigger>
                      <MenuOptions
                        optionsContainerStyle={{
                          padding: 20,
                          marginTop: 50,
                        }}>
                        {this.props.avilableServiceSlot.length &&
                        this.props.avilableServiceSlot.map(
                          (slot: TAvailableServiceSlot, index: number) => {
                            const showDivider =
                              this.props.avilableServiceSlot.length - 1 !==
                              index;
                            return (
                              <MenuOption
                                onSelect={() => {
                                  this.setState({timeSlot: slot.slotName});
                                }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                  }}>
                                  {slot.slotName}
                                </Text>
                                {showDivider && (
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      opacity: 0.1,
                                      marginVertical: 20,
                                    }}
                                  />
                                )}
                              </MenuOption>
                            );
                          },
                        )}
                      </MenuOptions>
                    </Menu>
                  </View>
                )}
                <SearchIcon
                  onPress={() => {
                    this.setState({
                      openStationDropdown: !this.state.openStationDropdown,
                    });
                  }}
                />
              </View>
            </View>
          </View>
          {this.state.openStationDropdown ? (
            <ScrollView style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: 'white',
                  elevation: 3,
                  shadowOpacity: 0.25,
                  shadowRadius: 1,
                  shadowColor: 'black',
                  shadowOffset: {height: 1, width: 1},
                  // height: 100,
                  width: '85%',
                  flex: 1,
                  marginTop: 2,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  alignSelf: 'flex-end',
                }}>
                {this.props.nearbyServiceProviders.length ? this.props.nearbyServiceProviders.map(
                  (item: TNearbyServiceProviders, index: number) => {
                    return this.renderStationOptions(index, item);
                  },
                ): null}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                display:"flex",
                flexDirection:"row",
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 62,
              }}>
              <Button
                onPress={()=>{
                  this.onConfirmBooking().then((status)=>{
                    if(status==="success"){
                      this.props.getBookedServices({
                        type: 'GetBookedServices',
                        payload: {
                          frameId: this.props.defaultBikeId,
                        },
                      });
                    }
                    this.props.navigation.goBack();
                  })
                }}
                disabled={
                  !(
                    this.state.serviceStationSelected &&
                    this.state.date.length &&
                    this.state.timeSlot.length
                  )
                }
                style={{
                  backgroundColor:
                    this.state.serviceStationSelected &&
                    this.state.date.length &&
                    this.state.timeSlot.length
                      ? '#142F6A'
                      : '#AFAFAF',
                  width: 246,
                  height: 57,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    textTransform:"capitalize",
                    borderRadius: 5}}>
                  Confirm
                </Text>
              </Button>
            </View>
          )}
        </View>
        <DateTimePickerModal
          isVisible={this.state.showDatePicker}
          mode="date"
          minimumDate={
            Moment(new Date()).startOf('day').toDate()
          }
          date={new Date(this.state.date || new Date())}
          onConfirm={this.onDatePick}
          onCancel={this.onDatePickerClose}
        />
      </View>
    );
  }
}

NewService.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      avilableServiceSlot: store['requestedServices']['avilableServiceSlot'],
      nearbyServiceProviders:
        store['requestedServices']['nearbyServiceProviders'],
      serviceBookedStatus: store['requestedServices']['serviceBookedStatus'],
      defaultBikeId: store['user']['defaultBikeId'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      getBookingTimeSlot: (params: GetBookingTimeSlot) => dispatch(params),
      getNearbyServiceProviders: (params: GetNearbyServiceProviders) =>
        dispatch(params),
      getBookedServices: (params: GetBookedServices) => dispatch(params),
    };
  },
)(NewService);

const styles = StyleSheet.create({
  address: {
    fontSize: 18,
    fontWeight: '500',
    flexDirection: 'column',
    display: 'flex',
    opacity: 0.7,
  },
  icons: {
    flex: 1,
    alignItems: 'flex-end',
    // justifyContent: "center",
    marginTop: 5,
  },
});
