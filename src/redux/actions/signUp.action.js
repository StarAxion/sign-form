import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../constants/signUp';

const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST
  }
}

const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS
  }
}

export const signUpFailure = (payload) => {
  return {
    type: SIGN_UP_FAILURE,
    payload
  }
}

export const signUpUser = (user) => {
  return (dispatch) => {
    dispatch(signUpRequest());
    if (localStorage.getItem(user.email)) {
      dispatch(signUpFailure(true));
    } else {
      localStorage.setItem(user.email, JSON.stringify(user));
      dispatch(signUpSuccess());
    }
  }
}
