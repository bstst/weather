import React from 'react';
import {
  saveRecentLocation,
  getCurrentWeatherQuery,
} from '../../actions/weather';
import { getItem, setItem } from '../../utils/storage';
import Spinner from '../../components/Spinner';

const systemMap = {
  feelslike: ['c', 'f'],
  precip: ['mm', 'in'],
  pressure: ['mb', 'in'],
  temp: ['c', 'f'],
  vis: ['km', 'miles'],
  wind: ['kph', 'mph'],
};

const METRIC = 0;
const IMPERIAL = 1;

const getSystemValue = (name, system) => name in systemMap ? `${name}_${systemMap[name][system]}` : name;

class Location extends React.Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      location: {},
      current: {},
      system: ~~getItem('system'),
    };
  }

  componentDidMount () {
    const { match: { params: { country, city } } } = this.props;
    getCurrentWeatherQuery(`${city}, ${country}`)
      .then(res => res.json())
      .then(data => {
        saveRecentLocation({ ...data.location, countryCode: country, asciiName: city });
        this.setState({
          loading: false,
          current: data.current,
          location: data.location,
        });
      });
  }

  handleSystemSwitch = () => {
    const { system } = this.state;
    const newSystem = system === METRIC ? IMPERIAL : METRIC;
    this.setState({ system: newSystem });
    setItem('system', newSystem);
  }

  renderField (title, field, literal = false) {
    const { system, current } = this.state;
    return (
      <div>
        <div>{title}</div>
        <div>{literal ? field : current[getSystemValue(field, system)]}</div>
      </div>
    );
  }

  renderSystemSwitch () {
    const { system } = this.state;
    return (
      <div
        onClick={this.handleSystemSwitch}
      >
        {
          system === METRIC
            ? 'switch to imperial'
            : 'switch to metric'
        }
      </div>
    );
  }

  render () {
    const {
      loading,
      current,
      location,
    } = this.state;
    if (loading) {
      return <Spinner absolute={true} />;
    }
    return (
      <div>
        {this.renderSystemSwitch()}
        {this.renderField('last updated:', 'last_updated')}
        {this.renderField('temp:', 'temp')}
        {this.renderField('feels like:', 'feelslike')}
        {this.renderField('humidity:', 'humidity')}
        {this.renderField('is day:', current.is_day ? 'day' : 'night', true)}
        {this.renderField('precip:', 'precip')}
        {this.renderField('pressure:', 'pressure')}
        {this.renderField('visibility:', 'vis')}
        {this.renderField('wind speed:', 'wind')}
        {this.renderField('wind degree:', 'wind_degree')}
        <div>
          {location.lat}
          {location.lon}
        </div>
      </div>
    );
  }
}

export default Location;
