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
      ref={ref}
      type='text'
      name={props.name}
      id={props.inputId}
      className='profile__input'
      value={props.value}
      disabled={props.access}
      autoComplete='off'
      onFocus={props.onFocus}
      onChange={props.onChange}
      style={{
        borderColor: props.access ? '#61dafb' : '#ffffff'
      }}
    />
  </>
))

export default ProfileData;
