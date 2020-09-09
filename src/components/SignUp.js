import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signUpRules';

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [emailInUse, setEmailInUse] = useState(false);

  const history = useHistory();

  const { errors, validate } = useValidation(newUser, validationRules);

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(validate()).length) {
      return;
    }

    if (localStorage.getItem(newUser.email)) {
      setEmailInUse(true);
    } else {
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      history.push('/signin');
    }
  }

  return (
    <>
      <Header />

      <form
        className='signform'
        onSubmit={handleSubmit}
      >
        <h2 className='signform__title'>Welcome!</h2>

        <div className='signform__group'>
          <p>Already a member?</p>
          <Link className='signform__button' to='/signin'>Sign in</Link>
        </div>

        <input
          type='text'
          name='firstName'
          className='signform__input'
          placeholder='First name'
          onChange={handleChange}
        />

        <p className='error-message'>{errors.firstName}</p>

        <input
          type='text'
          name='lastName'
          className='signform__input'
          placeholder='Last name'
          onChange={handleChange}
        />

        <p className='error-message'>{errors.lastName}</p>

        <input
          type='email'
          name='email'
          className='signform__input'
          placeholder='Email'
          onChange={handleChange}
        />

        <p className='error-message'>{errors.email}</p>

        {emailInUse &&
          <p
            className='error-message'
            style={{ marginTop: '-20px' }}
          >
            This email is already in use.
          </p>
        }

        <input
          type='password'
          name='password'
          className='signform__input'
          placeholder='Password'
          onChange={handleChange}
        />

        <p className='error-message'>{errors.password}</p>

        <button
          type='submit'
          className='signform__button'
        >
          Sign up
        </button>
      </form>
    </>
  )
}

export default SignUp;
