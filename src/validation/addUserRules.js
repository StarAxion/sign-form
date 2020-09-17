const validationRules = {
  id: (value) => {
    if (!value) {
      return 'Id is required';
    }
  },
  name: (value) => {
    if (!value) {
      return 'Full name is required';
    }
  },
  username: (value) => {
    if (!value) {
      return 'Username is required';
    }
  },
  email: (value) => {
    if (!value) {
      return 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address';
    }
  }
}

export default validationRules;
