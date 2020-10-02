import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/signIn';

const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST
  }
}

const signInSuccess = () => {
  return {
    type: SIGN_IN_SUCCESS
  }
}

export const signInFailure = (payload) => {
  return {
    type: SIGN_IN_FAILURE,
    payload
  }
}

export const signInUser = (data) => {
  return (dispatch) => {
    dispatch(signInRequest());
    try {
      if (data.password === JSON.parse(localStorage.getItem(data.email)).password) {
        localStorage.setItem('token', data.email);
        dispatch(signInSuccess());
      } else {
        dispatch(signInFailure(true));
      }
    } catch {
      dispatch(signInFailure(true));
    }
  }
}
