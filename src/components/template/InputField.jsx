import React from 'react'

const InputField = (props) => {

  const { refValue, keyUp, idValue, typeValue, requiredValue, textLabel, textPlaceholder } = props

  return (
    <div >
      <label className="col-form-label" htmlFor={idValue}>{textLabel}</label>
      <input className="form-control" ref={refValue} 
      onKeyUp={keyUp} id={idValue} type={typeValue} required={requiredValue} 
      placeholder={textPlaceholder}/>

    </div>
  )
}

export default InputField
