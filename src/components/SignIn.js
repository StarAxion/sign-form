import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../hooks/form.hook';
import useValidation from '../hooks/validation.hook';
import validationRules from '../validation/signInRules';
// import AuthContext from '../context/AuthContext';
import ResultMessage from '../portals/ResultMessage';
import { signInFailure } from '../redux/actions/signIn.action';
import { signInUser } from '../redux/actions/signIn.action';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.signInReducer);

  // const [incorrectData, setIncorrectData] = useState(false);
  // const [signinResultMessage, setSigninResultMessage] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const inputRefs = [emailRef, passwordRef];

  // const auth = useContext(AuthContext);

  const { inputs, handleInputChange } = useForm({
    email: '',
    password: ''
  });

  const { errors, validate, clearErrors } = useValidation(inputs, validationRules);
  const clearOnFocusHandler = (input) => {
    clearErrors(input);
    dispatch(signInFailure(false));
    // setIncorrectData(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRefs.forEach(ref => ref.current.blur());
    const response = validate();
    if (Object.keys(response).length) {
      return;
    }
    dispatch(signInUser(inputs));

    // try {
    //   if (inputs.password === JSON.parse(localStorage.getItem(inputs.email)).password) {
    //     setSigninResultMessage(true);
    //     setTimeout(() => {
    //       auth.login(inputs.email);
    //       window.location.reload();
    //     }, 1000);
    //   } else {
    //     setIncorrectData(true);
    //   }
    // } catch {
    //   setIncorrectData(true);
    // }
  }

  return (
    <>
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

        {error &&
          <p
            className='error-message'
            style={{ marginTop: '-20px' }}
          >
            Incorrect email or password
        </p>
        }

        <button
          type='submit'
          className='signform__button'
        >
          Sign in
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
              <p>You have successfully signed in!</p>
            </div>
          </ResultMessage>

          {setTimeout(() => {
            window.location.reload();
          }, 1000)}
        </>
      }
    </>
  )
}

export default SignIn;
