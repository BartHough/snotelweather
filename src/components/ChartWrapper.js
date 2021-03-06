import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Loader from 'react-loader-spinner';
import '../styles/ChartWrapper.css';

export class ChartWrapper extends Component {
    render() {
        const data = {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.title,
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
                    data: this.props.data
                }
            ]
        };
        return (
            <div className='chartContainer'>
                <div className='loadingContainer'>
                    {
                        this.props.data.length === 0 &&
                        <Loader
                            type='Circles'
                            color='#4bc0c0'
                            height={80}
                            width={80}
                        />
                    }
                </div>
                {
                    this.props.data.length > 0 &&
                    <Line
                        data={data}
                        width={400}
                        height={400}
                        options={{ maintainAspectRatio: false }}
                        responsive={true}
                    />
                }
            </div>
        )
    }
}

export default ChartWrapper
