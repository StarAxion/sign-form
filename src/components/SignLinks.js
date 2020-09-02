import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignLinks = (props) => {
  const [userKey, setUserKey] = useState(null);

  useEffect(() => {
    setUserKey(localStorage.getItem('authorized'));
  }, []);

  const logOut = () => {
    localStorage.removeItem('authorized');

    try {
      props.logOut();
    } catch {
      setUserKey(null);
    }
  }

  const getProfileName = () => {
    return userKey.slice(0, userKey.indexOf('@'));
  }

  return (<div>
    {userKey ?
      <>
        <Link to='/profile'>{getProfileName()}</Link>
        <span className='separator'>&#124;</span>
        <button className='signlink' onClick={logOut}>Log out</button >
      </> :
      <>
        <Link className='signlink' to='/signin'>Sign in</Link>
        <span className='separator'>&#124;</span>
        <Link className='signlink' to='/signup'>Sign up</Link>
      </>
    }
  </div>)
}

export default SignLinks;
