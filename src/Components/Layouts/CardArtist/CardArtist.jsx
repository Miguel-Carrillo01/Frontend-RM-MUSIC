import React from 'react'
import { Img } from '../../UI/Img/Img';


export const CardArtist = ({urlImage, nameArtist, country, likes,  onclick}) => {
  return (
    <div onClick={onclick} className="cardArtist">
      <Img styleImg="ImgArtist" url={urlImage} />
      <h3 className='nameArtist'>{nameArtist}</h3>
      <p className='countryArtist'>{country}</p>
      <p className='likesArtist'>👍🏻{likes}</p>

      {/* <p className='priceParking'>${priceParking} COP hora</p> */}
    </div>
  )
}
