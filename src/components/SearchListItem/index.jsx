import React from 'react';

class SearchListItem extends React.Component {
  handleClick = () => {
    console.log(this.props);
  }

  render () {
    const { id, name } = this.props;
    return (
      <div
        onClick={this.handleClick}
      >
        {id}
        {', '}
        {name}
      </div>
    );
  }
}

export default SearchListItem;
