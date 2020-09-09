import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signInRules';

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [invalidData, setInvalidData] = useState(false);

  const history = useHistory();

  const { errors, validate } = useValidation(loginData, validationRules);

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(validate()).length) {
      return;
    }

    try {
      if (loginData.password === JSON.parse(localStorage.getItem(loginData.email)).password) {
        localStorage.setItem('authorized', loginData.email);
        history.push('/');
      } else {
        setInvalidData(true);
      }
    } catch {
      setInvalidData(true);
    }
  }

  return (
    <>
      <Header />

      <form
        className='signform'
        onSubmit={handleSubmit}
      >
        <h2 className='signform__title'>Welcome back!</h2>

        <div className='signform__group'>
          <p>Not a member yet?</p>
          <Link className='signform__button' to='/signup'>Sign up</Link>
        </div>

        <input
          type='email'
          name='email'
          className='signform__input'
          placeholder='Email'
          onChange={handleChange}
        />

        <p className='error-message'>{errors.email}</p>

        <input
          type='password'
          name='password'
          className='signform__input'
          placeholder='Password'
          onChange={handleChange}
        />

        <p className='error-message'>{errors.password}</p>

        {invalidData &&
          <p
            className='error-message'
            style={{ marginTop: '-20px' }}
          >
            Incorrect email or password.
          </p>
        }

        <button
          type='submit'
          className='signform__button'
        >
          Sign in
        </button>
      </form>
    </>
  )
}

export default SignIn;
