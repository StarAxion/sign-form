import React, { useState, useRef } from 'react';

const ConfirmModal = (props) => {
  const [error, setError] = useState(false);
  const passwordRef = useRef(null);

  const checkPassword = (event) => {
    event.preventDefault();

    if (passwordRef.current.value === props.userPassword) {
      props.deleteProfile();
    } else {
      setError(true);
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
            required
            ref={passwordRef}
          />

          {error &&
            <p className='error-message'>Incorrect password.</p>
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
