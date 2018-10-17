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

const Countries = Loadable({
  loader: () => import('../views/Countries'),
  loading: Spinner,
});

const Country = Loadable({
  loader: () => import('../views/Country'),
  loading: Spinner,
});

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/countries" component={Countries} />
        <Route path="/country/:country" component={Country} />
        <Route path="/recent" component={Recent} />
        <Route path="/weather/:country/:city" component={Location} />
      </Switch>
    );
  }
}

export default Routes;
