import React, { useState, useEffect, useRef } from 'react';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signInRules';

const ConfirmModal = (props) => {
  const [userCheck, setUserCheck] = useState({
    password: ''
  });

  const [passwordIsIncorrect, setPasswordIsIncorrect] = useState(false);

  const passwordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const { errors, validate } = useValidation(userCheck, validationRules);

  const handleChange = (event) => {
    setUserCheck({ password: event.target.value });
  }

  const checkPassword = (event) => {
    event.preventDefault();

    if (Object.keys(validate()).length) {
      return;
    }

    if (userCheck.password === props.userPassword) {
      props.deleteProfile();
    } else {
      setPasswordIsIncorrect(true);
    }
  }

  return (
    <div className='confirm-modal'>
      <form
        className='modal-content'
        onSubmit={checkPassword}
        onReset={props.close}
      >
        <header className='modal-header'>
          <h2 className='modal-content__title'>Delete profile?</h2>
        </header>

        <div className='modal-main'>
          <label
            className='modal-content__label'
            htmlFor='confirm-password'
          >
            Enter your password to continue:
          </label>

          <input
            type='password'
            name='password'
            id='confirm-password'
            className='modal-content__input'
            placeholder='Password'
            ref={passwordRef}
            onChange={handleChange}
          />

          <p className='error-message'>{errors.password}</p>

          {passwordIsIncorrect &&
            <p
              className='error-message'
              style={{ marginTop: '-20px' }}
            >
              Incorrect password.
            </p>
          }
        </div>

        <footer className='modal-footer'>
          <button
            type='submit'
            className='modal-content__button modal-content__submit-button'
          >
            Execute
          </button>

          <button
            type='reset'
            className='modal-content__button modal-content__cancel-button'
          >
            Cancel
          </button>
        </footer>
      </form>
    </div>
  )
}

export default ConfirmModal;
