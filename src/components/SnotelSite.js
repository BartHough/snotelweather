import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper';
import WindWrapper from './WindWrapper';
import '../styles/SnotelSite.css';

export class SnotelSite extends Component {
  scrollRef = React.createRef()

  componentDidMount() {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  getURL = () => {
    return 'https://wcc.sc.egov.usda.gov/reportGenerator/view/customSingleStationReport/daily/' + this.props.triplet + '/-7,0/WTEQ::value,SNWD::value,PREC::value,TOBS::value,TMAX::value,TMIN::value,TAVG::value'
  }
  endRef = React.createRef()

  componentDidMount () {
    this.scrollToBottom()
  }
  componentDidUpdate () {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.endRef.current.scrollIntoView({ behavior: 'smooth' })
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
          <h4 className='textDisplay'>
            <a href={this.getURL()}>{this.props.stationName}</a>
          </h4>
        </div>
        {
          this.props.wind &&
          <WindWrapper
            title={'Wind Speed and Direction Over Last ' + this.props.days + ' Days'}
            speed={this.props.sortedSpeed}
            direction={this.props.sortedDir}
          />
        }
        {
          this.props.wind &&
          <ChartWrapper
            title='Max Wind Speed (MPH)'
            labels={this.props.wspdxLabels}
            data={this.props.wspdxData}
          />
        }
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
