import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const auth = useContext(AuthContext);

  const getUserFullName = () => {
    const userData = JSON.parse(localStorage.getItem(auth.token));
    return `${userData.firstName} ${userData.lastName}`;
  }

  return (
    <header className='header'>
      {auth.isAuthorized ?
        <>
          <Link className='homelink' to='/'>Home</Link>
          <div>
            <Link to='/profile'>{getUserFullName()}</Link>
            <span className='separator'>&#124;</span>
            <button className='logout' onClick={() => auth.logout()}>Log out</button >
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
