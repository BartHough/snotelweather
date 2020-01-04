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
  infoWindow: {
    width: '50px',
    height: '50px'
  }
}


export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latlng: {
        lat: 41,
        lng: -108.3
      },
      stationLoaction: {
        lat: '',
        lng: ''
      },
      isVisible: false,
      loading: false,
      days: '',
      stationName: '',
      distance: '',
      elevation: '',
      triplet: '',
      wind: '',
      sortedWind: {
        sortedDir: [],
        sortedSpeed: []
      },
      tobsLabels: [],
      tobsData: [],
      precLabels: [],
      precData: [],
      snwdLabels: [],
      snwdData: [],
      wteqLabels: [],
      wteqData: [],
      wspdxLabels: [],
      wspdxData: [],
      wdirLabels: [],
      wdirData: []
    }
    this.handleChange = this.handleChange.bind(this)

  }
  topRef = React.createRef();

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  async componentDidMount() {
    this.viewTop();
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
    const triplet = data[0]['station_information']['triplet'];
    const wind = data[0]['station_information']['wind'];
    const stationLat = data[0]['station_information']['location']['lat'];
    const stationLng = data[0]['station_information']['location']['lng'];
    const apiUrl = apiGatewayUrl + '?snotel=' + triplet + '&days=' + this.state.days;
    this.callApiGateway(apiUrl);
    const isVisible = true;
    const loading = false;
    this.setState({
      ...this.state,
      stationLoaction: {
        lat: stationLat,
        lng: stationLng
      },
      stationName,
      distance,
      elevation,
      triplet,
      wind,
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
    // # WSPDX = WIND SPEED MAXIMUM
    // # WDIRV = WIND DIRECTION AVERAGE
    fetch(apiUrl)
      .then(res => res.json())
      .then(apiData => {
        const tobsLabels = apiData[0][0];
        const tobsData = apiData[0][1];
        const precLabels = apiData[1][0];
        const precData = apiData[1][1];
        const snwdLabels = apiData[2][0];
        const snwdData = apiData[2][1];
        const wteqLabels = apiData[3][0];
        const wteqData = apiData[3][1];
        const wspdxLabels = apiData[4][0];
        const wspdxData = apiData[4][1];
        const wdirLabels = apiData[5][0];
        const wdirData = apiData[5][1];
        let unprocessedData = [];
        wspdxData.forEach((speed, index) => {
          unprocessedData.push([wdirData[index], speed]);
        })
        unprocessedData.sort((a, b) => (a[0] > b[0]) ? 1 : -1);
        let sortedSpeed = []
        let sortedDir = []
        unprocessedData.forEach(pair => {
          sortedDir.push(pair[0])
        });
        const tempSet = new Set(sortedDir);
        sortedDir = [...tempSet]
        let i = 0;
        sortedDir.forEach(dir => {
          let max = -1;
          while (unprocessedData[i][0] === dir) {
            if (unprocessedData[i][1] > max) {
              max = unprocessedData[i][1];
            }
            i++;
            if (i === unprocessedData.length) {
              break;
            }
          }
          sortedSpeed.push(max);
        });
        this.setState({
          ...this.state,
          sortedWind: {
            sortedDir,
            sortedSpeed
          },
          tobsLabels,
          tobsData,
          precLabels,
          precData,
          snwdLabels,
          snwdData,
          wteqLabels,
          wteqData,
          wspdxLabels,
          wspdxData,
          wdirLabels,
          wdirData
        });
      });
  }

  addMarker(location, map) {
    this.setState({ ...this.state, latlng: { lat: location.lat(), lng: location.lng() } });
    map.panTo(location);
  }

  viewTop = () => {
    this.topRef.current.scrollIntoView({ behavior: 'smooth' });
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
              triplet={this.state.triplet}
              tobsLabels={this.state.tobsLabels}
              tobsData={this.state.tobsData}
              precLabels={this.state.precLabels}
              precData={this.state.precData}
              snwdLabels={this.state.snwdLabels}
              snwdData={this.state.snwdData}
              wteqLabels={this.state.wteqLabels}
              wteqData={this.state.wteqData}
              wspdxLabels={this.state.wspdxLabels}
              wspdxData={this.state.wspdxData}
              wdirLabels={this.state.wdirLabels}
              wdirData={this.state.wdirData}
              sortedDir={this.state.sortedWind.sortedDir}
              sortedSpeed={this.state.sortedWind.sortedSpeed}
              wind={this.state.wind}
              days={this.state.days}
            />}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
