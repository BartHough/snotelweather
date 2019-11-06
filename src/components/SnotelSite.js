import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/SnotelSite.css'

export class SnotelSite extends Component {
  constructor(props) {
    super(props);
    this.getHeight = this.getHeight.bind(this);
    this.getSwe = this.getSwe.bind(this);
    this.getTemp = this.getTemp.bind(this);

  }
  getHeight() {
    return {
      labels: this.props.dates,
      datasets: [
        {
          label: 'Snow Height (in)',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.snowDepth
        }
      ]
    };
  }
  getSwe() {
    return {
      labels: this.props.dates,
      datasets: [
        {
          label: 'Snow Water Equivalent (in)',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.swe
        }
      ]
    };
  }
  getTemp() {
    return {
      labels: this.props.dates,
      datasets: [
        {
          label: 'Observed Air Temp (F)',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.temp
        }
      ]
    };
  }
  render() {
    return (
      < div >
        <div className='textContainer'>
          <h4 className='textDisplay'>
            Snotel Site: {this.props.stationName}
          </h4>
          <h4 className='textDisplay'>
            Distance from Marker: {this.props.distance} miles
          </h4>
        </div>
        <div className='chartContainer'>
          <Line
            data={this.getHeight()}
            width={400}
            height={400}
            options={{ maintainAspectRatio: false }}
            responsive={true}
          />
        </div>
        <div className='chartContainer'>
          <Line
            data={this.getSwe()}
            width={400}
            height={400}
            options={{ maintainAspectRatio: false }}
            responsive={true}
          />
        </div>
        <div className='chartContainer'>
          <Line
            data={this.getTemp()}
            width={400}
            height={400}
            options={{ maintainAspectRatio: false }}
            responsive={true}
          />
        </div>
      </div >
    )


  }
}

export default SnotelSite;
