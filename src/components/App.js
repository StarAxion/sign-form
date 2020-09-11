import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/App.css';
import useAuth from '../hooks/auth.hook';
import useRoutes from '../hooks/routes.hook';
import Header from './Header';

const App = () => {
  const { token } = useAuth();
  const isAuthorized = !!token;
  const routes = useRoutes(isAuthorized);

  return (
    <Router>
      <div className='container'>
        <Header
          isAuthorized={isAuthorized}
        />
        {routes}
      </div>
    </Router>
  )
}

export default App;
