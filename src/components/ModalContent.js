import React, { useState, useRef } from 'react';
import useForm from '../hooks/form.hook';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signInRules';

const ModalContent = (props) => {
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const passwordRef = useRef(null);

  const { inputs, handleInputChange } = useForm({
    password: ''
  });

  const { errors, validate, clearErrors } = useValidation(inputs, validationRules);
  const clearOnFocusHandler = (input) => {
    clearErrors(input);
    setIncorrectPassword(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    passwordRef.current.blur();
    const response = validate();
    if (Object.keys(response).length) {
      return;
    }
    if (inputs.password === props.userPassword) {
      props.function();
    } else {
      setIncorrectPassword(true);
    }
  }

  return (
    <form
      className='modal-content'
      onSubmit={handleSubmit}
      onReset={props.close}
    >
      <header className='modal-header'>
        <h2 className='modal-content__title'>{props.title}</h2>
      </header>

      <div className='modal-main'>
        <label
          className='modal-content__label'
          htmlFor='confirm-password'
        >
          Enter your password to continue:
        </label>

        <input
          ref={passwordRef}
          type='password'
          name='password'
          id='confirm-password'
          className='modal-content__input'
          value={inputs.password}
          placeholder='password'
          onFocus={() => clearOnFocusHandler('password')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.password}</p>

        {incorrectPassword &&
          <p
            className='error-message'
            style={{ marginTop: '-20px' }}
          >
            Incorrect password
            </p>
        }
      </div>

      <footer className='modal-footer'>
        <button
          type='submit'
          className='modal-content__button modal-content__submit-button'
        >
          Submit
          </button>

        <button
          type='reset'
          className='modal-content__button modal-content__cancel-button'
        >
          Cancel
        </button>
      </footer>
    </form>
  )
}

export default ModalContent;
