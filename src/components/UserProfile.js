import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/fontawesome-free-5.14.0-web/css/all.min.css';
import Header from './Header';
import ProfileData from './ProfileData';
import ConfirmModal from './ConfirmModal';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [editIsBlocked, setEditIsBlocked] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const userKey = localStorage.getItem('authorized');
  const userData = JSON.parse(localStorage.getItem(userKey));

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setPassword(userData.password);
  }, [userData]);

  const history = useHistory();

  const logOut = () => {
    history.push('/');
  }

  const editData = () => {
    setEditIsBlocked(false);
  }

  const openModal = () => {
    setModalIsVisible(true);
  }

  const closeModal = () => {
    setModalIsVisible(false);
  }

  const deleteProfile = () => {
    localStorage.removeItem(userKey);
    localStorage.removeItem('authorized');
    history.push('/');
  }

  return (
    <>
      <Header logOut={logOut} />

      <form className='profile-form'>
        <ProfileData
          inputId='firstName'
          label='First name'
          data={firstName}
          access={editIsBlocked}
        />
        <ProfileData
          inputId='lastName'
          label='Last name'
          data={lastName}
          access={editIsBlocked}
        />
        <ProfileData
          inputId='email'
          label='Email'
          data={email}
          access={true}
        />
        <ProfileData
          inputId='password'
          label='Password'
          data={password}
          access={editIsBlocked}
        />

        <div>
          <button
            type='button'
            className='profile-form__button'
            title='edit profile'
            onClick={editData}
          >
            <i className='fas fa-pen'></i>
          </button>
          <button
            type='button'
            className='profile-form__button'
            title='delete profile'
            onClick={openModal}
          >
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </form>

      {modalIsVisible &&
        <ConfirmModal
          close={closeModal}
          deleteProfile={deleteProfile}
          userPassword={password}
        />
      }
    </>
  )
}

export default UserProfile;
