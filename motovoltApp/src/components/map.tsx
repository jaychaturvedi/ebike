import {View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyAWO4UI7QPRc__8NUnNwNgicm2K4cdkCuY';

type location = {
  latitude: number;
  longitude: number;
  marker?: any;
};

type Props = {
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  followsUserLocation?: boolean;
  initialLocation: location;
  markerLocations: location[];
  pathLocations: location[];
};

type State = {};

export default class Map extends React.PureComponent<Props, State> {
  mapView: MapView | null;
  constructor(props: Props) {
    super(props);
    this.mapView = null;
  }

  render() {
    return (
      <MapView
        key={Math.random().toString()}
        zoomTapEnabled
        zoomControlEnabled
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={this.props.showsMyLocationButton}
        showsUserLocation={this.props.showsUserLocation}
        initialRegion={{
          latitude: this.props.initialLocation.latitude,
          longitude: this.props.initialLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        followsUserLocation={this.props.followsUserLocation}
        onMapReady={() => {
          this.mapView?.fitToCoordinates(
            this.props.markerLocations.map(
              (loc) => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
              }),
              {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              },
            ),
          );
        }}
        ref={(c) => {
          this.mapView = c;
        }}>
        {this.props.markerLocations.map((coordinate, index) => {
          if (coordinate.marker)
            return (
              <Marker
                key={Math.random().toString()}
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
                // image={require('../assets/icons/location_pin.png')}
                children={coordinate.marker}
              />
            );
          // if (index === 0) {
          //   return (
          //     <Marker
          //       coordinate={coordinate}
          //       key={Math.random().toString()}
          //       children={
          //         <View
          //           style={{
          //             width: 16,
          //             height: 16,
          //             borderRadius: 8,
          //             borderColor: 'black',
          //             backgroundColor: 'white',
          //             borderWidth: 4,
          //           }}
          //         />
          //       }
          //     />
          //   );
          // }
        })}
        {this.props.pathLocations.length >= 2 && (
          <MapViewDirections
            origin={this.props.pathLocations[0]}
            waypoints={
              this.props.pathLocations.length > 2
                ? this.props.pathLocations.slice(1, -1)
                : []
            }
            // waypoints={this.props.location.slice(1, -1)}
            destination={
              this.props.pathLocations[this.props.pathLocations.length - 1]
            }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            splitWaypoints
            // optimizeWaypoints={true}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              this.mapView!.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}
