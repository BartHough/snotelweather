import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import SnotelSite from './SnotelSite';
import Description from './Description';
import { GoogleApiKey } from '../APIKeys';
import '../styles/MapContainer.css'
const apiKey = GoogleApiKey

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
      days: '',
      stationName: '',
      distance: '',
      elevation: '',
      triplet: '',
      wind: '',
      stationLat: '',
      stationLng: '',
      snowDepth: [],
      swe: [],
      temp: [],
      dates: []
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
    event.preventDefault();
    const proxy = 'https://floating-fjord-45481.herokuapp.com/'
    const query = `http://api.powderlin.es/closest_stations?lat=${encodeURIComponent(this.state.latlng.lat)}&lng=${encodeURIComponent(this.state.latlng.lng)}&data=true&days=${encodeURIComponent(this.state.days)}&count=1`;
    console.log('calling http for url: ' + query);
    fetch(proxy + query)
      .then(res => res.json())
      .then(data => {
        // this.setState({ ...this.state, items: item })
        console.log(data)
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
    let snowDepth = []
    let swe = []
    let temp = []
    let dates = []
    data[0]['data'].forEach(day => {
      snowDepth.push(day['Snow Depth (in)']);
      swe.push(day['Snow Water Equivalent (in)']);
      temp.push(day['Observed Air Temperature (degrees farenheit)']);
      dates.push(day['Date']);
    })
    const isVisible = true;
    this.setState({
      ...this.state,
      stationName,
      distance,
      elevation,
      triplet,
      wind,
      stationLat,
      stationLng,
      snowDepth,
      swe,
      temp,
      dates,
      isVisible
    })
  }
  addMarker(location, map) {
    this.setState({ ...this.state, latlng: { lat: location.lat(), lng: location.lng() } })
    map.panTo(location);
  };


  render() {
    return (
      <div>
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
          {this.state.isVisible && 
          <SnotelSite
            stationName={this.state.stationName}
            distance={this.state.distance}
            dates={this.state.dates}
            snowDepth={this.state.snowDepth}
            swe={this.state.swe}
            temp={this.state.temp}
          />}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
