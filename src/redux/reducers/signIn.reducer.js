import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/signIn';

const initialState = {
  loading: false,
  success: false,
  userData: null,
  error: false
}

const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true
      }

    case SIGN_IN_SUCCESS:
      const { success, userData } = action.payload;
      localStorage.setItem('token', userData.email);
      return {
        ...state,
        loading: false,
        success,
        userData
      }

    case SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default: {
      return state;
    }
  }
}

export default signInReducer;
