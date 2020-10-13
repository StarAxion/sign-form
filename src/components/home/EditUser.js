import React, { useState, useEffect, useRef } from 'react';
import useForm from '../../hooks/form.hook';
import useValidation from '../../hooks/validation.hook';
import validationRules from '../../validation/addUserRules';
import ResultMessage from '../../portals/ResultMessage';

const EditUser = (props) => {
  const [editUserResultMessage, setEditUserResultMessage] = useState(false);

  const { inputs, handleInputChange } = useForm({
    id: '',
    name: '',
    username: '',
    email: ''
  });

  const users = props.users;
  const user = users.filter(user => user.id === props.id)[0];

  useEffect(() => {
    for (let prop in user) {
      handleInputChange(prop, user[prop]);
    }
  }, [user, handleInputChange]);

  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const inputRefs = [nameRef, usernameRef, emailRef];

  const { errors, validate, clearErrors } = useValidation(inputs, validationRules);
  const clearOnFocusHandler = (input) => {
    clearErrors(input);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRefs.forEach(ref => ref.current.blur());
    const response = validate();
    if (Object.keys(response).length) {
      return;
    }
    setEditUserResultMessage(true);
    setTimeout(() => {
      const index = users.indexOf(user);
      users.splice(index, 1, inputs);
      localStorage.setItem('users', JSON.stringify(users));
      props.closeUserEdit();
    }, 1000);
  }

  const handleReset = () => {
    props.closeUserEdit();
  }

  return (
    <>
      <div className='modal-container'>
        <form
          className='modal-content editform'
          onSubmit={handleSubmit}
          onReset={handleReset}
          style={{
            top: '0'
          }}
        >
          <p className='editform__par'>
            ID: {inputs.id}
          </p>

          <input
            ref={nameRef}
            type='text'
            name='name'
            className='editform__input'
            value={inputs.name}
            placeholder='full name'
            autoComplete='off'
            onFocus={() => clearOnFocusHandler('name')}
            onChange={(event) => handleInputChange(event.target.name, event.target.value)}
          />

          <p className='error-message'>{errors.name}</p>

          <input
            ref={usernameRef}
            type='text'
            name='username'
            className='editform__input'
            value={inputs.username}
            placeholder='username'
            autoComplete='off'
            onFocus={() => clearOnFocusHandler('username')}
            onChange={(event) => handleInputChange(event.target.name, event.target.value)}
          />

          <p className='error-message'>{errors.username}</p>

          <input
            ref={emailRef}
            type='text'
            name='email'
            className='editform__input'
            value={inputs.email}
            placeholder='email'
            autoComplete='off'
            onFocus={() => clearOnFocusHandler('email')}
            onChange={(event) => handleInputChange(event.target.name, event.target.value)}
          />

          <p className='error-message'>{errors.email}</p>

          <div>
            <button
              type='submit'
              className='editform__button'
            >
              Save
          </button>
            <button
              type='reset'
              className='editform__button'
            >
              Cancel
          </button>
          </div>
        </form>
      </div>

      {editUserResultMessage &&
        <ResultMessage>
          <div>
            <p>Changes saved!</p>
          </div>
        </ResultMessage>
      }
    </>
  )
}

export default EditUser;
