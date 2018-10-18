import React from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../../actions/countries';
import Spinner from '../../components/Spinner';
import SearchListItemStyles from '../../components/SearchListItem/index.scss';

class Countries extends React.Component {
  state = {
    items: [],
    loading: true,
  }

  componentDidMount () {
    getCountries().then(data => this.setState({ loading: false, items: data }));
  }

  renderItem = (item) => <Link className={SearchListItemStyles.item} key={item.alpha2Code} to={`/country/${item.alpha2Code}`}>{item.name}</Link>;

  render () {
    const { items, loading } = this.state;
    if (loading) {
      return <Spinner absolute={true} />;
    }
    return (
      <div>
        {items.map(this.renderItem)}
      </div>
    );
  }
}

export default Countries;
