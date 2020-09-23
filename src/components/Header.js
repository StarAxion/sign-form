import React from 'react';
// import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
import { logOut } from '../redux/actions/auth.action';

const Header = () => {
  const dispatch = useDispatch();
  const { token, isAuthorized } = useSelector(state => state.authReducer);

  // const auth = useContext(AuthContext);

  const getUserFullName = () => {
    const userData = JSON.parse(localStorage.getItem(token));
    return `${userData.firstName} ${userData.lastName}`;
  }

  return (
    <header className='header'>
      {isAuthorized ?
        <>
          <Link className='homelink' to='/'>Home</Link>
          <div>
            <Link to='/profile'>{getUserFullName()}</Link>
            <span className='separator'>&#124;</span>
            <button className='logout' onClick={() => dispatch(logOut())}>Log out</button >
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
