import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/App.css';
import useAuth from '../hooks/auth.hook';
import useRoutes from '../hooks/routes.hook';
import AuthContext from '../context/AuthContext';
import Header from './Header';

const App = () => {
  const { login, logout, token } = useAuth();
  const isAuthorized = !!token;
  const routes = useRoutes(isAuthorized);

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      token,
      isAuthorized
    }}>
      <Router>
        <div className='container'>
          <Header />
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
