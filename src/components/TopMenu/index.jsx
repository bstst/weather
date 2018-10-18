import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { getCurrentLocation } from '../../actions/weather';
import { getLocationByCoordinates } from '../../actions/countries';
import Spinner from '../Spinner';
import styles from './index.scss';

class TopMenu extends React.Component {
  state = {
    loading: false,
  }

  handleMyLocationClick = () => {
    this.setState({ loading: true });
    getCurrentLocation()
      .then((coords) => {
        const { lat, lon } = coords;
        getLocationByCoordinates(lat, lon)
          .then(res => res.json())
          .then(data => {
            if (data && data.geonames && data.geonames.length) {
              const { history } = this.props;
              const location = data.geonames[0];
              history.push(`/weather/${location.countryCode}/${location.name}`);
            }
          });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render () {
    const { loading } = this.state;
    return (
      <div className={styles.container}>
        <nav>
          <NavLink exact={true} className={styles.link} activeClassName={styles.active} to="/">Search</NavLink>
          <NavLink className={styles.link} activeClassName={styles.active} to="/countries">Countries</NavLink>
          <NavLink className={styles.link} activeClassName={styles.active} to="/recent">Recent</NavLink>
          <span className={styles.link} onClick={this.handleMyLocationClick}>My Location</span>
        </nav>
        {loading && <Spinner absolute={true} />}
      </div>
    );
  }
}

export default withRouter(TopMenu);
