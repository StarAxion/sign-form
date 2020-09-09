const validationRules = {
  firstName: (value) => {
    if (!value.length) {
      return 'First name is required.';
    } else if (value.length < 2) {
      return 'First name must be at least 2 characters long.';
    }
  },
  lastName: (value) => {
    if (!value.length) {
      return 'Last name is required.';
    } else if (value.length < 2) {
      return 'Last name must be at least 2 characters long.';
    }
  },
  email: (value) => {
    if (!value.length) {
      return 'Email is required.';
    }
  },
  password: (value) => {
    if (!value.length) {
      return 'Password is required.';
    } else if (value.length < 5) {
      return 'Password must be at least 5 characters long.';
    }
  }
}

export default validationRules;
