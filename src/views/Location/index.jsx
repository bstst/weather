import React from 'react';
import {
  saveRecentLocation,
  getCurrentWeatherQuery,
} from '../../actions/weather';
import { getItem, setItem } from '../../utils/storage';
import Spinner from '../../components/Spinner';
import Map from '../../components/Map';
import styles from './index.scss';

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

const getLabel = (name, system) => name in systemMap ? systemMap[name][system] : '';
const getFieldName = (name, system) => name in systemMap ? `${name}_${getLabel(name, system)}` : name;

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
      <div className={styles.row}>
        <div className={styles.label}>{title}</div>
        <div className={styles.value}>
          {literal ? field : `${current[getFieldName(field, system)]} ${getLabel(field, system)}`}
        </div>
      </div>
    );
  }

  renderSystemSwitch () {
    const { system } = this.state;
    return (
      <div
        onClick={this.handleSystemSwitch}
        className={styles.switch}
      >
        {
          system === METRIC
            ? 'Metric'
            : 'Imperial'
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
      <div className={styles.content}>
        {this.renderSystemSwitch()}
        <h1>{`${location.name}, ${location.country}`}</h1>
        <div className={styles.rows}>
          {this.renderField('Last updated:', 'last_updated')}
          {this.renderField('Temperature:', 'temp')}
          {this.renderField('Feels like:', 'feelslike')}
          {this.renderField('Humidity:', 'humidity')}
          {this.renderField('Is day:', current.is_day ? 'day' : 'night', true)}
          {this.renderField('Precipitation:', 'precip')}
          {this.renderField('Pressure:', 'pressure')}
          {this.renderField('Visibility:', 'vis')}
          {this.renderField('Wind speed:', 'wind')}
          {this.renderField('Wind degree:', 'wind_degree')}
        </div>
        <Map
          lat={location.lat}
          lng={location.lon}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;libraries=geometry,drawing,places&amp;key=AIzaSyC26h7-XJoZ6q4ENgT6htqpE4GwfOCwt7E"
          loadingElement={<div style={{ height: '200px' }} />}
          containerElement={<div style={{ height: '200px' }} />}
          mapElement={<div style={{ height: '200px' }} />}
        />
      </div>
    );
  }
}

export default Location;
