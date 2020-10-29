import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';
import { TMapMarkers } from '../../connectm-client/redux/models'
import { ReduxMapAction, ReduxMapState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/map"
import BackArrowButton from '../../assets/png/back-arrow-button.png'
import { connect } from 'react-redux'
import { Divider } from 'antd';
import './index.scss'
import { Link } from 'react-router-dom';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAWO4UI7QPRc__8NUnNwNgicm2K4cdkCuY';

interface MapProps extends ReduxMapAction, ReduxMapState {
  center: string,
  zoom: number
}

interface MapState {
  mapMarkers: TMapMarkers[],
  dataLoaded: boolean,
  customerId: string
}

const defaultProps = {
  center: { lat: 22, lng: 77 },
  zoom: 12
}
class SimpleMap extends React.PureComponent<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props)
    this.state = {
      mapMarkers: [],
      dataLoaded: false,
      customerId: "CUS123456"
    }
  }

  getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
    };
  };

  static getDerivedStateFromProps(props: MapProps, state: MapState) {
    if (state.dataLoaded !== true) {
      props.getMapMarkers({
        type: "GET_MAP_MARKERS",
        payload: {
          customerId: state.customerId
        }
      })
      console.log("component googlemap state", props.mapMarkers);
      state.mapMarkers = props.mapMarkers
      // state.dataLoaded=props.mapMarkers.length?false:true
      console.log("component googlemap state");
      state.dataLoaded = true
    }
    state.mapMarkers = props.mapMarkers
    return state
  }

  onRefresh = () => {
    this.setState({
      dataLoaded: false,
      mapMarkers: []
    })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className='container-quicksight'>
        <div className="dashboard-header">
          <div className="dashboard-text">
            <Link to={"/mis"} className="link" >
              <img src={BackArrowButton} alt="back-arrow" className={"back-arrow-button"} />
            </Link>
            {"DASHBOARDS"}
          </div>
          <div className="refresh-button" onClick={this.onRefresh}>
            {"REFRESH"}
          </div>
        </div>
        <Divider style={{ background: "grey", margin: "10px 0" }} />
        {this.state.dataLoaded && <div className="google-map-container">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en'
            }}
            defaultCenter={defaultProps.center}
            center={defaultProps.center}
            options={this.getMapOptions}
            yesIWantToUseGoogleMapApiInternals={true}
            defaultZoom={5}
          >
            {this.state.mapMarkers.map((element: TMapMarkers) => {
              return <Marker
                lat={element.lat}
                lng={element.lng}
                frameId={element.frameId}
                name="CUS123456"
                color="red"
              />
            })}
          </GoogleMapReact>
        </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);