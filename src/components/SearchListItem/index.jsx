import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';

class SearchListItem extends React.Component {
  render () {
    const {
      name,
      countryCode,
    } = this.props;
    return (
      <Link
        to={`/weather/${countryCode}/${name}`}
        className={styles.item}
      >
        {name}
      </Link>
    );
  }
}

export default SearchListItem;
