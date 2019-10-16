import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import SnotelSite from './SnotelSite';

const style = {
    map: {
        width: '100%',
        height: '50%',
        display: 'inline-block',
        position: 'relative',
        top: '10px',
        margin: '0 0 10px 0'
    },
    graphs: {
        margin: '500px 0 0 0'
    }

}

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                location: {
                    lat: 41,
                    lng: -108.3
                },
                days: 1
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ fields: { days: event.target.value } })
    }

    async componentDidMount() {
        const { lat, lng } = await this.getcurrentLocation();
        this.setState(prev => ({
            fields: {
                ...prev.fields,
                location: {
                    lat,
                    lng
                }
            },
            currentLocation: {
                lat,
                lng
            }
        }));
    }

    getcurrentLocation() {
        if (navigator && navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    resolve({
                        lat: coords.latitude,
                        lng: coords.longitude
                    });
                });
            });
        }
        return {
            lat: 0,
            lng: 0
        };
    }
    addMarker = (location, map) => {
        this.setState(prev => ({
            fields: {
                ...prev.fields,
                location
            }
        }));
        map.panTo(location);
    };

    render() {
        return (
            <div>
                <Map
                    google={this.props.google}
                    style={style.map}
                    initialCenter={this.state.fields.location}
                    center={this.state.fields.location}
                    zoom={5}
                    onClick={(t, map, c) => this.addMarker(c.latLng, map)}
                >
                    <Marker position={this.state.fields.location} />
                    <form onSubmit={this.handleSubmit} style={style.form}>
                        <label> </label>
                        <input placeholder="Number of days to view" type="text" value={this.state.fields.days} onChange={this.handleChange} />
                    </form>
                </Map>
                <div>
                    <SnotelSite coords={this.state.fields.location} days={this.state.fields.days} />
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBbfs5S5b7xuqR5T8uPHIJAMCZ8-FEkhTQ'
})(MapContainer)
