import React from 'react'

export const CardAccount = ({rol, message, icon, onClick}) => {
  return (
    <div className="cardAccount" onClick={onClick}>
    <div className="card-inner">
      <div className="card-front">
        <img className='iconAccount' src={icon} alt="" />
        <h2 id='rolAccount'>{rol}</h2>
      </div>
      <div class="card-back">
        <p>{message}</p>
      </div>
    </div>
  </div>
  )
}
