import { combineReducers } from 'redux';
import signUpReducer from './reducers/signUp.reducer';
import signInReducer from './reducers/signIn.reducer';
import authReducer from './reducers/auth.reducer'

const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  authReducer
});

export default rootReducer;
