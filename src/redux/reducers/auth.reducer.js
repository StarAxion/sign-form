const initialState = {
  token: localStorage.getItem('token'),
  isAuthorized: !!localStorage.getItem('token'),
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      localStorage.removeItem('token');
      window.location.reload();
      return {
        ...state,
        token: null,
        isAuthorized: false
      }

    case 'DELETE':
      localStorage.removeItem('token');
      localStorage.removeItem(state.token);
      window.location.reload();
      return {
        ...state,
        token: null,
        isAuthorized: false
      }

    default: {
      return state;
    }
  }
}

export default authReducer;