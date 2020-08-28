import React from 'react';
import { Link } from 'react-router-dom';
import SignLinks from './SignLinks';

const Header = () => (
  <header className='header'>
    <Link className='homelink' to='/'>Home</Link>
    <SignLinks />
  </header>
)

export default Header;
