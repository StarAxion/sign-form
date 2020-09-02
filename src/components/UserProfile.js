import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userKey = localStorage.getItem('authorized');
    const userData = JSON.parse(localStorage.getItem(userKey));

    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setPassword(userData.password);
  }, []);

  const history = useHistory();

  const logOut = () => {
    history.push('/');
  }

  return (
    <>
      <Header logOut={logOut} />
      <div className='profile'>
        <input
          type='text'
          name='firstName'
          className='profile__input'
          defaultValue={firstName}
          readOnly={false}
          autoComplete='off'
        />

        <input
          type='text'
          name='lastName'
          className='profile__input'
          defaultValue={lastName}
          readOnly={true}
          autoComplete='off'
        />
      </div>
    </>
  )
}

export default UserProfile;
