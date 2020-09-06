import React, { useState, useEffect, useRef } from 'react';
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

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  const logOut = () => {
    history.push('/');
  }

  const unlockEdit = (event) => {
    event.preventDefault();
    setEditIsBlocked(false);
  }

  const saveChanges = (event) => {
    event.preventDefault();

    const newData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email,
      password: passwordRef.current.value
    };

    localStorage.setItem(userKey, JSON.stringify(newData));
    setEditIsBlocked(true);
  }

  const cancelChanges = () => {
    setEditIsBlocked(true);
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

      <form
        className='profile'
        onSubmit={saveChanges}
        onReset={cancelChanges}
      >
        <ProfileData
          name='firstName'
          inputId='firstName'
          label='First name'
          data={firstName}
          access={editIsBlocked}
          ref={firstNameRef}
        />
        <ProfileData
          name='lastName'
          inputId='lastName'
          label='Last name'
          data={lastName}
          access={editIsBlocked}
          ref={lastNameRef}
        />
        <ProfileData
          name='email'
          inputId='email'
          label='Email'
          data={email}
          access={true}
        />
        <ProfileData
          name='password'
          inputId='password'
          label='Password'
          data={password}
          access={editIsBlocked}
          ref={passwordRef}
        />

        <div>
          {editIsBlocked ?
            <>
              <button
                type='button'
                className='profile__button'
                title='edit profile'
                onClick={unlockEdit}
              >
                <i className='fas fa-pen'></i>
              </button>
              <button
                type='button'
                className='profile__button'
                title='delete profile'
                onClick={openModal}
              >
                <i className='fas fa-trash'></i>
              </button>
            </>
            :
            <>
              <button
                type='submit'
                className='profile__button'
              >
                Save
              </button>
              <button
                type='reset'
                className='profile__button'
              >
                Cancel
              </button>
            </>
          }
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
