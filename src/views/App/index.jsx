import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from '../../Routes';
import TopMenu from '../../components/TopMenu';
import styles from './index.scss';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <TopMenu />
          <div className={styles.content}>
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
