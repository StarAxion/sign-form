import { useState } from 'react';

const useForm = (object) => {
  const [inputs, setInputs] = useState(object);

  const handleInputChange = (name, value) => {
    setInputs((data) => ({
      ...data,
      [name]: value
    }))
  }

  return { inputs, handleInputChange };
}

export default useForm;
