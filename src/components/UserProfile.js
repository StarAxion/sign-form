import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

const UserProfile = () => {
  //const [userFirstName, setUserFirstName] = useState(null);
  //const [userLastName, setUserLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  //const [userPassword, setUserPassword] = useState(null);

  useEffect(() => {
    setUserEmail(localStorage.getItem('authorized'));
  }, []);

  const history = useHistory();

  const logOut = () => {
    history.push('./');
  }

  return (
    <>
      <Header logOut={logOut} />
      <div className='profile'>
        <p className='profile__userdata'>First name: </p>
        <p className='profile__userdata'>Last name: </p>
        <p className='profile__userdata'>Email: {userEmail}</p>
        <p className='profile__userdata'>Password: </p>
      </div>
    </>
  )
}

export default UserProfile;
