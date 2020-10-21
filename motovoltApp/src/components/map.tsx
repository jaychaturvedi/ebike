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
};

type Props = {
  location: location[];
};

type State = {};

export default class Map extends React.PureComponent<Props, State> {
  mapView: any;
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
        initialRegion={{
          latitude: this.props.location.length
            ? this.props.location[0].latitude
            : 0,
          longitude: this.props.location.length
            ? this.props.location[0].longitude
            : 0,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={(c) => {
          this.mapView = c;
        }}>
        {this.props.location.map((coordinate, index) => {
          if (index === 0 || index === this.props.location.length - 1)
            return (
              <Marker
                key={Math.random().toString()}
                coordinate={coordinate}
                image={require('../assets/icons/location_pin.png')}
              />
            );
        })}
        {this.props.location.length >= 2 && (
          <MapViewDirections
            origin={this.props.location[0]}
            waypoints={
              this.props.location.length > 2
                ? this.props.location.slice(1, -1)
                : []
            }
            // waypoints={this.props.location.slice(1, -1)}
            destination={this.props.location[this.props.location.length - 1]}
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

              this.mapView.fitToCoordinates(result.coordinates, {
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
