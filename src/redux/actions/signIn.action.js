import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/signIn';

const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  }
}

export const signInSuccess = (payload) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload
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
        dispatch(signInSuccess({ success: true, userData: data }));
      } else {
        dispatch(signInFailure(true));
      }
    } catch {
      dispatch(signInFailure(true));
    }
  }
}
