import React from 'react';
import SearchListItem from '../SearchListItem';

class SearchList extends React.Component {
  render () {
    const { items } = this.props;
    return (
      <div>{items.map(item => <SearchListItem key={item.name} {...item} />)}</div>
    );
  }
}

export default SearchList;
