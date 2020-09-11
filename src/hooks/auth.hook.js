import { useState, useCallback, useEffect } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = useCallback((token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    window.location.reload();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, [login]);

  return { login, logout, token };
}

export default useAuth;
