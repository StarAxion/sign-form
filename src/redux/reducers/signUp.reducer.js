import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../constants/signUp';

const initialState = {
  loading: false,
  success: false,
  userData: null,
  error: false
}

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true
      }

    case SIGN_UP_SUCCESS:
      const { success, userData } = action.payload;
      localStorage.setItem(userData.email, JSON.stringify(userData));
      return {
        ...state,
        loading: false,
        success,
        userData
      }

    case SIGN_UP_FAILURE:
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

export default signUpReducer;
