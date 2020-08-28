import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let email = e.target.querySelector('#email').value,
      password = e.target.querySelector('#password').value;
    if (email === this.state.email && password === this.state.password) {
      this.setState({ authorized: true });
    }
  }

  componentDidMount() {
    let email = sessionStorage.getItem('email'),
      password = sessionStorage.getItem('password');
    this.setState({ email, password });
  }

  render() {
    if (this.state.authorized) {
      return <Redirect to='/' />;
    }

    return (
      <form className='signform' onSubmit={this.handleSubmit}>
        <h2 className='signform__title'>Welcome back!</h2>

        <div className='signform__group'>
          <p>Not a member yet?</p>
          <Link className='signform__button' to='/signup'>Sign up</Link>
        </div>

        <input
          type='email'
          id='email'
          className='signform__input'
          placeholder='Email'
          required
        />

        <input
          type='password'
          id='password'
          className='signform__input'
          placeholder='Password'
          required
        />

        <button
          className='signform__button'
          type='submit'
        >
          Sign in
        </button>
      </form>
    )
  }
}

export default SignIn;
