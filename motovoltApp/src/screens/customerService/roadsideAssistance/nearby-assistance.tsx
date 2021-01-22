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

type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'NearByAssistance'
>;

interface ReduxState {
  ride: TStore['ride'];
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
                      if (index % 5 === 0) {
                        return {
                          latitude: point.lat,
                          longitude: point.long,
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
            <View style={{
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
                    {"Sogo Mobility"}
                  </Text>
                  <Text style={{ color: "black" }}>
                    {"Brigade cross road, Ashok nagar"}
                  </Text>
                  <Text style={{ color: "grey" }}>
                    {"closed"}
                  </Text>
                </View>
              </View>
              <View style={styles.icons}>
                <Image
                  source={require('../../../assets/icons/cellphone_icon.png')}
                />
              </View>
              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate("TrackAssistance", {}) }}>
                  <Image
                    source={require('../../../assets/icons/right_arrow_direction.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
      ride: store['ride'],
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

