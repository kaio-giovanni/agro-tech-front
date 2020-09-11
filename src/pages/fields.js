import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import config from '../config/constants';

export class Fields extends Component {
    render() {
        return (
            <>
                <Navbar />
                    <Map google={this.props.google} zoom={14}>

                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                               
                            </div>
                        </InfoWindow>
                    </Map>
            </>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (config.API_KEY_MAPS)
})(Fields)