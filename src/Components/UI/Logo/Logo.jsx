import React from 'react'
import { Link } from 'react-router-dom'

export const Logo = ({classLink, classLogo,idLogo, to}) => {
  return (
    <Link className={classLink} to={to}>
    <img className={classLogo} id={idLogo} src="https://res.cloudinary.com/miguelgo205/image/upload/v1679020750/SpaceParking/Logo_SpaceParking_otww2k-removebg-preview_n58yfp.png" alt="" />
    </Link>
  )
}
