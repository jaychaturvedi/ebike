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
  customerId: string,
  refreshing: boolean,
  location: string,
  zone: string
}
const defaultCity="Kolkata"
const defaultZone="All"
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
      customerId: "CUS123456",
      refreshing: false,
      zone: "All",
      location: "Kolkata"
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
          customerId: state.customerId,
          location: state.location,
          zone: state.zone
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
      mapMarkers: [],
      refreshing: true,
      location:defaultCity,
      zone:defaultZone
    })
    setTimeout(() => {
      this.setState({
        refreshing: false
      })
    }, 1500)
  }

  handleLocationClick = (e: any) => {
    console.log(e.key);
    this.setState({
      location: e.key,
      dataLoaded:false
    })
  }
  handleZoneClick= (e:any) =>{
    console.log(e.key);
    this.setState({
      zone:e.key,
      dataLoaded:false
    })
  }
  render() {
    const vehicle = (
      <Menu >
        <Menu.Item key="Zomato" >
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Zomato</Typography.Text>
        </Menu.Item>
      </Menu>
    );
    const location = (
      <Menu onClick={this.handleLocationClick} >
        <Menu.Item key="Kolkata">
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Kolkata</Typography.Text>
        </Menu.Item>
        <Menu.Item key="Bengaluru" >
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Bangalore</Typography.Text>
        </Menu.Item>
        <Menu.Item key="Hyderabad">
          <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>Hyderabad</Typography.Text>
        </Menu.Item>
      </Menu>
    );
    const zones=["All","North","South","East", "West", "Centre"]
    const zone = (
      <Menu onClick={this.handleZoneClick}>
        {
          zones.map(Zone => {
            return <Menu.Item key={Zone} >
              <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>{Zone}</Typography.Text>
            </Menu.Item>
          })
        }
      </Menu>
    );
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
                {this.state.location} <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown overlay={zone} trigger={['click']}>
              <div className="map-filter-dropdown" onClick={e => e.preventDefault()}>
                {this.state.zone} <DownOutlined />
              </div>
            </Dropdown>
          </div>
          <div className="refresh-button" onClick={this.onRefresh}>
            <RefreshIcon width="24" height="24" className={this.state.refreshing ? "refresh-start" : "refresh-end"} />
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
                  isActive={element.isActive}
                  lastActive={element.timestamp}
                  color={element.isActive ? "#3D487D" : "#41A3C9"}
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