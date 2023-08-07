import React from 'react'

export const Circle = ({state, onClick, numberSelected, id}) => {
  return (
      <i id={id} number={numberSelected}  onClick={onClick} className={`icon-car  ${state}`}></i>
  )
}
