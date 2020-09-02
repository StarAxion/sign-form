import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (localStorage.getItem(newUser.email)) {
      setError(true);
    } else {
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      history.push('/signin');
    }
  }

  return (
    <>
      <Header />

      <form className='signform' onSubmit={handleSubmit}>
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
          required
          onChange={handleChange}
        />

        <input
          type='text'
          name='lastName'
          className='signform__input'
          placeholder='Last name'
          required
          onChange={handleChange}
        />

        <input
          type='email'
          name='email'
          className='signform__input'
          placeholder='Email'
          required
          onChange={handleChange}
        />

        {error &&
          <p className='signform__message'>This email is already in use.</p>
        }

        <input
          type='password'
          name='password'
          className='signform__input'
          placeholder='Password'
          required
          onChange={handleChange}
        />

        <button
          className='signform__button'
          type='submit'
        >
          Sign up
          </button>
      </form>
    </>
  )
}

export default SignUp;
