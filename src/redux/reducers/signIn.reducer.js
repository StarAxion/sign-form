import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/signIn';

const initialState = {
  loading: false,
  successMessage: false,
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
      return {
        ...state,
        loading: false,
        successMessage: true
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
