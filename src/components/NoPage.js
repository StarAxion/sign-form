import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => (
  <div className='nopage'>
    <p className='nopage__text'>Page Not Found</p>
    <Link className='homelink' to='/'>Return home</Link>
  </div>
)

export default NoPage;
