import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';
import { TMapMarkers } from '../../connectm-client/redux/models'
import { ReduxMapAction, ReduxMapState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/map"
import BackArrowButton from '../../assets/png/back-arrow-button.png'
import { connect } from 'react-redux'
import { Divider, Dropdown, Menu, Typography } from 'antd';
import './index.scss'
import { Link } from 'react-router-dom';
import { ReactComponent as RefreshIcon } from "../../assets/Refresh.svg"
import LocationIcon from "../../assets/png/locationIcon.png"
import PersonIcon from "../../assets/png/personIcon.png"
import MenuIcon from "../../assets/png/menuIcon.png"
import BuildingIcon from "../../assets/png/buildingIcon.png"
import { DownOutlined } from '@ant-design/icons';



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
      disableDefaultUI: false,
      mapTypeControl: true,
      streetViewControl: false,
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
    const vehicle = (
      <Menu >
        <Menu.Item key="Zomato" >
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Zomato</Typography.Text>
        </Menu.Item>
        <Menu.Item key="Swiggy">
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Swiggy</Typography.Text>
        </Menu.Item>
      </Menu>
    );
    const location = (
      <Menu >
        <Menu.Item key="Bangalore" >
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Bangalore</Typography.Text>
        </Menu.Item>
        <Menu.Item key="Kolkata">
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Kolkata</Typography.Text>
        </Menu.Item>
        <Menu.Item key="Hyderabad">
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Hyderabad</Typography.Text>
        </Menu.Item>
      </Menu>
    );

    const person = (
      <Menu >
        <Menu.Item key="All" >
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>All</Typography.Text>
        </Menu.Item>
        <Menu.Item key="Me">
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Me</Typography.Text>
        </Menu.Item>
      </Menu>
    );
    const element = { lat: 22, lng: 77, frameId: "44774", timeStamp: "11-01-20" }
    return (
      // Important! Always set the container height explicitly
      <div className='container-quicksight'>
        <div className="dashboard-header">
          <div className="dashboard-text">
            <Link to={"/mis"} className="link" >
              <img src={BackArrowButton} alt="back-arrow" className={"back-arrow-button"} />
            </Link>
            {"Map View"}
          </div>
        </div>
        <div className="dashboard-subheader">
          <div className="filters">
            <div className="icon-pair">
              <img src={LocationIcon} alt="" />
              <img src={MenuIcon} alt="" />
            </div>
            <div className="icon-pair">
              <img src={PersonIcon} alt="" />
              <img src={BuildingIcon} alt="" />
            </div>
            <Dropdown overlay={vehicle} trigger={['click']}>
              <div className="map-filter-dropdown" onClick={e => e.preventDefault()}>
                Zomato <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown overlay={location} trigger={['click']}>
              <div className="map-filter-dropdown" onClick={e => e.preventDefault()}>
                Bangalore <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown overlay={person} trigger={['click']}>
              <div className="map-filter-dropdown" onClick={e => e.preventDefault()}>
                All <DownOutlined />
              </div>
            </Dropdown>
          </div>
          <div className="refresh-button" onClick={this.onRefresh}>
            <RefreshIcon width="24" height="24" />
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
            // options={this.getMapOptions}
            yesIWantToUseGoogleMapApiInternals={true}
            defaultZoom={5}
          >
            {this.state.mapMarkers.map((element: TMapMarkers) => {
              return (
                <Marker
                  lat={element.lat}
                  lng={element.lng}
                  frameId={element.frameId}
                  lastActive={element.timestamp}
                  color="#3D487D"
                />
              )
            })}
          </GoogleMapReact>
        </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);