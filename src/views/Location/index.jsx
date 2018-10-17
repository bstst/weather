import React from 'react';
import { getCurrentWeatherForLatLon, saveRecentLocation } from '../../actions/api';
import Spinner from '../../components/Spinner';

class Location extends React.Component {
  state = {
    loading: true,
    location: {},
    current: {},
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props;
    const split = id.split(',');
    const lat = split[0] / 100;
    const lon = split[1] / 100;
    getCurrentWeatherForLatLon(lat, lon)
      .then(response => response.json())
      .then((data) => {
        saveRecentLocation(data.location);
        this.setState({
          loading: false,
          current: data.current,
          location: data.location,
        });
      });
  }

  render () {
    const { loading, current, location } = this.state;
    if (loading) {
      return <Spinner absolute={true} />;
    }
    return (
      <div>
        {JSON.stringify(location)}
        {JSON.stringify(current)}
      </div>
    );
  }
}

export default Location;
