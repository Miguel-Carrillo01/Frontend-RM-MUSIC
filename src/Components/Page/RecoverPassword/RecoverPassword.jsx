import React from 'react'
import styles from "../RecoverPassword/RecoverPassword.css"
import { FormRecover } from '../../UI/FormRecover/FormRecover';
import { Img } from '../../UI/Img/Img';

export const RecoverPassword = () => {
  console.log(styles);
  return (
    <main id='mainRecover'>
      <div className="contPassword">
      <FormRecover />
      <Img styleImg="ImgRecover" url="https://res.cloudinary.com/miguelgo205/image/upload/v1691384317/carrmc/dam5uwpphc9sk9ohntzc.png"/>
      </div>

    </main>
  )
}
