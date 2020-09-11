import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/auth.hook';

const Header = (props) => {
  const [userKey, setUserKey] = useState(null);
  useEffect(() => {
    setUserKey(localStorage.getItem('token'));
  }, []);

  const { logout } = useAuth();

  const getUserFullName = () => {
    const userData = JSON.parse(localStorage.getItem(userKey));
    return `${userData.firstName} ${userData.lastName}`;
  }

  return (
    <header className='header'>
      {props.isAuthorized ?
        <>
          <Link className='homelink' to='/'>Home</Link>
          <div>
            <Link to='/profile'>{getUserFullName()}</Link>
            <span className='separator'>&#124;</span>
            <button className='logout' onClick={logout}>Log out</button >
          </div>
        </>
        :
        <>
          <div />
          <div>
            <NavLink
              className='signlink'
              activeClassName='active'
              to='/signin'
            >
              Sign in
            </NavLink>
            <span className='separator'>&#124;</span>
            <NavLink
              className='signlink'
              activeClassName='active'
              to='/signup'
            >
              Sign up
            </NavLink>
          </div>
        </>
      }
    </header>
  )
}

export default Header;
