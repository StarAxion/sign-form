import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    <>
      {!window.location.href.endsWith('/signin') && !window.location.href.endsWith('/signup') &&
        <Redirect to='/signin' />
      }
      <Switch>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </>
  )
}

export default useRoutes;
