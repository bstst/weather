import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

class SearchListItem extends React.Component {
  render () {
    const {
      name, lat, lon,
    } = this.props;
    return (
      <Link
        to={`/${parseInt(lat * 100, 10)},${parseInt(lon * 100, 10)}`}
        className={styles.item}
      >
        {name}
      </Link>
    );
  }
}

export default SearchListItem;
