import React, { Component } from 'react'

export class Description extends Component {
    render() {
        return (
            <div >
                <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Choose SNOTEL Weather Station Location</h2>
                <h4 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Place a marker on the map and enter the number of days of data to view.</h4>
            </div>
        )
    }
}

export default Description
