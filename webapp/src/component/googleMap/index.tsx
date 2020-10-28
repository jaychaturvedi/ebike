import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = (props:any) => <div style={{background:"red", height:"200px",width:200}}>{props.text}</div>;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAWO4UI7QPRc__8NUnNwNgicm2K4cdkCuY';

interface Props {
  center: string,
  zoom: number
}

type State = {
  role: string
}


const defaultProps = {
  center: {lat: 22, lng: 77}, 
  zoom: 12
}
class SimpleMap extends React.PureComponent<Props, State> {

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className='container-quicksight'>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_MAPS_APIKEY ,
            language: 'en'
          }}
          defaultCenter={defaultProps.center}
          center={defaultProps.center}
          yesIWantToUseGoogleMapApiInternals={true}
          defaultZoom={6}
        >
          <AnyReactComponent
            lat={20}
            lng={77}
            text="My Marker"
          />
           <AnyReactComponent
            lat={10}
            lng={50}
            text="My Marker"
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;