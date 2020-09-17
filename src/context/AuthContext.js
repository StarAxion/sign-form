import { createContext } from 'react';

const AuthContext = createContext({
  login: () => { },
  logout: () => { },
  token: null,
  isAuthorized: false
});

export default AuthContext;
