import React, { forwardRef } from 'react';

const ProfileData = forwardRef((props, ref) => (
  <>
    <label
      className='profile__label'
      htmlFor={props.inputId}
    >
      {props.label}:
    </label>

    <input
      type='text'
      name={props.name}
      id={props.inputId}
      className='profile__input'
      defaultValue={props.value}
      readOnly={props.access}
      disabled={props.access}
      ref={ref}
      autoComplete='off'
      required
    />
  </>
))

export default ProfileData;
