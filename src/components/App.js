import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import UserProfile from './UserProfile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NoPage from './NoPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const App = () => (
  <Router>
    <div className='container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute exact path='/profile' component={UserProfile} />
        <PublicRoute exact path='/signin' component={SignIn} />
        <PublicRoute exact path='/signup' component={SignUp} />
        <Route render={() => <NoPage />} />
      </Switch>
    </div>
  </Router>
)

export default App;
