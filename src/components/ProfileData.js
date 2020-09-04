import React from 'react';

const ProfileData = (props) => {


  return (
    <>
      <label
        className='profile-form__label'
        htmlFor={props.inputId}
      >
        {props.label}:
      </label>

      <input
        type='text'
        name='firstName'
        id={props.inputId}
        className='profile-form__input'
        defaultValue={props.data}
        readOnly={props.access}
        disabled={props.access}
        autoComplete='off'
        required
      />
    </>
  )
}

export default ProfileData;
