import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignLinks = (props) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setUserEmail(localStorage.getItem('authorized'));
  }, []);

  const logOut = () => {
    localStorage.removeItem('authorized');
    setUserEmail(null);
    props.logOut();
  }

  const getProfileName = () => {
    return userEmail.slice(0, userEmail.indexOf('@'));
  }

  if (userEmail) {
    return (
      <div>
        <Link to='/profile'>{getProfileName()}</Link>
        <span className='separator'>&#124;</span>
        <button className='signlink' onClick={logOut}>Log out</button >
      </div>
    )
  } else {
    return (
      <div>
        <Link className='signlink' to='/signin'>Sign in</Link>
        <span className='separator'>&#124;</span>
        <Link className='signlink' to='/signup'>Sign up</Link>
      </div>
    )
  }
}

export default SignLinks;
