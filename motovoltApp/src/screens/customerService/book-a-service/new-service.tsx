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
import { ThemeContext } from '../../../styles/theme/theme-context';
import { Icon, Text, Button, DatePicker } from 'native-base';
import DateIcon from '../../../assets/svg/date';
import SearchIcon from '../../../assets/svg/search-icon';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CustomerServiceStackParamList } from '../../../navigation/customer-service';
import { TNearbyServiceProviders, TStore, TAvailableServiceSlot } from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetNearbyServiceProviders, GetBookingTimeSlot, OnBookingService } from 'src/service/redux/actions/saga';
import Geolocation from '@react-native-community/geolocation';

interface ReduxState {
  avilableServiceSlot: TStore['requestedServices']["avilableServiceSlot"],
  nearbyServiceProviders: TStore['requestedServices']["nearbyServiceProviders"],
  serviceBookedStatus: TStore['requestedServices']["serviceBookedStatus"],
  defaultBikeId: TStore['user']["defaultBikeId"],
  getBookingTimeSlot: (params: GetBookingTimeSlot) => void,
  getNearbyServiceProviders: (params: GetNearbyServiceProviders) => void,
  onBookingNewService: (params: OnBookingService) => void,
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
      selectedProviderName: "",
      selectedProviderTypeId: -1,
      locationFetchedStatus: 'PENDING',
      loading: true,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (location) => {
        console.warn(location.coords);
        this.props.getNearbyServiceProviders({
          type: "GetNearbyServiceProviders",
          payload: {
            // lat: location.coords.latitude,
            // lon: location.coords.longitude,
            lat: 12.8923272,
            lon: 77.5963663,
            type: "SW",
            dist: 4
          }
        })
      },
      (error) => {
        this.setState({
          locationFetchedStatus: 'FAILURE',
          loading: false,
        });
      },
    );
    console.warn(this.props.nearbyServiceProviders)
  }

  getTimeSlot() {
    this.props.getBookingTimeSlot({
      type: "GetBookingTimeSlot",
      payload: {
        slotGroupId: this.state.selectedProviderId
      }
    })
  }

  onDatePick = (date: Date) => {
    this.setState({
      showDatePicker: false,
      date: Moment(date).format('DD MMM YYYY'),
    });
  };

  onDatePickerClose = () => {
    this.setState({
      showDatePicker: false
    });
  };

  confirmBooking = () => {
    this.props.onBookingNewService({
      type: "OnBookingService",
      payload: {
        frameId: this.props.defaultBikeId,
        serviceDate: this.state.date,
        serviceProviderId: this.state.selectedProviderId,
        serviceTypeId: this.state.selectedProviderTypeId
      }
    })
    if (this.props.serviceBookedStatus.status === "OK")
      this.props.navigation.pop()
  }

  renderStationOptions = (id: number, serviceProvider: TNearbyServiceProviders) => {
    console.warn(serviceProvider.st)
    if (!serviceProvider.stationName)
      return <TouchableOpacity
        onPress={() => {
          this.setState({
            openStationDropdown: false,
          })
        }}
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          marginVertical: 10
        }}>
        <Text>No data available....</Text>
      </TouchableOpacity>
    else
      return <TouchableOpacity style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        marginVertical: 10
      }}
        onPress={() => {
          this.setState({
            selectedServiceId: id,
            openStationDropdown: false,
            serviceStationSelected: true,
            selectedProviderId: serviceProvider.serviceProviderId,
            selectedProviderName: serviceProvider.stationName,
            selectedProviderTypeId: serviceProvider.locMasterId
          })
          this.getTimeSlot()
        }}>
        <View style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingVertical: 5
        }}>
          <Image
            source={require('../../../assets/icons/service_location_pin.png')}
          />
        </View>
        <View style={{
          flex: 3,
          display: "flex",
        }}>
          <View style={{
            alignItems: "flex-start",
          }}>
            <Text style={{
              ...styles.address, color: "black"
            }}>
              {serviceProvider.stationName}
            </Text>
            <Text style={{ color: "grey" }}>
              {`${serviceProvider.dist} km. ${serviceProvider.status}`}
            </Text>
            <Text style={{ color: "black" }}>
              {`${serviceProvider.addressLine1}, ${serviceProvider.addressLine2}`}
            </Text>
            <Text style={{ color: "black" }}>
              {`${serviceProvider.addressLine3}, ${serviceProvider.pincode}`}
            </Text>
          </View>
        </View>
        <View style={styles.icons}>
          <Icon
            type="FontAwesome"
            name="check-circle"
            style={{
              fontSize: 40,
              color: this.state.selectedServiceId === id ? '#40A81B' : "rgba(0, 0, 0, 0.1)"
            }}
          />
        </View>
      </TouchableOpacity>
  }

  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Header
          hasBackButton
          title={'Book a Service'}
          backgroundColor={Theme.HEADER_YELLOW}
          hideNotification
          hideBluetooth
          hidePromo
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
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
              shadowOffset: { height: 1, width: 1 },
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showDatePicker: !this.state.showDatePicker });
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
                {this.state.date.length
                  ?
                  <Text style={{ fontSize: 18 }}>{this.state.date}</Text>
                  :
                  <Text style={{ fontSize: 18 }}>Choose date</Text>
                }
                <DateIcon />
              </View>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.5, opacity: 0.1 }}></View>
            <View style={{ width: '100%', height: 80 }}>
              <View
                style={{
                  width: '100%',
                  height: 80,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  {this.state.selectedServiceId !== -1
                    ?
                    <View style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 3,
                      // width: 150
                    }}>
                      <Image style={{ marginRight: 10 }}
                        source={require('../../../assets/icons/service_location_pin.png')}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 18,
                          color: "black",
                          textAlign: "left",
                        }}>
                        {this.state.selectedProviderName}
                      </Text>
                    </View>
                    :
                    <Text style={{ fontSize: 18 }}>Choose Service Station</Text>
                  }
                </View>
                {this.state.serviceStationSelected &&
                  <View >
                    <Menu style={{}}>
                      <MenuTrigger>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row'
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              marginRight: 8
                            }}>
                            {this.state.timeSlot.length
                              ? this.state.timeSlot
                              : "Choose Slot"}
                          </Text>
                          <Icon
                            type="FontAwesome"
                            name="caret-down"
                            style={{ fontSize: 20 }}
                          />
                        </View>
                      </MenuTrigger>
                      <MenuOptions
                        optionsContainerStyle={{
                          padding: 20,
                          marginTop: 50
                        }}>
                        {this.props.avilableServiceSlot
                          .map((slot: TAvailableServiceSlot, index: number) => {
                            const showDivider = this.props.avilableServiceSlot.length - 1 !== index
                            return (
                              <MenuOption
                                onSelect={() => {
                                  this.setState({ timeSlot: slot.slotName })
                                }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontWeight: '500'
                                  }}>
                                  {slot.slotName}
                                </Text>
                                {showDivider &&
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      opacity: 0.1,
                                      marginVertical: 20
                                    }}
                                  />}
                              </MenuOption>
                            )
                          })}
                      </MenuOptions>
                    </Menu>
                  </View>
                }
                <SearchIcon onPress={() => {
                  this.setState({ openStationDropdown: !this.state.openStationDropdown })
                }} />
              </View>
            </View>
          </View>
          {this.state.openStationDropdown
            ?
            <ScrollView style={{ flex: 1 }}>
              <View style={{
                backgroundColor: "white",
                elevation: 3,
                shadowOpacity: 0.25,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { height: 1, width: 1 },
                // height: 100,
                width: "85%",
                flex: 1,
                marginBottom: 10,
                paddingHorizontal: 40,
                paddingVertical: 10,
                alignSelf: "flex-end"
              }}>
                {this.props.nearbyServiceProviders
                  .map((item: TNearbyServiceProviders, index: number) => {
                    return this.renderStationOptions(1, item)
                  })}
              </View>
            </ScrollView>
            :
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 39,
              }}>
              <Button
                onPress={this.confirmBooking}
                disabled={!(this.state.serviceStationSelected
                  && this.state.date.length
                  && this.state.timeSlot.length)}
                style={{
                  backgroundColor: (this.state.serviceStationSelected
                    && this.state.date.length
                    && this.state.timeSlot.length) ? '#142F6A' : "#AFAFAF",
                  width: 246,
                  height: 57,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8
                }}>
                <Text style={{ fontSize: 20, fontWeight: '600', borderRadius: 5 }}>Confirm</Text>
              </Button>
            </View>
          }
        </View>
        <DateTimePickerModal
          isVisible={this.state.showDatePicker}
          mode="date"
          date={new Date(this.state.date || new Date())}
          onConfirm={this.onDatePick}
          onCancel={this.onDatePickerClose}
          maximumDate={new Date()}
        />
      </View>
    );
  }
}

NewService.contextType = ThemeContext;


export default connect(
  (store: TStore) => {
    return {
      avilableServiceSlot: store['requestedServices']["avilableServiceSlot"],
      nearbyServiceProviders: store['requestedServices']["nearbyServiceProviders"],
      serviceBookedStatus: store['requestedServices']["serviceBookedStatus"],
      defaultBikeId: store['user']["defaultBikeId"],
    };
  },
  (dispatch: Dispatch) => {
    return {
      getBookingTimeSlot: (params: GetBookingTimeSlot) => dispatch(params),
      getNearbyServiceProviders: (params: GetNearbyServiceProviders) => dispatch(params),
      onBookingNewService: (params: OnBookingService) => dispatch(params),
    };
  },
)(NewService);

const styles = StyleSheet.create({
  address: {
    fontSize: 18,
    fontWeight: "500",
    flexDirection: "column",
    display: "flex"
  },
  icons: {
    flex: 1,
    alignItems: "flex-end",
    // justifyContent: "center",
    marginTop: 5
  }
});