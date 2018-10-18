import React from 'react';
import { Link } from 'react-router-dom';
import { getCountryCities } from '../../actions/countries';
import Spinner from '../../components/Spinner';
import SearchListItemStyles from '../../components/SearchListItem/index.scss';

class Country extends React.Component {
  state = {
    loading: true,
    items: [],
  }

  componentDidMount () {
    const { match: { params: { country } } } = this.props;
    getCountryCities(country)
      .then(data => this.setState({ loading: false, items: data.geonames }));
  }

  renderItem = (item) => <Link className={SearchListItemStyles.item} to={`/weather/${item.countryCode}/${item.asciiName}`} key={item.geonameId}>{item.name}</Link>

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

export default Country;
