import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import { PrivateRoute } from './PrivateRoute';
import UserProfile from './UserProfile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NoPage from './NoPage';

const App = () => (
  <Router>
    <div className='container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute exact path='/profile' component={UserProfile} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route render={() => <NoPage />} />
      </Switch>
    </div>
  </Router>
)

export default App;
