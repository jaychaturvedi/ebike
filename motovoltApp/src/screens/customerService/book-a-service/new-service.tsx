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

type State = {
  showDatePicker: boolean;
  date: string;
  timeSlot: any;
  openStationDropdown: boolean;
  serviceStationSelected: boolean;
  selectedServiceId: number;
};

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'BookAService'
>;

interface Props {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'BookAService'>;
}

const timeSlotArray = [
  { from: "09 am", to: "12 pm" },
  { from: "12 pm", to: "06 pm" },
  { from: "06 pm", to: "12 am" }
]
export default class NewService extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDatePicker: false,
      date: '',
      timeSlot: 'Choose Slot',
      serviceStationSelected: false,
      openStationDropdown: false,
      selectedServiceId: -1
    };
  }

  onDatePick = (date: Date) => {
    this.setState({
      showDatePicker: false,
      date: Moment(date).format('DD MMM YYYY'),
    });
  };

  onDatePickerClose = () => { };

  renderStationOptions = (id: number) => {
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
          serviceStationSelected: true
        })
      }}>
      <View style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingVertical:5
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
            {"Sogo Mobility"}
          </Text>
          <Text style={{ color: "black" }}>
            {"Brigade cross road, Ashok nagar"}
          </Text>
          <Text style={{ color: "grey" }}>
            {"2.0 Km. Closed"}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Icon
          type="FontAwesome"
          name="check-circle"
          style={{
            fontSize:40,
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
                      justifyContent: "space-between",
                      // flex:3,
                      width: 150
                    }}>
                      <Image
                        source={require('../../../assets/icons/service_location_pin.png')}
                      />
                      <Text style={{
                        fontSize: 18, color: "black"
                      }}>
                        {"Sogo Mobility"}
                      </Text>
                    </View>
                    :
                    <Text style={{ fontSize: 18 }}>Choose Service Station</Text>
                  }
                </View>
                {this.state.serviceStationSelected &&
                  // <View style={{ display: 'flex', flexDirection: 'row' }}>
                  //   <Picker
                  //     selectedValue={this.state.timeSlot}
                  //     style={{ height: 50, width: 120 }}
                  //     mode={"dropdown"}
                  //     onValueChange={(itemValue, itemIndex) =>
                  //       this.setState({ timeSlot: itemValue })
                  //     }>
                  //     <Picker.Item label="Choose Slot" value="null" color="grey" />
                  //     {timeSlotArray.map((item, index) => {
                  //       return <Picker.Item label={`${item.from} to ${item.to}`} value={`${item.from} to ${item.to}`}/>                        
                  //     })}
                  //   </Picker>
                  // </View>
                  <View >
                    <Menu style={{}}>
                      <MenuTrigger>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                          <Text style={{ fontSize: 18, marginRight: 8 }}>{this.state.timeSlot}</Text>
                          <Icon
                            type="FontAwesome"
                            name="caret-down"
                            style={{ fontSize: 20 }}
                          />
                        </View>
                      </MenuTrigger>
                      <MenuOptions optionsContainerStyle={{ padding: 20,marginTop:50 }}>
                        <MenuOption onSelect={() => { this.setState({ timeSlot: "09 am - 01 pm" }) }}>
                          <Text
                            style={{ fontSize: 18, fontWeight: '500' }}>
                            09 am - 01 pm
                          </Text>
                        </MenuOption>
                        <View
                          style={{ borderWidth: 1, opacity: 0.1, marginVertical: 20 }}
                        />
                        <MenuOption onSelect={() => { this.setState({ timeSlot: "09 am - 05 pm" }) }}>
                          <Text
                            style={{ fontSize: 18, fontWeight: '500', opacity: 0.67 }}>
                            09 am - 05 pm
                          </Text>
                        </MenuOption>
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
                shadowOffset: {height: 1, width: 1},
                // height: 100,
                width: "85%",
                flex: 1,
                marginBottom: 10,
                paddingHorizontal: 40,
                paddingVertical: 10,
                alignSelf: "flex-end"
              }}>
                {this.renderStationOptions(1)}
                {this.renderStationOptions(2)}
                {this.renderStationOptions(3)}
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
                onPress={() => this.props.navigation.pop()}
                disabled={!this.state.serviceStationSelected}
                style={{
                  backgroundColor: this.state.serviceStationSelected ? '#142F6A' : "#AFAFAF",
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
        {/* {this.state.showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={(event, date)=>{this.onDatePick(date!)}}
        />
      )} */}
      </View>
    );
  }
}

NewService.contextType = ThemeContext;

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
    justifyContent: "center",
    marginTop: 5
  }
});