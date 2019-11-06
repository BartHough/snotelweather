import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import ReactGA from 'react-ga';
import './App.css';

ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
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
