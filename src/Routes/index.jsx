import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
// import Loadable from 'react-loadable';

const Home = () => null;

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

export default Routes;
