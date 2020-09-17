import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import '../assets/fontawesome/css/all.min.css';
import useForm from '../hooks/form.hook';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signUpRules';
import AuthContext from '../context/AuthContext';
import ProfileData from './ProfileData';
import ConfirmModal from '../portals/ConfirmModal';
import ModalContent from './ModalContent';
import ResultMessage from '../portals/ResultMessage';

const UserProfile = () => {
  const [editIsBlocked, setEditIsBlocked] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editResultMessage, setEditResultMessage] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteResultMessage, setDeleteResultMessage] = useState(false);

  const { inputs, handleInputChange } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const auth = useContext(AuthContext);

  const setUserInitialData = useCallback(() => {
    const userData = JSON.parse(localStorage.getItem(auth.token));
    for (let prop in userData) {
      handleInputChange(prop, userData[prop]);
    }
  }, [auth.token, handleInputChange]);

  useEffect(() => {
    setUserInitialData();
  }, [setUserInitialData]);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const inputRefs = [firstNameRef, lastNameRef, passwordRef];

  const { errors, validate, clearErrors } = useValidation(inputs, validationRules);

  const clearOnFocusHandler = (input) => {
    clearErrors(input);
  }

  const confirmEdit = () => {
    setOpenEditModal(true);
  }

  const unlockEdit = () => {
    setOpenEditModal(false);
    setEditIsBlocked(false);
  }

  const saveChanges = (event) => {
    event.preventDefault();
    inputRefs.forEach(ref => ref.current.blur());
    const response = validate();
    if (Object.keys(response).length) {
      return;
    }
    setEditResultMessage(true);
    setTimeout(() => {
      localStorage.setItem(auth.token, JSON.stringify(inputs));
      window.location.reload();
    }, 1000);
  }

  const cancelChanges = () => {
    inputRefs.forEach(ref => clearErrors(ref.current.name));
    setUserInitialData();
    setEditIsBlocked(true);
  }

  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const closeModal = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  }

  const deleteProfile = () => {
    setOpenDeleteModal(false);
    setDeleteResultMessage(true);
    setTimeout(() => {
      localStorage.removeItem(auth.token);
      auth.logout();
    }, 1000);
  }

  return (
    <>
      <form
        id='profile'
        className='profile'
        onSubmit={saveChanges}
        onReset={cancelChanges}
      >
        <ProfileData
          ref={firstNameRef}
          name='firstName'
          inputId='firstName'
          label='First name'
          value={inputs.firstName}
          access={editIsBlocked}
          onFocus={() => clearOnFocusHandler('firstName')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.firstName}</p>

        <ProfileData
          ref={lastNameRef}
          name='lastName'
          inputId='lastName'
          label='Last name'
          value={inputs.lastName}
          access={editIsBlocked}
          onFocus={() => clearOnFocusHandler('lastName')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.lastName}</p>

        <ProfileData
          name='email'
          inputId='email'
          label='Email'
          value={inputs.email}
          access={true}
        />

        <ProfileData
          ref={passwordRef}
          name='password'
          inputId='password'
          label='Password'
          value={inputs.password}
          access={editIsBlocked}
          onFocus={() => clearOnFocusHandler('password')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.password}</p>

        <div>
          {editIsBlocked ?
            <>
              <button
                type='button'
                className='profile__button'
                title='edit data'
                onClick={confirmEdit}
              >
                <i className='fas fa-pen'></i>
              </button>
              <button
                type='button'
                className='profile__button'
                title='delete profile'
                onClick={showDeleteModal}
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
        <ConfirmModal>
          <ModalContent
            title='Proceed to editing?'
            userPassword={inputs.password}
            function={unlockEdit}
            close={closeModal}
          />
        </ConfirmModal>
      }

      {editResultMessage &&
        <ResultMessage>
          <div>
            <p>Changes saved!</p>
          </div>
        </ResultMessage>
      }

      {openDeleteModal &&
        <ConfirmModal>
          <ModalContent
            title='Delete profile?'
            userPassword={inputs.password}
            function={deleteProfile}
            close={closeModal}
          />
        </ConfirmModal>
      }

      {deleteResultMessage &&
        <ResultMessage>
          <div>
            <p>Profile deleted!</p>
          </div>
        </ResultMessage>
      }
    </>
  )
}

export default UserProfile;
