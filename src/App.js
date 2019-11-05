import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import ReactGA from 'react-ga';
import { TrackingID } from './APIKeys';
import './App.css';

ReactGA.initialize(TrackingID);
class App extends Component {
  render() {

    return (
      <div>
          <MapContainer />
      </div>

    );
  }
}

export default App;
