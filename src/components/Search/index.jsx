import React from 'react';
import debounce from '../../utils/debounce';
import { search } from '../../actions/weather';
import Spinner from '../Spinner';
import SearchList from '../SearchList';

class Search extends React.Component {
  state = {
    loading: false,
    items: [],
  }

  doSearch = debounce((val) => {
    search(val)
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .then(() => this.setState({ loading: false }));
  }, 1000)

  handleSearchChange = (e) => {
    const { value } = e.target;
    if (value.length) {
      this.doSearch(value);
      this.setState({ loading: true });
    }
  }

  render () {
    const { loading, items } = this.state;
    return (
      <div>
        <input type="text" onChange={this.handleSearchChange} />
        {loading && <Spinner absolute={true} />}
        {!loading && <SearchList items={items} />}
      </div>
    );
  }
}

export default Search;
