import React from 'react';
import { TMapMarkers } from '../../connectm-client/redux/models'
import { ReduxMapAction, ReduxMapState, mapDispatchToProps, mapStateToProps } from "../../connectm-client/actions/map"
import BackArrowButton from '../../assets/png/back-arrow-button.png'
import { connect } from 'react-redux'
import { Dropdown, Menu, Typography } from 'antd';
import './index.scss'
import { Link } from 'react-router-dom';
import { ReactComponent as RefreshIcon } from "../../assets/Refresh.svg"
import LocationIcon from "../../assets/png/locationIcon.png"
import PersonIcon from "../../assets/png/personIcon.png"
import MenuIcon from "../../assets/png/menuIcon.png"
import BuildingIcon from "../../assets/png/buildingIcon.png"
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import GoogleMap from './map';

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
  zone: string,
  customer: string,
  customerFilters: any, //isArray
  locationFilters: any, //isArray
  regionFilters: any, //isArray,
  defaultCenter: {
    lat: number,
    lng: number
  },
  zoom: number,
  zoneSelected: boolean,
  zoneCoordinates: {
    lat: number,
    lon: number
  }
}
const defaultCity = "Kolkata"
const defaultZone = "All"
const defaultCustomer = "Zomato"
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
      customerId: "C10001",
      refreshing: false,
      zone: "All",
      location: "Kolkata",
      customer: "Zomato",
      customerFilters: [],
      locationFilters: [],
      regionFilters: [],
      defaultCenter: { lat: 22, lng: 77 },
      zoom: 5,
      zoneSelected: false,
      zoneCoordinates: {
        lat: 22, lon: 77
      }
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
      props.getMapViewFilters({
        type: "GET_MAPVIEW_DROPDOWN_FILTERS"
      })
      state.customerFilters = props.mapViewDropDownFilters.customer
      state.locationFilters = props.mapViewDropDownFilters.location
      state.regionFilters = props.mapViewDropDownFilters.region
      // state.mapMarkers = props.mapMarkers
      // state.dataLoaded=props.mapMarkers.length?false:true
      state.dataLoaded = true
    }
    state.mapMarkers = props.mapMarkers
    if (props.mapMarkers.length <= 0 && state.dataLoaded) {
      state.defaultCenter = { lat: 22, lng: 77 }
      state.zoom = 5
    }
    if (props.mapMarkers.length > 0 && state.dataLoaded) {
      const result = state.locationFilters?.filter((item: any) => item.locationName == state.location)[0]
      state.defaultCenter = {
        lat: result?.lat || 22,
        lng: result?.lon || 77
      }
      state.zoom = 7
    }
    if (props.mapMarkers.length > 0 && state.dataLoaded && state.zoneSelected) {
      state.defaultCenter = {
        lat: state.zoneCoordinates.lat,
        lng: state.zoneCoordinates.lon
      }
      state.zoom = 12
    }
    state.customerFilters = props.mapViewDropDownFilters.customer
    state.locationFilters = props.mapViewDropDownFilters.location
    state.regionFilters = props.mapViewDropDownFilters.region
    return state
  }

  onRefresh = () => {
    this.setState({
      dataLoaded: false,
      mapMarkers: [],
      refreshing: true,
      location: defaultCity,
      zone: defaultZone,
      zoneSelected: false,
      customer: defaultCustomer,
      customerId: "C10001",
      defaultCenter: { lat: 22, lng: 77 },
      zoom: 5
    })
    setTimeout(() => {
      this.setState({
        refreshing: false
      })
    }, 1500)
  }

  handleLocationClick = (e: any) => {
    const result = this.state.locationFilters?.filter((item: any) => item.locationName == e.key)[0]
    this.setState({
      location: e.key,
      dataLoaded: false,
      defaultCenter: {
        lat: result.lat,
        lng: result.lon
      },
      zoom: 7,
      zone: defaultZone,
      zoneSelected: false,
    })

  }
  handleZoneClick = async (e: any) => {

    const response = await axios.post(process.env.REACT_APP_WEBAPIURL + '/regionfilter',
      {
        "customerId": this.state.customerId,
        "location": this.state.location,
        "region": e.key
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log("get region", response.data);
    const { lat, lon } = response.data.body
    // if(this.props.mapMarkers.length > 0 && this.state.dataLoaded && lat && lon){
    this.setState({
      zone: e.key,
      dataLoaded: false,
      zoneSelected: true,
      zoneCoordinates: {
        lat: response.data.body.lat || 22,
        lon: response.data.body.lon || 77,
      }
    })
    // }
    // else this.setState({
    //   zone:e.key,
    //   dataLoaded:false,
    //   zoneSelected:false,
    //   zoneCoordinates:{
    //     lat:22,
    //     lon:77,
    //   }
    // })



  }
  handleCustomerClick = (e: any) => {
    const result = this.state.customerFilters.filter((item: any) => item.customerId == e.key)
    this.setState({
      customer: result[0]?.customerName,
      customerId: e.key,
      dataLoaded: false,
      zone: defaultZone,
      zoneSelected: false,
    })
  }
  render() {
    const customer = (
      <Menu onClick={this.handleCustomerClick}>
        {
          this.state.customerFilters?.map((item: any) => {
            return <Menu.Item key={item.customerId} >
              <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>{item.customerName}</Typography.Text>
            </Menu.Item>
          })
        }
      </Menu>
    );
    const location = (
      <Menu onClick={this.handleLocationClick} >
        {
          this.state.locationFilters?.map((item: any) => {
            return <Menu.Item key={item.locationName} >
              <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>{item.locationName}</Typography.Text>
            </Menu.Item>
          })
        }
      </Menu>
    );
    const zones = ["All", "North", "South", "East", "West", "Centre"]
    const zone = (
      <Menu onClick={this.handleZoneClick}>
        {
          this.state.regionFilters?.map((item: any) => {
            return <Menu.Item key={item.regionName} >
              <Typography.Text strong style={{ color: "#ffffff", marginLeft: "10%" }}>{item.regionName}</Typography.Text>
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
            <Dropdown overlay={customer} trigger={['click']}>
              <div className="map-filter-dropdown" onClick={e => e.preventDefault()}>
                {this.state.customer} <DownOutlined />
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
        {/* <Divider style={{ background: "grey", margin: "10px 0" }} /> */}
        {this.state.dataLoaded && <div className="google-map-container">
          {/* <GoogleMapReact
            bootstrapURLKeys={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en'
            }}
            // defaultCenter={this.state.defaultCenter}
            center={this.state.defaultCenter}
            // options={this.getMapOptions}
            yesIWantToUseGoogleMapApiInternals={true}
            // defaultZoom={this.state.zoom}
            zoom={this.state.zoom}
          >
            {this.state.mapMarkers.map((element: TMapMarkers) => {
              return (
                <Marker
                  lat={element.lat}
                  lng={element.lng}
                  frameId={element.frameId}
                  isActive={element.isActive}
                  lastActive={element.timestamp}
                  color={ element.isActive? "#41A3C9" : "#3D487D"}
                />
              )
            })}
          </GoogleMapReact> */}
          <GoogleMap
            center={this.state.defaultCenter}
            zoom={this.state.zoom}
            mapMarkers={this.state.mapMarkers}
          />
        </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);