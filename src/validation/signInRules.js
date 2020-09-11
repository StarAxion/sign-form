const validationRules = {
  email: (value) => {
    if (!value) {
      return 'Email is required';
    }
  },
  password: (value) => {
    if (!value) {
      return 'Password is required';
    }
  }
}

export default validationRules;
