import React from 'react';
import SearchList from '../../components/SearchList';
import { getRecentLocations } from '../../actions/api';

class Recent extends React.Component {
  state = {
    items: [],
  }

  componentDidMount () {
    this.setState({ items: getRecentLocations() });
  }

  render () {
    const { items } = this.state;
    return (
      <div>
        Recent locations:
        <SearchList items={items} />
      </div>
    );
  }
}

export default Recent;
