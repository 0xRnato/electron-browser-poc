import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import Home from './containers/home/home';

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Router>
);
