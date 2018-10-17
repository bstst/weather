import React from 'react';
import {
  saveRecentLocation,
  getCurrentWeatherQuery,
} from '../../actions/weather';
import Spinner from '../../components/Spinner';

class Location extends React.Component {
  state = {
    loading: true,
    location: {},
    current: {},
  }

  componentDidMount () {
    const { match: { params: { country, city } } } = this.props;
    getCurrentWeatherQuery(`${city}, ${country}`)
      .then(res => res.json())
      .then(data => {
        saveRecentLocation({ ...data.location, countryCode: country });
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
