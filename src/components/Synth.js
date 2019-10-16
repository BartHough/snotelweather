import React, { Component } from 'react'
import Description from './Description';
import MapContainer from './MapContainer';
import SnotelSite from './SnotelSite';

const styles = {
    container: {
        flexDirection: 'column',
    },
    item: {
        flex: 1,
        textAlign: 'center'
    }
}

export default class Synth extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.item}><Description /></div>
                <div style={styles.item}><MapContainer /></div>
                {/* <div style={styles.item}><SnotelSite /></div> */}
            </div>
        )
    }
}

