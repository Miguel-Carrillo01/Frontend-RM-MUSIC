import React, { useRef } from 'react'


export const Img = ({url, styleImg, eventClick, alt}) => {
  const imgRef = useRef(null);
  const handleClick = () => {
    if (eventClick) {
      eventClick();
    }
  };
  return (
    <img ref={imgRef}  className={styleImg} src={url} onClick={handleClick} alt={alt} />
  )
}
