import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import Map from '../../components/map';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import LanguageSelector from '../../translations';
import Marker from '../../assets/svg/service-station-marker';
import Phone from '../../assets/svg/phone';
import Route from '../../assets/svg/route';
import Geolocation from '@react-native-community/geolocation';
import {showLocation} from 'react-native-map-link';
import {getNearByServices} from '../../service/redux/saga/service';
import Toast from 'react-native-simple-toast';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../../navigation/menu';

type MoreMenuNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'Language'
>;

interface Props {
  nearbyServices?: TStore['nearbyServices'];
  navigation: MoreMenuNavigationProp;
  route: RouteProp<MenuStackParamList, 'ServiceStation'>;
}

type State = {
  locationFetchedStatus: 'SUCCESS' | 'FAILURE' | 'PENDING';
  loading: boolean;
  latitude: number;
  longitude: number;
};

function Tile(props: {
  distance: number;
  address: string;
  status: string;
  onDial: () => void;
  onRoute: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
      }}>
      <Marker height={54} width={40} />
      <View style={{marginLeft: 24, flex: 1}}>
        <Text style={{fontSize: 22, marginVertical: 2}} numberOfLines={1}>
          {Number(props.distance).toFixed(2)}Km
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'rgba(0,0,0,0.8)',
            marginVertical: 2,
          }}
          numberOfLines={1}>
          {props.address}
        </Text>
        <Text
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontSize: 14,
            marginVertical: 2,
          }}
          numberOfLines={1}>
          {props.status}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onDial}>
        <Phone height={64} width={48} style={{marginLeft: 12}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onRoute}>
        <Route height={54} width={40} style={{marginLeft: 12}} />
      </TouchableOpacity>
    </View>
  );
}

class Nearby extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      locationFetchedStatus: 'PENDING',
      latitude: 0,
      longitude: 0,
      loading: true,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (location) => {
        getNearByServices({
          type: 'ReadNearByService',
          payload: {
            distance: 20,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // latitude: 12.8923272,
            // longitude: 77.5963663,
          },
        }).then((response) => {
          this.setState({
            locationFetchedStatus: 'SUCCESS',
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // latitude: 12.8923272,
            // longitude: 77.5963663,
            loading: false,
          });
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

  dialCall = (phone: string) => {
    let phoneNumber = '';

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
    showLocation({
      latitude: lat,
      longitude: lon,
      alwaysIncludeGoogle: true,
      sourceLatitude: this.state.latitude,
      sourceLongitude: this.state.longitude,
    }).then(
      () => {},
      (reason) => {},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Nearby Service Stations'}
          hasBackButton
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.replace('MenuScreen', {})}
        />
        <View style={styles.mapView}>
          {this.state.loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              {!this.state.loading &&
              this.state.locationFetchedStatus === 'PENDING' ? (
                <Text>Loading...</Text>
              ) : null}
              {!this.state.loading &&
              this.state.locationFetchedStatus === 'FAILURE' ? (
                <Text>Location permission denied</Text>
              ) : null}
            </View>
          ) : (
            <Map
              followsUserLocation
              showsMyLocationButton
              showsUserLocation
              location={
                this.props.nearbyServices?.map((station) => ({
                  latitude: station.lat,
                  longitude: station.lon,
                })) || []
              }
            />
          )}
        </View>
        {!this.state.loading && (
          <View style={styles.footerView}>
            <ScrollView>
              {this.props.nearbyServices?.map((station) => {
                return (
                  <Tile
                    address={`${station.stationName}, ${station.addressLine1}, ${station.addressLine2}, ${station.addressLine3}`}
                    distance={station.dist}
                    status={station.status}
                    onDial={() => this.dialCall(station.phoneNo)}
                    onRoute={() => this.openMap(station.lat, station.lon)}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

export default connect((store: TStore) => {
  return {
    nearbyServices: store['nearbyServices'],
  };
})(Nearby);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  mapView: {
    flex: 1,
  },
  footerView: {
    maxHeight: moderateScale(300),
    padding: moderateScale(10),
    backgroundColor: '#F6F6F6',
  },
});
