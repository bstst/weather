import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { getCurrentLocation } from '../../actions/api';
import Spinner from '../Spinner';
// import styles from './index.scss';

class TopMenu extends React.Component {
  state = {
    loading: false,
  }

  handleMyLocationClick = () => {
    this.setState({ loading: true });
    getCurrentLocation()
      .then((coords) => {
        const { lat, lon } = coords;
        const { history } = this.props;
        history.push(`${parseInt(lat * 100, 10)},${parseInt(lon * 100, 10)}`);
      })
      .finally(() => this.setState({ loading: false }));
  }

  render () {
    const { loading } = this.state;
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <span onClick={this.handleMyLocationClick}>My Location</span>
        </nav>
        {loading && <Spinner absolute={true} />}
      </div>
    );
  }
}

export default withRouter(TopMenu);
