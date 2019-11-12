import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Loader from 'react-loader-spinner';
import SnotelSite from './SnotelSite';
import Description from './Description';
import '../styles/MapContainer.css'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
const proxyUrl = process.env.REACT_APP_SNOTEL_PROXY
const apiGatewayUrl = process.env.REACT_APP_SNOTEL_API

const style = {
  map: {
    width: '100%',
    height: '50%',
    display: 'inline-block',
    position: 'relative',
    top: '10px',
    margin: 'auto'
  },
}


export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latlng: {
        lat: 41,
        lng: -108.3
      },
      isVisible: false,
      loading: false,
      days: '',
      stationName: '',
      distance: '',
      elevation: '',
      triplet: '',
      wind: '',
      stationLat: '',
      stationLng: '',
      tobsLabels: [],
      tobsData: [],
      precLabels: [],
      precData: [],
      snwdLabels: [],
      snwdData: [],
      wteqLabels: [],
      wteqData: []
    }
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
    this.setState(prev => ({
      ...prev,
      latlng: {
        lat,
        lng
      },
      currentLocation: {
        lat,
        lng
      }
    }));
  }

  // Adapted from answer posted by github user Mostafasaffari: https://github.com/fullstackreact/google-maps-react/issues/192
  getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0
    };
  }
  callAPI = (event) => {
    this.setState({
      ...this.state,
      loading: true
    })
    event.preventDefault();
    const proxy = proxyUrl;
    const query = `http://api.powderlin.es/closest_stations?lat=${encodeURIComponent(this.state.latlng.lat)}&lng=${encodeURIComponent(this.state.latlng.lng)}&data=false&days=1&count=1`;
    fetch(proxy + query)
      .then(res => res.json())
      .then(data => {
        this.extractInformation(data);
      });
  }
  extractInformation(data) {
    const stationName = data[0]['station_information']['name'];
    const distance = Math.round(data[0]['distance']);
    const elevation = data[0]['station_information']['elevation'];
    const triplet = data[0]['station_information']['triplet']
    const wind = data[0]['station_information']['wind']
    const stationLat = data[0]['station_information']['location']['lat']
    const stationLng = data[0]['station_information']['location']['lng']
    const apiUrl = apiGatewayUrl + '?' + 'snotel=' + triplet + '&days=' + this.state.days
    console.log(apiUrl)
    this.callApiGateway(apiUrl);
    const isVisible = true;
    const loading = false;
    this.setState({
      ...this.state,
      stationName,
      distance,
      elevation,
      triplet,
      wind,
      stationLat,
      stationLng,
      isVisible,
      loading
    })
  }
  callApiGateway(apiUrl) {
    // data comes in this order:
    // # TOBS = AIR TEMPERATURE OBSERVED
    // # PREC = PRECIPITATION ACCUMULATION
    // # SNWD = SNOW DEPTH
    // # WTEQ = SNOW WATER EQUIVALENT
    fetch(apiUrl)
      .then(res => res.json())
      .then(apiData => {
        let tobsLabels = apiData[0][0]
        let tobsData = apiData[0][1]
        let precLabels = apiData[1][0]
        let precData = apiData[1][1]
        let snwdLabels = apiData[2][0]
        let snwdData = apiData[2][1]
        let wteqLabels = apiData[3][0]
        let wteqData = apiData[3][1]
        this.setState({
          ...this.state,
          tobsLabels,
          tobsData,
          precLabels,
          precData,
          snwdLabels,
          snwdData,
          wteqLabels,
          wteqData,
        })
      })
  }
  addMarker(location, map) {
    this.setState({ ...this.state, latlng: { lat: location.lat(), lng: location.lng() } })
    map.panTo(location);
  };

  topRef = React.createRef()

  componentDidMount() {
    this.viewTop()
  }
  viewTop = () => {
    this.topRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  render() {
    return (
      <div ref={this.topRef}>
        <Description />
        <Map
          google={this.props.google}
          style={style.map}
          initialCenter={this.state.latlng}
          center={this.state.latlng}
          zoom={4}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}
        >
          <Marker position={this.state.latlng} />
          <form className='form' onSubmit={this.callAPI}>
            <br></br>
            <label>Days To View:</label>
            <br></br>
            <input
              placeholder='Days'
              name='days'
              type='number'
              value={this.state.days}
              onChange={this.handleChange}
              required
            />
            <br></br>
            <input className='submit' value='Submit' type='submit' />
            <br></br>
          </form>
          <div className='loader'>
            {
              this.state.loading &&
              !this.state.isVisible &&
              <Loader
                type='Circles'
                color='#4bc0c0'
                height={80}
                width={80}
              />
            }
          </div>
          {this.state.isVisible &&
            <SnotelSite
              stationName={this.state.stationName}
              distance={this.state.distance}
              tobsLabels={this.state.tobsLabels}
              tobsData={this.state.tobsData}
              precLabels={this.state.precLabels}
              precData={this.state.precData}
              snwdLabels={this.state.snwdLabels}
              snwdData={this.state.snwdData}
              wteqLabels={this.state.wteqLabels}
              wteqData={this.state.wteqData}
            />}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
