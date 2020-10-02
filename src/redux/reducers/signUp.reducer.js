import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../constants/signUp';

const initialState = {
  loading: false,
  successMessage: false,
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
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        error: false
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
