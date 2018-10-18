import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

class Map extends React.Component {
  render () {
    const { lat, lng } = this.props;
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
