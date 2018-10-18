import React from 'react';
import debounce from '../../utils/debounce';
import { autocompleteCities } from '../../actions/countries';
import Spinner from '../Spinner';
import SearchList from '../SearchList';
import styles from './index.scss';

class Search extends React.Component {
  state = {
    loading: false,
    items: [],
  }

  doSearch = debounce((val) => {
    autocompleteCities(val)
      .then(response => response.json())
      .then(data => this.setState({ items: data.geonames }))
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
        <input
          className={styles.input}
          type="text"
          onChange={this.handleSearchChange}
          placeholder="Enter city"
        />
        {loading && <Spinner absolute={true} />}
        {!loading && <SearchList items={items} />}
      </div>
    );
  }
}

export default Search;
