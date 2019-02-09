import React from 'react';
import {Route,Switch} from 'react-router-dom';

import Home from './components/Home';
import FourOhFour from './components/FourOhFour';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import UserProfile from './containers/UserProfile';

const Routes = (props) =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={LoginForm} />
    <Route path="/signup" exact component={SignupForm} />
    <Route path="/userprofile" exact component={UserProfile} />
    <Route component={FourOhFour} />
  </Switch>

export default Routes;
