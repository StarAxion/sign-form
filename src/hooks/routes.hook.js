import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from '../components/Home';
import UserProfile from '../components/UserProfile';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const useRoutes = (isAuthorized) => {
  if (isAuthorized) {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={UserProfile} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Redirect to='/signin' />
    </Switch>
  )
}

export default useRoutes;
