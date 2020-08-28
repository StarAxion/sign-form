import React from 'react';
import { Link } from 'react-router-dom';

const SignLinks = () => (
  <div className='signlinks'>
    <Link className='signlink' to='/signin'>Sign in</Link>
    <span className='separator'>&#124;</span>
    <Link className='signlink' to='/signup'>Sign up</Link>
  </div>
)

export default SignLinks;
