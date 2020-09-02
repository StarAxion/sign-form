import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (loginData.password === JSON.parse(localStorage.getItem(loginData.email)).password) {
        localStorage.setItem('authorized', loginData.email);
        history.push('./');
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <Header />

      <form className='signform' onSubmit={handleSubmit}>
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
          required
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          className='signform__input'
          placeholder='Password'
          required
          onChange={handleChange}
        />

        {error ?
          <p className='signform__message'>Incorrect email or password.</p> : null
        }

        <button
          className='signform__button'
          type='submit'
        >
          Sign in
          </button>
      </form>
    </>
  )
}

export default SignIn;
