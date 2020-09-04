import React from 'react';
import { Link } from 'react-router-dom';
import SignLinks from './SignLinks';

const Header = (props) => (
  <header className='header'>
    <Link className='homelink' to='/'>Home</Link>
    <SignLinks logOut={props.logOut} />
  </header>
)

export default Header;
