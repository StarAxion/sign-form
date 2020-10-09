export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  }
}

export const deleteUserProfile = (userKey) => {
  return (dispatch) => {
    dispatch({ type: 'DELETE' });
    localStorage.removeItem('token');
    localStorage.removeItem(userKey);
  }
}
