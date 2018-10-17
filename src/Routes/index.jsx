import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Spinner from '../components/Spinner';

const Home = Loadable({
  loader: () => import('../views/Home'),
  loading: Spinner,
});

const Location = Loadable({
  loader: () => import('../views/Location'),
  loading: Spinner,
});

const Recent = Loadable({
  loader: () => import('../views/Recent'),
  loading: Spinner,
});

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/recent" component={Recent} />
        <Route path="/:id" component={Location} />
      </Switch>
    );
  }
}

export default Routes;
