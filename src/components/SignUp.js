import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ registered: true });
    sessionStorage.setItem('email', this.state.email);
    sessionStorage.setItem('password', this.state.password);
  }

  render() {
    if (this.state.registered) {
      return <Redirect to='/signin' />;
    }

    return (
      <form className='signform' onSubmit={this.handleSubmit}>
        <h2 className='signform__title'>Welcome!</h2>

        <div className='signform__group'>
          <p>Already a member?</p>
          <Link className='signform__button' to='/signin'>Sign in</Link>
        </div>

        <input
          type='text'
          id='firstName'
          className='signform__input'
          placeholder='First name'
          required
          onChange={this.handleChange}
        />

        <input
          type='text'
          id='lastName'
          className='signform__input'
          placeholder='Last name'
          required
          onChange={this.handleChange}
        />

        <input
          type='email'
          id='email'
          className='signform__input'
          placeholder='Email'
          required
          onChange={this.handleChange}
        />

        <input
          type='password'
          id='password'
          className='signform__input'
          placeholder='Password'
          required
          onChange={this.handleChange}
        />

        <button
          className='signform__button'
          type='submit'
        >
          Sign up
        </button>
      </form >
    )
  }

}

export default SignUp;
