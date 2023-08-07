import React from 'react'

export const FormGroup = ({place, inputType,contLabel, nameInput, onChange, value, min, id, accept, maxLenght, onFocus, minLength}) => {
  return (
    <div className='form__group field'>
        <input  maxLength={maxLenght} id={id} minLength={minLength} min={min} contentEditable="true" accept={accept} value={value} onChange={onChange} onFocus={onFocus} name={nameInput} multiple className='form__field' placeholder={place} type={inputType} required />
        <label className='form__label'>{contLabel}</label>
    </div>
  )
}
