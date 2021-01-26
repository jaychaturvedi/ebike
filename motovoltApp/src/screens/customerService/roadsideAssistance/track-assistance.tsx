import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
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
import ReportAnIssueIcon from '../../../assets/svg/report_an_issue';
import { AirbnbRating, Rating } from 'react-native-ratings'

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'TrackAssistance'
>;

interface ReduxState {
  ride: TStore['ride'];
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
          {this.props.ride.path.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text>
                {this.props.ride.isStale
                  ? LanguageSelector.t('gps.loading')
                  : LanguageSelector.t('gps.noDataAvailable')}
              </Text>
            </View>
          ) : (
              <Map
                initialLocation={{
                  latitude: this.props.ride.path.length
                    ? this.props.ride.path[0].lat
                    : 0,
                  longitude: this.props.ride.path.length
                    ? this.props.ride.path[0].long
                    : 0,
                }}
                markerLocations={
                  this.props.ride.path
                    .map((point, index, points) => {
                      if (index === 0) {
                        return {
                          latitude: point.lat,
                          longitude: point.long,
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
                          longitude: point.long,
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
                pathLocations={this.props.ride.path.map((point) => {
                  return {
                    latitude: point.lat,
                    longitude: point.long,
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
            // height: 100,
            flex: 1,
            marginBottom: 5,
            paddingHorizontal: 40,
            paddingVertical: 20,
          }}>
            <View style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
            }}>
              <View style={{ flex: 1, alignItems: "flex-start", marginTop: 5 }}>
                <Image
                  source={require('../../../assets/icons/rsa_service_icon.png')}
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
                    {"Mr. Sundar M"}
                  </Text>
                  <Text style={{ color: "black", fontSize: 14 }} numberOfLines={1}>
                    {"MotoVolt Approved RSA Engineer "}
                  </Text>
                  <Text style={{ color: "grey" }}>
                    {"Expected arrival: 14 m"}
                  </Text>
                  <AirbnbRating
                    count={5}
                    defaultRating={3.9}
                    size={moderateScale(20)}
                    showRating={false}
                    isDisabled={true}
                    starStyle={{}}
                    onFinishRating={() => { }}
                  />
                </View>
              </View>
              <View style={{ ...styles.icons, justifyContent: "space-between" }}>
                <Image
                  source={require('../../../assets/icons/cellphone_icon.png')}
                />
                <Text
                  onPress={() => this.props.navigation.goBack()}
                  style={{ color: "#5372FF" }}>
                  {"cancel"}
                </Text>
              </View>
            </View>
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
      ride: store['ride'],
    };
  },
)(TrackAssistance);

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

