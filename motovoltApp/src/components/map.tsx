import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyAWO4UI7QPRc__8NUnNwNgicm2K4cdkCuY';

type location = {
    latitude: number,
    longitude: number
}

type Props = {
    location: location[]
}

type State = {}

export default class Map extends React.PureComponent<Props, State> {
    mapView: any;
    constructor(props: Props) {
        super(props);
        this.mapView = null;
    }

    render() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                style={StyleSheet.absoluteFill}
                ref={c => this.mapView = c}
            >
                {this.props.location.map((coordinate, index) =>
                    <Marker key={`coordinate_${index}`} coordinate={coordinate} image={require('../assets/images/location_pin.png')} />
                )}
                {(this.props.location.length >= 2) && (
                    <MapViewDirections
                        origin={this.props.location[0]}
                        waypoints={(this.props.location.length > 2) ? this.props.location.slice(1, -1) : []}
                        destination={this.props.location[this.props.location.length - 1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)

                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 20),
                                    bottom: (height / 20),
                                    left: (width / 20),
                                    top: (height / 20),
                                }
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