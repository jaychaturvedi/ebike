import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Header from '../../home/components/header/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CustomerServiceStackParamList } from '../../../navigation/customer-service';
import { TRoadSideAssistance, TStore } from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Map from '../../../components/map';
import LanguageSelector from '../../../translations';
import { ThemeContext } from '../../../styles/theme/theme-context';
import ReportAnIssueIcon from '../../../assets/svg/report_an_issue';
import { getRoadSideAssitance } from 'src/service/redux/saga/roadside-assistance';
import { GetRoadSideAssitance } from 'src/service/redux/actions/saga';

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'NearByAssistance'
>;

interface ReduxState {
  roadSideAssistance: TStore['roadSideAssistance'];
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'NearByAssistance'>;
}

type State = {
  showSearch: boolean
};

class NearByAssistance extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSearch: false
    };
  }

  // openDialScreen = (phone:string) => {
  //   let number = '';
  //   if (Platform.OS === 'ios') {
  //     number = `telprompt:${phone}`;
  //   } else {
  //     number = `tel:${phone}`;
  //   }
  //   Linking.openURL(number);
  // };
  
  openDialScreen = (phone: string) => {
    let phoneNumber = '';
    console.log('Phone', phone);

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phone + '}';
    } else {
      phoneNumber = 'telprompt:${' + phone + '}';
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + phoneNumber);
        } else {
          return Linking.openURL(phoneNumber)
            .then((data) => console.error('then', data))
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => console.log('An error occurred', err));
  };

  openMap = (lat: number, lon: number) => {
    console.log('State', JSON.stringify(this.state), lat, lon);
    var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${lat},${lon}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
    // showLocation({
    //   latitude: lat,
    //   longitude: lon,
    //   alwaysIncludeGoogle: true,
    //   sourceLatitude: this.state.latitude,
    //   sourceLongitude: this.state.longitude,
    // }).then(
    //   () => {},
    //   (reason) => {},
    // );
  };

  render() {
    let Theme = this.context.theme; //load theme context
    console.warn(this.props.roadSideAssistance)
    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        <Header
          hideNotification
          hasBackButton
          title="Roadside Assistance"
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />

        <View style={styles.map}>
          {this.props.roadSideAssistance.rsa.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text>
                {this.props.roadSideAssistance.isStale
                  ? LanguageSelector.t('gps.loading')
                  : LanguageSelector.t('gps.noDataAvailable')}
              </Text>
            </View>
          ) : (
              <Map
                initialLocation={{
                  latitude: this.props.roadSideAssistance.rsa.length
                    ? this.props.roadSideAssistance.rsa[0].lat
                    : 0,
                  longitude: this.props.roadSideAssistance.rsa.length
                    ? this.props.roadSideAssistance.rsa[0].lon
                    : 0,
                }}
                markerLocations={
                  this.props.roadSideAssistance.rsa
                    .map((point, index, points) => {
                      if (index % 5 === 0) {
                        return {
                          latitude: point.lat,
                          longitude: point.lon,
                          marker: (
                            <View>
                              <Image
                                source={require('../../../assets/icons/service_location_pin.png')}
                              />
                            </View>
                          ),
                        };
                      }
                    })
                    .filter((point) => point!) as any
                }
                pathLocations={[]}
                strokeColor="black"
              />
            )}
        </View>
        <ScrollView style={{ flex: 1 }}>

            <View style={{
              backgroundColor: "white",
              elevation: 3,
              // height: 100,
              flex: 1,
              marginBottom: 5,
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}>
            {this.props.roadSideAssistance.rsa.map((item) => {
              return <View style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
              }}>
                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                  <Image
                    source={require('../../../assets/icons/service_location_pin.png')}
                  />
                </View>
                <View style={{
                  flex: 3,
                  display: "flex",

                }}>
                  <View style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    alignSelf: "flex-start"
                  }}>
                    <Text style={{
                      ...styles.address, color: "black"
                    }}>
                      {item.StationName}
                    </Text>
                    <Text style={{ color: "black" }}>
                      {item.addressLine1}
                      {item.addressLine2}
                    </Text>
                    <Text style={{ color: "grey" }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity
                    onPress={() => this.openDialScreen(item.phoneNo)}>
                    <Image
                      source={require('../../../assets/icons/cellphone_icon.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity
                    onPress={() => this.openMap(item.lat, item.lon)}>
                    <Image
                      source={require('../../../assets/icons/right_arrow_direction.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            })}
            </View>
        </ScrollView>
      </View>
    );
  }
}

NearByAssistance.contextType = ThemeContext; //import theme in class as this.context

export default connect(
  (store: TStore): ReduxState => {
    return {
      roadSideAssistance: store['roadSideAssistance'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      getRoadSideAssitance: (params: GetRoadSideAssitance) => dispatch(params),
    };
  },
)(NearByAssistance);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  map: {
    height: '60%',
    backgroundColor: 'white',
    borderRadius: moderateScale(15),
    // margin: moderateScale(15),
  },
  address: {
    fontSize: 18,
    fontWeight: "500",
    flexDirection: "column",
    display: "flex"
  },
  icons: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 5
  }
});

