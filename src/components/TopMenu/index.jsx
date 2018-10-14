import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Search from '../Search';

class TopMenu extends React.Component {
  render () {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Search />
      </div>
    );
  }
}

export default TopMenu;
