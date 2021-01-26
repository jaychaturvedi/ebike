import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Header from '../../home/components/header/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CustomerServiceStackParamList } from '../../../navigation/customer-service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TStore } from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SignOut } from '../../../service/redux/actions/saga/authentication-actions';
import LanguageSelector from '../../../translations';
import { ThemeContext } from '../../../styles/theme/theme-context';
import ReportAnIssueIcon from '../../../assets/svg/report_an_issue';
import RequestServiceIcon from "../../../assets/svg/service_stations";
import RoadsideAssistanceIcon from "../../../assets/svg/roadside_assistance";
import { Icon } from 'native-base';
import Colors from '../../../styles/colors';
import {
  UIActivityIndicator,
} from 'react-native-indicators';

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'RoadAssistnceLanding'
>;

interface ReduxState {
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'RoadAssistnceLanding'>;
}

type State = {
  showSearch: boolean
};

class RoadAssistnceLanding extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSearch: false
    };
  }

  renderLoader = () => {
    return (
      <View style={styles.body}>
        <RoadsideAssistanceIcon style={{ 
          // marginVertical: 10
         }} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            textAlign: "center",
            width: 200,
            marginVertical: 20
          }}
          numberOfLines={3}>
          {"Looking up for the nearest  Roadside Assistantance Personnel."}
        </Text>
        <UIActivityIndicator
          color='black'
          hidesWhenStopped
          animating={!this.state.showSearch}
          size={40} />
        <Text
          style={{
            fontSize: 16, 
            textAlign: "center",
            color: "#5372FF",
            marginTop: 10
          }}
          onPress={() => this.props.navigation.goBack()}
          numberOfLines={1}>
          {"Cancel"}
        </Text>
      </View>
    )
  }
  renderSearch = () => {
    return (
      <View style={styles.body}>
        <Icon
          type="FontAwesome"
          name="exclamation-circle"
          style={{
            color: '#FF1F00', 
            fontSize: 40, 
            // marginVertical: 10
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            textAlign: "center",
            width: 200,
            marginVertical: 20
          }}
          numberOfLines={3}>
          {"Roadside assistance personnel unavailable."}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#5372FF",
            width: 200,
            // marginVertical: 10
          }}
          numberOfLines={2}>
          {"Would you like to find nearby service stations"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>this.props.navigation.navigate('NearByAssistance', {})}>
          <Text style={{
            ...styles.buttonText,
            color: "#FFFFFF"
          }}>
            {"Search"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({showSearch:true})
    }, 2000)
  }

  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        <Header
          hideNotification
          hasBackButton
          title="Roadside Assistance"
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        {!this.state.showSearch &&
          <View style={{
            padding: 20,
          }}>
            {this.renderLoader()}
          </View>}
        {this.state.showSearch &&
          <View style={{
            padding: 20,
          }}>
            {this.renderSearch()}
          </View>}
      </View>
    );
  }
}

RoadAssistnceLanding.contextType = ThemeContext; //import theme in class as this.context

export default RoadAssistnceLanding

const styles = StyleSheet.create({
  // container: {
  //   height: '100%',
  //   backgroundColor: '#282C52', //dark theme
  // },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#282C52',
    // padding: moderateScale(15),
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.NAVY_BLUE,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    marginTop: 20,
    // width: "50%",
    // margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  },
  features: {
    marginTop: moderateScale(15),
    flex: 1,
    width: '100%',
    paddingLeft: moderateScale(9),
    paddingRight: moderateScale(9),
  },
  body: {
    backgroundColor: 'white',
    // paddingLeft: moderateScale(20),
    // paddingRight: moderateScale(20),
    // // backgroundColor: '#F0F0F0',
    // width: '100%',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 1 },
    elevation: 3,
    height: moderateScale(300),
    padding:40,
    alignItems: 'center',
    marginTop: moderateScale(10),
  }
});

