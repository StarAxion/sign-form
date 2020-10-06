export const logOut = () => {
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT'
  }
}

export const deleteUserProfile = (payload) => {
  localStorage.removeItem('token');
  localStorage.removeItem(payload);
  return {
    type: 'DELETE'
  }
}
