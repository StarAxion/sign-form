import { useState, useCallback } from 'react';

const useValidation = (object, rules) => {
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    let prop, errors = {};
    for (prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (prop in rules) {
          if (rules[prop](object[prop])) {
            errors[prop] = rules[prop](object[prop]);
          } else {
            delete errors[prop];
          }
        }
      }
    }

    setErrors(errors);
    return errors;
  }, [object, rules])

  const clearErrors = key => setErrors(data => ({ ...data, [key]: '' }));

  return { errors, validate, clearErrors };
}

export default useValidation;
