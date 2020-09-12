import React, { useState, useEffect, useRef } from 'react';
import '../assets/fontawesome/css/all.min.css';
import useAuth from '../hooks/auth.hook';
import ProfileData from './ProfileData';
import ConfirmModal from './ConfirmModal';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editIsBlocked, setEditIsBlocked] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const userKey = localStorage.getItem('token');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(userKey));
    for (let prop in userData) {
      setUser((data) => ({
        ...data, [prop]: userData[prop]
      }));
    }
  }, [userKey]);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);

  const { logout } = useAuth();

  const confirmEdit = () => {
    setOpenEditModal(true);
  }

  const unlockEdit = () => {
    setOpenEditModal(false);
    setEditIsBlocked(false);
  }

  const saveChanges = (event) => {
    event.preventDefault();

    const newData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: user.email,
      password: passwordRef.current.value
    };

    localStorage.setItem(userKey, JSON.stringify(newData));
    setEditIsBlocked(true);
  }

  const cancelChanges = () => {
    setEditIsBlocked(true);
  }

  const confirmDelete = () => {
    setOpenDeleteModal(true);
  }

  const closeModal = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  }

  const deleteProfile = () => {
    localStorage.removeItem(userKey);
    logout();
  }

  return (
    <>

      <form
        className='profile'
        onSubmit={saveChanges}
        onReset={cancelChanges}
      >
        <ProfileData
          name='firstName'
          inputId='firstName'
          label='First name'
          value={user.firstName}
          access={editIsBlocked}
          ref={firstNameRef}
        />
        <ProfileData
          name='lastName'
          inputId='lastName'
          label='Last name'
          value={user.lastName}
          access={editIsBlocked}
          ref={lastNameRef}
        />
        <ProfileData
          name='email'
          inputId='email'
          label='Email'
          value={user.email}
          access={true}
        />
        <ProfileData
          name='password'
          inputId='password'
          label='Password'
          value={user.password}
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
                onClick={confirmEdit}
              >
                <i className='fas fa-pen'></i>
              </button>
              <button
                type='button'
                className='profile__button'
                title='delete profile'
                onClick={confirmDelete}
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

      {openEditModal &&
        <ConfirmModal
          title='Proceed to editing?'
          userPassword={user.password}
          function={unlockEdit}
          close={closeModal}
        />
      }

      {openDeleteModal &&
        <ConfirmModal
          title='Delete profile?'
          userPassword={user.password}
          function={deleteProfile}
          close={closeModal}
        />
      }
    </>
  )
}

export default UserProfile;
