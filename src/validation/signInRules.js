const validationRules = {
  email: (value) => {
    if (!value.length) {
      return 'Email is required.';
    }
  },
  password: (value) => {
    if (!value.length) {
      return 'Password is required.';
    }
  }
}

export default validationRules;
