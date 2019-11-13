import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import Loader from 'react-loader-spinner';
import '../styles/ChartWrapper.css';

export class WindWrapper extends Component {
    render() {
        const data = {
            labels: this.props.direction,
            datasets: [
                {
                    label: this.props.title,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    data: this.props.speed
                }
            ]
        }

        return (
            <div className='chartContainer' >
                <div className='loadingContainer'>
                    {
                        this.props.speed.length === 0 &&
                        <Loader
                            type='Circles'
                            color='#4bc0c0'
                            height={80}
                            width={80}
                        />
                    }
                </div>
                {
                    this.props.speed.length > 0 &&
                    this.props.direction.length > 0 &&
                    <Radar
                        data={data}
                        width={400}
                        height={400}
                        options={{ maintainAspectRatio: false }}
                        responsive={true}
                    />
                }
            </div >
        )
    }
}

export default WindWrapper
