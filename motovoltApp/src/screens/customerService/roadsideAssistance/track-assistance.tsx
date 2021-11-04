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
import { TStore } from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Map from '../../../components/map';
import LanguageSelector from '../../../translations';
import { ThemeContext } from '../../../styles/theme/theme-context';
import CellphoneIcon from '../../../assets/svg/cellphone-icon';
import { AirbnbRating, Rating } from 'react-native-ratings'
import { Button } from 'native-base';

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'TrackAssistance'
>;

interface ReduxState {
  roadSideAssistance: TStore['roadSideAssistance'];
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'TrackAssistance'>;
}

type State = {
  showSearch: boolean
};

class TrackAssistance extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showSearch: false
    };
  }

  openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${091123456789}';
    } else {
      number = 'tel:${091123456789}';
    }
    Linking.openURL(number);
  };

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
        <View style={styles.map}>
          {this.props.roadSideAssistance.rsa.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text
              numberOfLines={3}
              style={{
                textAlign:"center"
              }}>
                {this.props.roadSideAssistance.isStale
                  ? LanguageSelector.t('gps.loading')
                  : `Sorry! We are unable to find assistance at your location for the moment Please contact our customer care for further help.`}
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
                      if (index === 0) {
                        return {
                          latitude: point.lat,
                          longitude: point.lon,
                          marker: (
                            <View
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                borderColor: 'rgba(83, 114, 255, 0.4)',
                                backgroundColor: '#5372FF',
                                borderWidth: 4,
                              }}
                            />
                          ),
                        };
                      }
                      if (index === points.length - 1) {
                        return {
                          latitude: point.lat,
                          longitude: point.lon,
                          marker: (
                            <View>
                              <Image
                                source={require('../../../assets/icons/cycle-rider.png')}
                              />
                            </View>
                          ),
                        };
                      }
                    })
                    .filter((point) => point!) as any
                }
                pathLocations={this.props.roadSideAssistance.rsa.map((point) => {
                  return {
                    latitude: point.lat,
                    longitude: point.lon,
                  };
                })}
                strokeColor="black"
              />
            )}
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{
            backgroundColor: "white",
            elevation: 3,
            shadowOpacity: 0.25,
            shadowRadius: 1,
            shadowColor: 'black',
            shadowOffset: {height: 1, width: 1},
            flex: 1,
            marginBottom: 5,
            paddingHorizontal: 40,
            paddingVertical: 20,
          }}>

            {this.props.roadSideAssistance.rsa.map((item)=>{
              return <View style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
              }}>
                <View style={{ flex: 1, alignItems: "flex-start", marginTop: 5 }}>
                  <Image
                    source={require('../../../assets/icons/rsa_service_icon.png')}
                  />
                </View>
                <View style={styles.textarea}>
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
                    <Text
                      style={{
                        color: "black",
                        fontSize: 14,
                        opacity: 0.6
                      }}
                      numberOfLines={1}>
                      {item.engineer_name}
                    </Text>
                    <Text style={{
                      color: "black",
                      fontSize: 14 ,
                      marginTop: 8}}
                      numberOfLines={1}>
                      Status: {item.eng_status}
                    </Text>
                    <Text style={{ color: "grey" }}>
                      Expected arrival:{" "}{item.expected_arrival}
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.icons, justifyContent: "space-between" }}>
                  <TouchableOpacity
                      onPress={() => this.openDialScreen()}>
                      <CellphoneIcon />
                  </TouchableOpacity>
                  {/* <Text
                    onPress={() => this.props.navigation.goBack()}
                    style={{ color: "#5372FF" }}>
                    {"Cancel"}
                  </Text> */}
                  <Button
                    style={styles.cancelButton}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: "bold",
                      }}
                      onPress={() => this.props.navigation.goBack()}
                      numberOfLines={1}>
                      {'Cancel'}
                    </Text>
                  </Button>
                </View>
              </View>
            })}
            
          </View>
        </ScrollView>
      </View>
    );
  }
}

TrackAssistance.contextType = ThemeContext; //import theme in class as this.context


export default connect(
  (store: TStore): ReduxState => {
    return {
      roadSideAssistance: store['roadSideAssistance'],
    };
  },
  (dispatch: Dispatch) => {
    return {
    };
  },
)(TrackAssistance);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  textarea:{
    flex: 3,
    display: "flex",
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
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 5
  },
  cancelButton:{
    backgroundColor: "#31497C",
    marginTop: 10,
    // paddingHorizontal: 24,
    width: 80,
    borderRadius: 4,
    alignSelf: "flex-end",
    justifyContent: "center"
  }
});

