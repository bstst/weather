import React from 'react';
import './index.scss';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from '../Routes';
import TopMenu from '../components/TopMenu';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <TopMenu />
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
