import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const NoPage = () => (
  <>
    <Header />
    <div className='nopage'>
      <p className='nopage__text'>Page Not Found</p>
      <Link className='homelink' to='/'>Return home</Link>
    </div>
  </>
)

export default NoPage;
