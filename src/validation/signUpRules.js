const validationRules = {
  firstName: (value) => {
    if (!value) {
      return 'First name is required';
    } else if (value.length < 2) {
      return 'First name must be at least 2 characters long';
    }
  },
  lastName: (value) => {
    if (!value) {
      return 'Last name is required';
    } else if (value.length < 2) {
      return 'Last name must be at least 2 characters long';
    }
  },
  email: (value) => {
    if (!value) {
      return 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address';
    }
  },
  password: (value) => {
    if (!value) {
      return 'Password is required';
    } else if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
  }
}

export default validationRules;
