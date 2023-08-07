
import React from 'react'
import { Logo } from '../../UI/Logo/Logo.jsx'
import { NavBar } from '../../UI/NavBar/NavBar.jsx'

export const Header = () => {
  return (
    <header>
        <Logo classLink="logo" classLogo="logo"/>
        <NavBar/>
    </header>
  )
}
