import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className='nav'>
        <ul className='list'>
            <Link className="anchor" to="/LogIn" >Comenzar Parking</Link>
            {/* <Link className="anchor" to="/UseState" >Crear Cuenta</Link> */}
        </ul>
    </nav>
  )
}