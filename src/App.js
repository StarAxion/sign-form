import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NoPage from './components/NoPage';

const App = () => (
  <Router>
    <div className='container'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route render={() => <NoPage />} />
      </Switch>
    </div>
  </Router>
)

export default App;
