import React from 'react';
import {
  View,
  Image,
  Dimensions,
  TextInput,
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
import {Icon, Text, Button, DatePicker} from 'native-base';
import {scale} from '../../../styles/size-matters';
import AddReport from '../../../assets/svg/add-report';
import ActiveIssueIcon from '../../../assets/svg/active-issue';
import PastServiceIcon from '../../../assets/svg/past-service';
import DateIcon from '../../../assets/svg/date';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';

import GestureRecognizer from 'react-native-swipe-gestures';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

type State = {
  showDatePicker: boolean;
  date: string;
};

export default class NewService extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showDatePicker: false,
      date: '',
    };
  }

  onDatePick = (date: Date) => {
    this.setState({
      date: Moment(date).format('MM-DD-YYYY'),
    });
  };

  onDatePickerClose = () => {};

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
          // onBackClick={() => this.props.navigation.goBack()}
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
                this.setState({showDatePicker: true});
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
                <Text>Choose date</Text>
                <DateIcon />
              </View>
            </TouchableOpacity>
            <View style={{borderWidth: 0.5, opacity: 0.1}}></View>
            <View style={{width: '100%', height: 80}}></View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 39,
            }}>
            <Button
              onPress={() => {}}
              style={{
                backgroundColor: '#142F6A',
                // backgroundColor: '#AFAFAF',
                width: 246,
                height: 57,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: '600'}}>Confirm</Text>
            </Button>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={this.state.showDatePicker}
          mode="date"
          date={new Date(this.state.date || new Date())}
          onConfirm={this.onDatePick}
          onCancel={this.onDatePickerClose}
        />
      </View>
    );
  }
}

NewService.contextType = ThemeContext;
