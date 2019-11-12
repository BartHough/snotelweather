import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper';
import '../styles/SnotelSite.css';

export class SnotelSite extends Component {
  constructor(props) {
    super(props);
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
  scrollRef = React.createRef()

  componentDidMount() {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  render() {
    return (
      < div >
        <div className='textContainer' ref={this.scrollRef}>
          <h4 className='textDisplay'>
            Snotel Site: {this.props.stationName}
          </h4>
          <h4 className='textDisplay'>
            Distance from Marker: {this.props.distance} miles
          </h4>
        </div>
        <ChartWrapper
          title='Observed Air Temperature (F)'
          data={this.props.tobsData}
          labels={this.props.tobsLabels}
        />
        <ChartWrapper
          title='Snow Depth (in)'
          data={this.props.snwdData}
          labels={this.props.snwdLabels}
        />
        <ChartWrapper
          title='Snow Water Equivalent (in)'
          data={this.props.wteqData}
          labels={this.props.wteqLabels}
        />
        <ChartWrapper
          title='Precipitation Accumulation (in)'
          data={this.props.precData}
          labels={this.props.precLabels}
        />
      </div >
    )


  }
}

export default SnotelSite;
