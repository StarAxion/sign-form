import React, { useState, useRef } from 'react';
import useForm from '../hooks/form.hook';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/addUserRules';
import ResultMessage from '../portals/ResultMessage';

const AddUser = (props) => {
  const [idExists, setIdExists] = useState(false);
  const [addUserResultMessage, setAddUserResultMessage] = useState(false);

  const idRef = useRef(null);
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const inputRefs = [idRef, nameRef, usernameRef, emailRef];

  const { inputs, handleInputChange } = useForm({
    id: '',
    name: '',
    username: '',
    email: ''
  });

  const { errors, validate, clearErrors } = useValidation(inputs, validationRules);
  const clearOnFocusHandler = (input) => {
    clearErrors(input);
    if (input === 'id') {
      setIdExists(false);
    }
  }

  const handleReset = () => {
    inputRefs.forEach(ref => {
      handleInputChange(ref.current.name, '');
      clearErrors(ref.current.name);
      setIdExists(false);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRefs.forEach(ref => ref.current.blur());
    const users = props.users;
    const idCheck = users.find(user => user.id === Number(inputs.id));
    const response = validate();
    if (Object.keys(response).length) {
      if (idCheck && inputs.id !== '') {
        setIdExists(true);
      }
      return;
    }
    const newUser = inputs;
    newUser.id = Number(newUser.id);
    if (idCheck) {
      setIdExists(true);
    } else {
      setAddUserResultMessage(true);
      setTimeout(() => {
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users));
        handleReset();
        props.updateList();
        setAddUserResultMessage(false);
      }, 1000);
    }
  }

  return (
    <>
      <form
        className='main__form'
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <input
          ref={idRef}
          type='number'
          name='id'
          className='main__form-id'
          value={inputs.id}
          placeholder='id'
          autoComplete='off'
          onFocus={() => clearOnFocusHandler('id')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <input
          ref={nameRef}
          type='text'
          name='name'
          className='main__form-name'
          value={inputs.name}
          placeholder='full name'
          autoComplete='off'
          onFocus={() => clearOnFocusHandler('name')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <input
          ref={usernameRef}
          type='text'
          name='username'
          className='main__form-username'
          value={inputs.username}
          placeholder='username'
          autoComplete='off'
          onFocus={() => clearOnFocusHandler('username')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <input
          ref={emailRef}
          type='text'
          name='email'
          className='main__form-email'
          value={inputs.email}
          placeholder='email'
          autoComplete='off'
          onFocus={() => clearOnFocusHandler('email')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <button
          type='submit'
          className='main__button'
          title='add user'
        >
          <i className="fas fa-user-plus"></i>
        </button>

        <button
          type='reset'
          className='main__button'
          title='cancel'
        >
          <i className="fas fa-window-close"></i>
        </button>
      </form>

      <div>
        {idExists &&
          <p className='error-message'>This ID already exists</p>
        }
        <p className='error-message'>{errors.id}</p>
        <p className='error-message'>{errors.name}</p>
        <p className='error-message'>{errors.username}</p>
        <p className='error-message'>{errors.email}</p>
      </div>

      {addUserResultMessage &&
        <ResultMessage>
          <div>
            <p>New user added!</p>
          </div>
        </ResultMessage>
      }
    </>
  )
}

export default AddUser;
