import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../hooks/form.hook';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signUpRules';
import ResultMessage from '../portals/ResultMessage';
import { signUpFailure } from '../redux/actions/signUp.action';
import { signUpUser } from '../redux/actions/signUp.action';

const SignUp = () => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.signUpReducer.loading);
  const success = useSelector(state => state.signUpReducer.success);
  const error = useSelector(state => state.signUpReducer.error);

  // const [emailInUse, setEmailInUse] = useState(false);
  // const [signupResultMessage, setSignupResultMessage] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const inputRefs = [firstNameRef, lastNameRef, emailRef, passwordRef];

  const history = useHistory();

  const { inputs, handleInputChange } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { errors, validate, clearErrors } = useValidation(inputs, validationRules);
  const clearOnFocusHandler = (input) => {
    clearErrors(input);
    if (input === 'email') {
      dispatch(signUpFailure(false));
      // setEmailInUse(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRefs.forEach(ref => ref.current.blur());
    const response = validate();
    if (Object.keys(response).length) {
      if (localStorage.getItem(inputs.email)) {
        dispatch(signUpFailure(true));
        // setEmailInUse(true);
      }
      return;
    }
    dispatch(signUpUser(inputs));

    // if (localStorage.getItem(inputs.email)) {
    //   setEmailInUse(true);
    // } else {
    //   setSignupResultMessage(true);
    //   setTimeout(() => {
    //     localStorage.setItem(inputs.email, JSON.stringify(inputs));
    //     history.push('/signin');
    //   }, 1000);
    // }
  }

  return (
    <>
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
          ref={firstNameRef}
          type='text'
          name='firstName'
          className='signform__input'
          value={inputs.firstName}
          placeholder='First name'
          onFocus={() => clearOnFocusHandler('firstName')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.firstName}</p>

        <input
          ref={lastNameRef}
          type='text'
          name='lastName'
          className='signform__input'
          value={inputs.lastName}
          placeholder='Last name'
          onFocus={() => clearOnFocusHandler('lastName')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.lastName}</p>

        <input
          ref={emailRef}
          type='text'
          name='email'
          className='signform__input'
          value={inputs.email}
          placeholder='Email'
          onFocus={() => clearOnFocusHandler('email')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.email}</p>

        {error &&
          <p
            className='error-message'
            style={{ marginTop: '-20px' }}
          >
            This email is already in use
          </p>
        }

        <input
          ref={passwordRef}
          type='password'
          name='password'
          className='signform__input'
          value={inputs.password}
          placeholder='Password'
          onFocus={() => clearOnFocusHandler('password')}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />

        <p className='error-message'>{errors.password}</p>

        <button
          type='submit'
          className='signform__button'
        >
          Sign up
      </button>
      </form>

      {loading &&
        <ResultMessage>
          <div>
            <p>Please wait...</p>
          </div>
        </ResultMessage>
      }

      {success &&
        <>
          <ResultMessage>
            <div>
              <p>You have successfully signed up!</p>
            </div>
          </ResultMessage>

          {setTimeout(() => {
            window.location.reload();
            history.push('/signin');
          }, 1000)}
        </>
      }
    </>
  )
}

export default SignUp;
