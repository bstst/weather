import React from 'react';
import { Link } from 'react-router-dom';

class SearchListItem extends React.Component {
  render () {
    const {
      id, name, lat, lon,
    } = this.props;
    return (
      <Link
        to={`/${lat * 100},${lon * 100}`}
      >
        {id}
        {', '}
        {name}
      </Link>
    );
  }
}

export default SearchListItem;
