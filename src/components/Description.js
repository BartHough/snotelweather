import React, { Component } from 'react'
import '../styles/Description.css'

export class Description extends Component {
    render() {
        return (
            <div className='descriptionContainer'>
                <h2 >Choose SNOTEL Weather Station Location</h2>
                <h4>Place a marker on the map and enter the number of days of data to view.</h4>
            </div>
        )
    }
}

export default Description
